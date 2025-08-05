<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Administrator',
                'display_name' => 'Administrator',
                'description' => 'Full system access and management capabilities'
            ],
            [
                'name' => 'Staff',
                'display_name' => 'Staff Member',
                'description' => 'Can manage student accounts and process transactions'
            ],
            [
                'name' => 'Student',
                'display_name' => 'Student (Account Holder)',
                'description' => 'Can view their account balance and transaction history'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}