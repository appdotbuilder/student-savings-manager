import React from 'react';
import { AppShell } from '@/components/app-shell';

interface Props {
    student: {
        id: number;
        name: string;
        nis: string;
        class_grade: string;
        parent_guardian_name?: string;
        contact_number?: string;
        account_status: string;
    };
    currentBalance: number;
    recentTransactions: Array<{
        id: number;
        transaction_id: string;
        type: string;
        amount: string;
        balance_after: string;
        description?: string;
        created_at: string;
        handler: {
            name: string;
        };
    }>;
    monthlyStats: {
        total_deposits: number;
        total_withdrawals: number;
        total_transactions: number;
    };
    [key: string]: unknown;
}

export default function StudentDashboard({ student, currentBalance, recentTransactions, monthlyStats }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                💼 Welcome, {student.name}!
                            </h1>
                            <p className="text-blue-100">
                                Student ID: {student.nis} • Class: {student.class_grade}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-blue-100 text-sm">Current Balance</p>
                            <p className="text-4xl font-bold">
                                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Monthly Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📈</div>
                            <div>
                                <p className="text-sm text-gray-600">This Month Deposits</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${monthlyStats.total_deposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📉</div>
                            <div>
                                <p className="text-sm text-gray-600">This Month Withdrawals</p>
                                <p className="text-2xl font-bold text-red-600">
                                    ${monthlyStats.total_withdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Transactions</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {monthlyStats.total_transactions.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                📋 Account Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Full Name</label>
                                <p className="text-gray-900 font-medium">{student.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Student ID (NIS)</label>
                                <p className="text-gray-900 font-medium">{student.nis}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Class/Grade</label>
                                <p className="text-gray-900 font-medium">{student.class_grade}</p>
                            </div>
                            {student.parent_guardian_name && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Parent/Guardian</label>
                                    <p className="text-gray-900 font-medium">{student.parent_guardian_name}</p>
                                </div>
                            )}
                            {student.contact_number && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                    <p className="text-gray-900 font-medium">{student.contact_number}</p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-gray-500">Account Status</label>
                                <div className="flex items-center mt-1">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                        student.account_status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                    }`}></div>
                                    <span className={`font-medium ${
                                        student.account_status === 'Active' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {student.account_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                📝 Recent Transactions
                            </h2>
                        </div>
                        <div className="p-6">
                            {recentTransactions.length > 0 ? (
                                <div className="space-y-4">
                                    {recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-4 h-4 rounded-full ${
                                                        transaction.type === 'Deposit' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}></div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {transaction.type}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {transaction.transaction_id}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-xl font-bold ${
                                                        transaction.type === 'Deposit' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Balance: ${transaction.balance_after}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Date & Time:</span>
                                                    <p className="font-medium">
                                                        {new Date(transaction.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Handled by:</span>
                                                    <p className="font-medium">{transaction.handler.name}</p>
                                                </div>
                                            </div>
                                            {transaction.description && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <span className="text-gray-500 text-sm">Description:</span>
                                                    <p className="text-gray-700">{transaction.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                                    <p>Your transaction history will appear here once you start saving!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Savings Tips */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        💡 Savings Tips for Students
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-start space-x-3">
                            <div className="text-2xl">🎯</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Set Goals</h3>
                                <p className="text-gray-600 text-sm">
                                    Define what you're saving for - a new book, school supplies, or future needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="text-2xl">📅</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Save Regularly</h3>
                                <p className="text-gray-600 text-sm">
                                    Make small, regular deposits rather than large, infrequent ones.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="text-2xl">📊</div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Track Progress</h3>
                                <p className="text-gray-600 text-sm">
                                    Monitor your balance and celebrate when you reach savings milestones.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}