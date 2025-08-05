import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';

export default function CreateStudent() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nis: '',
        gender: '',
        class_grade: '',
        address: '',
        parent_guardian_name: '',
        contact_number: '',
        account_status: 'Active',
        initial_balance: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            ➕ Add New Student
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Create a new student account for savings management
                        </p>
                    </div>
                    <Link href={route('students.index')}>
                        <Button variant="outline">
                            ← Back to Students
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            📋 Student Information
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Fill in the required information to create a new student account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter student's full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student ID Number (NIS) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nis}
                                    onChange={(e) => setData('nis', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono ${
                                        errors.nis ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 2024001"
                                />
                                {errors.nis && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nis}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    This will be used as the student's username for login
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.gender ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && (
                                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Class/Grade <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.class_grade}
                                    onChange={(e) => setData('class_grade', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.class_grade ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 5A, 6B, 7C"
                                />
                                {errors.class_grade && (
                                    <p className="mt-1 text-sm text-red-600">{errors.class_grade}</p>
                                )}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">📞 Contact Information</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent/Guardian Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.parent_guardian_name}
                                        onChange={(e) => setData('parent_guardian_name', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.parent_guardian_name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter parent or guardian name"
                                    />
                                    {errors.parent_guardian_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.parent_guardian_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.contact_number ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="e.g., +1234567890"
                                    />
                                    {errors.contact_number && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contact_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.address ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter student's address (optional)"
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                )}
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Account Settings</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Account Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.account_status}
                                        onChange={(e) => setData('account_status', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.account_status ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.account_status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.account_status}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Initial Balance (Optional)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.initial_balance}
                                            onChange={(e) => setData('initial_balance', e.target.value)}
                                            className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.initial_balance ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {errors.initial_balance && (
                                        <p className="mt-1 text-sm text-red-600">{errors.initial_balance}</p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        Leave empty to start with $0.00 balance
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="border-t border-gray-200 pt-6 flex justify-end space-x-4">
                            <Link href={route('students.index')}>
                                <Button variant="outline" disabled={processing}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                {processing ? 'Creating...' : '✅ Create Student'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h3 className="font-bold text-blue-900 mb-2">Important Information</h3>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• The Student ID Number (NIS) will be used as the username for student login</li>
                                <li>• The default password will be set to the NIS number</li>
                                <li>• Students can change their password after first login</li>
                                <li>• Email will be auto-generated based on the student's name</li>
                                <li>• Initial balance is optional and defaults to $0.00 if not specified</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}