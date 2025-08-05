<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'Administrator')->first();
        $staffRole = Role::where('name', 'Staff')->first();
        $studentRole = Role::where('name', 'Student')->first();

        // Create Administrator
        User::firstOrCreate(
            ['email' => 'admin@school.edu'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('admin123'),
                'role_id' => $adminRole->id,
                'account_status' => 'Active',
                'email_verified_at' => now(),
            ]
        );

        // Create Staff Member
        User::firstOrCreate(
            ['email' => 'staff@school.edu'],
            [
                'name' => 'John Staff',
                'password' => Hash::make('staff123'),
                'role_id' => $staffRole->id,
                'account_status' => 'Active',
                'email_verified_at' => now(),
            ]
        );

        // Create Sample Students
        $students = [
            [
                'name' => 'Alice Johnson',
                'nis' => '2024001',
                'gender' => 'Female',
                'class_grade' => '5A',
                'parent_guardian_name' => 'Mary Johnson',
                'contact_number' => '+1234567890',
                'initial_balance' => 50.00,
            ],
            [
                'name' => 'Bob Smith',
                'nis' => '2024002',
                'gender' => 'Male',
                'class_grade' => '5A',
                'parent_guardian_name' => 'Robert Smith Sr.',
                'contact_number' => '+1234567891',
                'initial_balance' => 75.00,
            ],
            [
                'name' => 'Carol Davis',
                'nis' => '2024003',
                'gender' => 'Female',
                'class_grade' => '6B',
                'parent_guardian_name' => 'Jennifer Davis',
                'contact_number' => '+1234567892',
                'initial_balance' => 100.00,
            ],
        ];

        foreach ($students as $studentData) {
            User::firstOrCreate(
                ['nis' => $studentData['nis']],
                [
                    'name' => $studentData['name'],
                    'email' => strtolower(str_replace(' ', '.', $studentData['name'])) . '@student.school.edu',
                    'password' => Hash::make($studentData['nis']), // Password is their NIS
                    'role_id' => $studentRole->id,
                    'nis' => $studentData['nis'],
                    'gender' => $studentData['gender'],
                    'class_grade' => $studentData['class_grade'],
                    'parent_guardian_name' => $studentData['parent_guardian_name'],
                    'contact_number' => $studentData['contact_number'],
                    'account_status' => 'Active',
                    'initial_balance' => $studentData['initial_balance'],
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}