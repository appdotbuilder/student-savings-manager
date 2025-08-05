<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the students.
     */
    public function index(Request $request)
    {
        $query = User::students()->with('role');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('nis', 'like', "%{$request->search}%")
                  ->orWhere('class_grade', 'like', "%{$request->search}%");
            });
        }

        if ($request->status && $request->status !== 'all') {
            $query->where('account_status', $request->status);
        }

        if ($request->class_grade && $request->class_grade !== 'all') {
            $query->where('class_grade', $request->class_grade);
        }

        $students = $query->latest()->paginate(10)->withQueryString();

        // Add current balance to each student
        $students->through(function ($student) {
            $student->current_balance = $student->getCurrentBalance();
            return $student;
        });

        $classes = User::students()->distinct()->pluck('class_grade')->filter()->sort()->values();

        return Inertia::render('students/index', [
            'students' => $students,
            'classes' => $classes,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'class_grade' => $request->class_grade,
            ],
        ]);
    }

    /**
     * Show the form for creating a new student.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created student in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $studentRole = Role::where('name', 'Student')->first();
        
        $validated = $request->validated();
        $validated['role_id'] = $studentRole->id;
        $validated['email'] = strtolower(str_replace(' ', '.', $validated['name'])) . '@student.school.edu';
        $validated['password'] = Hash::make($validated['nis']); // Password is NIS
        $validated['email_verified_at'] = now();

        $student = User::create($validated);

        return redirect()->route('students.show', $student)
            ->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified student.
     */
    public function show(User $student)
    {
        if (!$student->isStudent()) {
            abort(404);
        }

        $student->load('transactions.handler');
        $currentBalance = $student->getCurrentBalance();

        $monthlyStats = $student->transactions()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->selectRaw('
                SUM(CASE WHEN type = "Deposit" THEN amount ELSE 0 END) as total_deposits,
                SUM(CASE WHEN type = "Withdrawal" THEN amount ELSE 0 END) as total_withdrawals,
                COUNT(*) as total_transactions
            ')
            ->first();

        return Inertia::render('students/show', [
            'student' => $student,
            'currentBalance' => $currentBalance,
            'monthlyStats' => $monthlyStats,
        ]);
    }

    /**
     * Show the form for editing the specified student.
     */
    public function edit(User $student)
    {
        if (!$student->isStudent()) {
            abort(404);
        }

        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified student in storage.
     */
    public function update(UpdateStudentRequest $request, User $student)
    {
        if (!$student->isStudent()) {
            abort(404);
        }

        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified student from storage.
     */
    public function destroy(User $student)
    {
        if (!$student->isStudent()) {
            abort(404);
        }

        // Check if student has transactions
        if ($student->transactions()->exists()) {
            return back()->with('error', 'Cannot delete student with existing transactions.');
        }

        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}