<?php

use App\Http\Controllers\SavingsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main savings management dashboard
Route::get('/', [SavingsController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [SavingsController::class, 'index'])->name('dashboard');
    
    // Student management routes (Staff and Admin only)
    Route::resource('students', StudentController::class);
    
    // Transaction management routes (Staff and Admin only)  
    Route::resource('transactions', TransactionController::class)->except(['edit', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
