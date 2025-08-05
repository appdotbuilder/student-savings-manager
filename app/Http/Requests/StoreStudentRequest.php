<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && (auth()->user()->isStaff() || auth()->user()->isAdministrator());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'nis' => 'required|string|max:20|unique:users,nis',
            'gender' => 'required|in:Male,Female,Other',
            'class_grade' => 'required|string|max:10',
            'address' => 'nullable|string',
            'parent_guardian_name' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'account_status' => 'required|in:Active,Inactive',
            'initial_balance' => 'nullable|numeric|min:0|max:99999999.99',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Student name is required.',
            'nis.required' => 'Student ID Number (NIS) is required.',
            'nis.unique' => 'This Student ID Number is already registered.',
            'gender.required' => 'Please select a gender.',
            'class_grade.required' => 'Class/Grade is required.',
            'account_status.required' => 'Account status is required.',
            'initial_balance.numeric' => 'Initial balance must be a valid amount.',
            'initial_balance.min' => 'Initial balance cannot be negative.',
        ];
    }
}