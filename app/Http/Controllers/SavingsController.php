<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SavingsController extends Controller
{
    /**
     * Display the main savings dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if (!$user) {
            // For guest users, show welcome page
            $totalStudents = User::students()->active()->count();
            $totalBalance = User::students()->active()->get()->sum(function ($student) {
                return $student->getCurrentBalance();
            });
            $recentTransactions = Transaction::with(['student', 'handler'])
                ->latest()
                ->limit(5)
                ->get();
            
            return Inertia::render('welcome', [
                'stats' => [
                    'totalStudents' => $totalStudents,
                    'totalBalance' => $totalBalance,
                    'recentTransactionsCount' => $recentTransactions->count(),
                ],
                'recentTransactions' => $recentTransactions,
            ]);
        }

        // For authenticated users, show role-specific dashboard
        if ($user->isStudent()) {
            return $this->studentDashboard($user);
        } elseif ($user->isStaff() || $user->isAdministrator()) {
            return $this->staffDashboard($user);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Display student dashboard.
     */
    protected function studentDashboard(User $student)
    {
        $currentBalance = $student->getCurrentBalance();
        $recentTransactions = $student->transactions()
            ->with('handler')
            ->latest()
            ->limit(10)
            ->get();

        $monthlyStats = $student->transactions()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->selectRaw('
                SUM(CASE WHEN type = "Deposit" THEN amount ELSE 0 END) as total_deposits,
                SUM(CASE WHEN type = "Withdrawal" THEN amount ELSE 0 END) as total_withdrawals,
                COUNT(*) as total_transactions
            ')
            ->first();

        return Inertia::render('student-dashboard', [
            'student' => $student,
            'currentBalance' => $currentBalance,
            'recentTransactions' => $recentTransactions,
            'monthlyStats' => $monthlyStats,
        ]);
    }

    /**
     * Display staff/admin dashboard.
     */
    protected function staffDashboard(User $user)
    {
        $totalStudents = User::students()->active()->count();
        $totalBalance = User::students()->active()->get()->sum(function ($student) {
            return $student->getCurrentBalance();
        });

        $monthlyStats = Transaction::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->selectRaw('
                SUM(CASE WHEN type = "Deposit" THEN amount ELSE 0 END) as total_deposits,
                SUM(CASE WHEN type = "Withdrawal" THEN amount ELSE 0 END) as total_withdrawals,
                COUNT(*) as total_transactions
            ')
            ->first();

        $recentTransactions = Transaction::with(['student', 'handler'])
            ->latest()
            ->limit(10)
            ->get();

        $topStudents = User::students()
            ->active()
            ->get()
            ->sortByDesc(function ($student) {
                return $student->getCurrentBalance();
            })
            ->take(5)
            ->values();

        return Inertia::render('staff-dashboard', [
            'user' => $user,
            'stats' => [
                'totalStudents' => $totalStudents,
                'totalBalance' => $totalBalance,
                'monthlyDeposits' => $monthlyStats->total_deposits ?? 0,
                'monthlyWithdrawals' => $monthlyStats->total_withdrawals ?? 0,
                'monthlyTransactions' => $monthlyStats->total_transactions ?? 0,
            ],
            'recentTransactions' => $recentTransactions,
            'topStudents' => $topStudents->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'nis' => $student->nis,
                    'class_grade' => $student->class_grade,
                    'balance' => $student->getCurrentBalance(),
                ];
            }),
        ]);
    }
}