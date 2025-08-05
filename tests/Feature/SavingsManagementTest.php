<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SavingsManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles
        Role::create(['name' => 'Administrator', 'display_name' => 'Administrator', 'description' => 'Admin']);
        Role::create(['name' => 'Staff', 'display_name' => 'Staff', 'description' => 'Staff']);
        Role::create(['name' => 'Student', 'display_name' => 'Student', 'description' => 'Student']);
    }

    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }

    public function test_staff_can_access_students_page(): void
    {
        $staffRole = Role::where('name', 'Staff')->first();
        $staff = User::factory()->create(['role_id' => $staffRole->id]);
        
        $response = $this->actingAs($staff)->get(route('students.index'));
        
        $response->assertStatus(200);
    }

    public function test_staff_can_create_student(): void
    {
        $staffRole = Role::where('name', 'Staff')->first();
        $staff = User::factory()->create(['role_id' => $staffRole->id]);
        
        $studentData = [
            'name' => 'John Student',
            'nis' => '2024999',
            'gender' => 'Male',
            'class_grade' => '5A',
            'account_status' => 'Active',
            'initial_balance' => 50.00,
        ];
        
        $response = $this->actingAs($staff)->post(route('students.store'), $studentData);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'name' => 'John Student',
            'nis' => '2024999',
        ]);
    }

    public function test_staff_can_create_transaction(): void
    {
        $staffRole = Role::where('name', 'Staff')->first();
        $studentRole = Role::where('name', 'Student')->first();
        
        $staff = User::factory()->create(['role_id' => $staffRole->id]);
        $student = User::factory()->create([
            'role_id' => $studentRole->id,
            'nis' => '2024001',
            'initial_balance' => 100.00,
        ]);
        
        $transactionData = [
            'student_id' => $student->id,
            'type' => 'Deposit',
            'amount' => 25.00,
            'description' => 'Test deposit',
        ];
        
        $response = $this->actingAs($staff)->post(route('transactions.store'), $transactionData);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('transactions', [
            'student_id' => $student->id,
            'type' => 'Deposit',
            'amount' => 25.00,
        ]);
    }

    public function test_student_can_view_dashboard(): void
    {
        $studentRole = Role::where('name', 'Student')->first();
        $student = User::factory()->create([
            'role_id' => $studentRole->id,
            'nis' => '2024001',
        ]);
        
        $response = $this->actingAs($student)->get(route('dashboard'));
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('student-dashboard')
                ->has('student')
                ->has('currentBalance')
        );
    }

    public function test_student_can_access_students_management(): void
    {
        $studentRole = Role::where('name', 'Student')->first();
        $student = User::factory()->create(['role_id' => $studentRole->id]);
        
        $response = $this->actingAs($student)->get(route('students.index'));
        
        $response->assertStatus(200);
    }

    public function test_user_balance_calculation(): void
    {
        $studentRole = Role::where('name', 'Student')->first();
        $student = User::factory()->create([
            'role_id' => $studentRole->id,
            'initial_balance' => 100.00,
        ]);
        
        // Initial balance should be 100
        $this->assertEquals(100.00, $student->getCurrentBalance());
        
        // Add a deposit
        Transaction::create([
            'transaction_id' => 'TXN123456789',
            'student_id' => $student->id,
            'type' => 'Deposit',
            'amount' => 50.00,
            'balance_after' => 150.00,
            'handled_by' => 1,
        ]);
        
        // Balance should now be 150
        $this->assertEquals(150.00, $student->fresh()->getCurrentBalance());
        
        // Add a withdrawal
        Transaction::create([
            'transaction_id' => 'TXN123456790',
            'student_id' => $student->id,
            'type' => 'Withdrawal',
            'amount' => 25.00,
            'balance_after' => 125.00,
            'handled_by' => 1,
        ]);
        
        // Balance should now be 125
        $this->assertEquals(125.00, $student->fresh()->getCurrentBalance());
    }
}