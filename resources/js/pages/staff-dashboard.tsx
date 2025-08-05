import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: {
            display_name: string;
        };
    };
    stats: {
        totalStudents: number;
        totalBalance: number;
        monthlyDeposits: number;
        monthlyWithdrawals: number;
        monthlyTransactions: number;
    };
    recentTransactions: Array<{
        id: number;
        transaction_id: string;
        type: string;
        amount: string;
        created_at: string;
        student: {
            name: string;
            nis: string;
        };
        handler: {
            name: string;
        };
    }>;
    topStudents: Array<{
        id: number;
        name: string;
        nis: string;
        class_grade: string;
        balance: number;
    }>;
    [key: string]: unknown;
}

export default function StaffDashboard({ user, stats, recentTransactions, topStudents }: Props) {
    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                            💼 Staff Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Welcome back, {user.name} • {user.role.display_name}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={route('students.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                👥 Add Student
                            </Button>
                        </Link>
                        <Link href={route('transactions.create')}>
                            <Button className="bg-green-600 hover:bg-green-700">
                                💰 New Transaction
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">👥</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.totalStudents.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">💰</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Balance</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${stats.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📈</div>
                            <div>
                                <p className="text-sm text-gray-600">Monthly Deposits</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${stats.monthlyDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📉</div>
                            <div>
                                <p className="text-sm text-gray-600">Monthly Withdrawals</p>
                                <p className="text-2xl font-bold text-red-600">
                                    ${stats.monthlyWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm text-gray-600">Transactions</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.monthlyTransactions.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    📝 Recent Transactions
                                </h2>
                                <Link href={route('transactions.index')}>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentTransactions.length > 0 ? (
                                <div className="space-y-4">
                                    {recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    transaction.type === 'Deposit' ? 'bg-green-500' : 'bg-red-500'
                                                }`}></div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {transaction.student.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {transaction.student.nis} • {transaction.type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${
                                                    transaction.type === 'Deposit' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(transaction.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">📝</div>
                                    <p>No recent transactions</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Students by Balance */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    🏆 Top Savers
                                </h2>
                                <Link href={route('students.index')}>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {topStudents.length > 0 ? (
                                <div className="space-y-4">
                                    {topStudents.map((student, index) => (
                                        <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="font-bold text-blue-600">#{index + 1}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {student.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {student.nis} • {student.class_grade}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">
                                                    ${student.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">👥</div>
                                    <p>No student data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        ⚡ Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={route('students.index')}>
                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-lg mb-1">👥</div>
                                    <div className="font-medium">Manage Students</div>
                                    <div className="text-sm text-gray-500">View and edit student profiles</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href={route('transactions.index')}>
                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-lg mb-1">📊</div>
                                    <div className="font-medium">Transaction History</div>
                                    <div className="text-sm text-gray-500">View all transactions</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href={route('transactions.create')}>
                            <Button variant="outline" className="w-full justify-start h-auto p-4">
                                <div className="text-left">
                                    <div className="text-lg mb-1">💰</div>
                                    <div className="font-medium">Process Transaction</div>
                                    <div className="text-sm text-gray-500">Deposit or withdrawal</div>
                                </div>
                            </Button>
                        </Link>
                        
                        <Button variant="outline" className="w-full justify-start h-auto p-4">
                            <div className="text-left">
                                <div className="text-lg mb-1">📋</div>
                                <div className="font-medium">Generate Reports</div>
                                <div className="text-sm text-gray-500">Monthly financial reports</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}