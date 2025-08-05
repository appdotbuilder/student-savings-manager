<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index(Request $request)
    {
        $query = Transaction::with(['student', 'handler']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('transaction_id', 'like', "%{$request->search}%")
                  ->orWhere('description', 'like', "%{$request->search}%")
                  ->orWhereHas('student', function ($sq) use ($request) {
                      $sq->where('name', 'like', "%{$request->search}%")
                        ->orWhere('nis', 'like', "%{$request->search}%");
                  });
            });
        }

        if ($request->type && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->student_id) {
            $query->where('student_id', $request->student_id);
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $transactions = $query->latest()->paginate(15)->withQueryString();

        $students = User::students()->active()->orderBy('name')->get(['id', 'name', 'nis']);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'students' => $students,
            'filters' => [
                'search' => $request->search,
                'type' => $request->type,
                'student_id' => $request->student_id,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(Request $request)
    {
        $students = User::students()->active()->orderBy('name')->get(['id', 'name', 'nis']);
        
        $selectedStudent = null;
        if ($request->student_id) {
            $selectedStudent = User::students()->find($request->student_id);
            if ($selectedStudent) {
                $selectedStudent->setAttribute('current_balance', $selectedStudent->getCurrentBalance());
            }
        }

        return Inertia::render('transactions/create', [
            'students' => $students,
            'selectedStudent' => $selectedStudent,
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $validated = $request->validated();
        
        $student = User::find($validated['student_id']);
        $currentBalance = $student->getCurrentBalance();
        
        // Calculate new balance
        if ($validated['type'] === 'Deposit') {
            $newBalance = $currentBalance + $validated['amount'];
        } else {
            $newBalance = $currentBalance - $validated['amount'];
            
            // Check if sufficient balance for withdrawal
            if ($newBalance < 0) {
                return back()->withErrors(['amount' => 'Insufficient balance for withdrawal.']);
            }
        }

        // Generate unique transaction ID
        $validated['transaction_id'] = 'TXN' . now()->format('YmdHis') . random_int(1000, 9999);
        $validated['balance_after'] = $newBalance;
        $validated['handled_by'] = auth()->id();

        $transaction = Transaction::create($validated);

        return redirect()->route('transactions.show', $transaction)
            ->with('success', 'Transaction processed successfully.');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load(['student', 'handler']);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Remove the specified transaction from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // Only allow deletion of the most recent transaction for a student
        $latestTransaction = $transaction->student->transactions()->latest()->first();
        
        if ($latestTransaction && $latestTransaction->getKey() !== $transaction->getKey()) {
            return back()->with('error', 'Can only delete the most recent transaction.');
        }

        $transaction->delete();

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction deleted successfully.');
    }
}