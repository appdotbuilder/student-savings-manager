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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('email')->constrained('roles')->onDelete('set null');
            $table->string('nis')->nullable()->unique()->after('role_id')->comment('Student ID Number - used as username for students');
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable()->after('nis');
            $table->string('class_grade')->nullable()->after('gender')->comment('Class/Grade like 5A, 6B');
            $table->text('address')->nullable()->after('class_grade');
            $table->string('parent_guardian_name')->nullable()->after('address');
            $table->string('contact_number')->nullable()->after('parent_guardian_name');
            $table->enum('account_status', ['Active', 'Inactive'])->default('Active')->after('contact_number');
            $table->decimal('initial_balance', 15, 2)->default(0)->after('account_status');
            
            $table->index('nis');
            $table->index('account_status');
            $table->index(['role_id', 'account_status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropIndex(['nis']);
            $table->dropIndex(['account_status']);
            $table->dropIndex(['role_id', 'account_status']);
            $table->dropColumn([
                'role_id',
                'nis',
                'gender',
                'class_grade',
                'address',
                'parent_guardian_name',
                'contact_number',
                'account_status',
                'initial_balance'
            ]);
        });
    }
};