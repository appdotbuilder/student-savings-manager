<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['Deposit', 'Withdrawal']);
            $table->decimal('amount', 15, 2);
            $table->decimal('balance_after', 15, 2);
            $table->text('description')->nullable();
            $table->foreignId('handled_by')->constrained('users');
            $table->timestamps();
            
            $table->index('transaction_id');
            $table->index('student_id');
            $table->index('type');
            $table->index(['student_id', 'created_at']);
            $table->index(['type', 'created_at']);
            $table->index('handled_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};