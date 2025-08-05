<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, 5, 200);
        $type = $this->faker->randomElement(['Deposit', 'Withdrawal']);
        
        return [
            'transaction_id' => 'TXN' . now()->format('YmdHis') . $this->faker->unique()->numberBetween(1000, 9999),
            'student_id' => User::factory(),
            'type' => $type,
            'amount' => $amount,
            'balance_after' => $this->faker->randomFloat(2, 0, 1000),
            'description' => $this->faker->optional()->sentence(),
            'handled_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the transaction is a deposit.
     */
    public function deposit(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'Deposit',
        ]);
    }

    /**
     * Indicate that the transaction is a withdrawal.
     */
    public function withdrawal(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'Withdrawal',
        ]);
    }
}