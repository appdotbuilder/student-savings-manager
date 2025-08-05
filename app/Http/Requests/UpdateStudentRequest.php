<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
        $student = $this->route('student');
        
        return [
            'name' => 'required|string|max:255',
            'nis' => 'required|string|max:20|unique:users,nis,' . $student->id,
            'gender' => 'required|in:Male,Female,Other',
            'class_grade' => 'required|string|max:10',
            'address' => 'nullable|string',
            'parent_guardian_name' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'account_status' => 'required|in:Active,Inactive',
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
            'nis.unique' => 'This Student ID Number is already registered to another student.',
            'gender.required' => 'Please select a gender.',
            'class_grade.required' => 'Class/Grade is required.',
            'account_status.required' => 'Account status is required.',
        ];
    }
}