import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Props {
    stats?: {
        totalStudents: number;
        totalBalance: number;
        recentTransactionsCount: number;
    };
    recentTransactions?: Array<{
        id: number;
        type: string;
        amount: string;
        created_at: string;
        student?: {
            name: string;
        };
    }>;
    [key: string]: unknown;
}

export default function Welcome({ stats, recentTransactions }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">💰</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                                    Student Savings Management
                                </h1>
                                <p className="text-sm text-gray-600">Secure • Transparent • Efficient</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href={route('login')}>
                                <Button variant="outline" className="font-medium">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 font-medium">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        💼 Modern Student Savings
                        <span className="block text-blue-600">Management System</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Empower your educational institution with a comprehensive savings management platform. 
                        Track student finances, process transactions, and generate detailed reports with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                                🚀 Start Managing Now
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                📊 View Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            {stats && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                            📈 System Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-blue-50 rounded-xl">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {stats.totalStudents.toLocaleString()}
                                </div>
                                <div className="text-gray-700 font-medium">Active Students</div>
                                <div className="text-sm text-gray-500 mt-1">👥 Registered accounts</div>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-xl">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    ${stats.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-gray-700 font-medium">Total Savings</div>
                                <div className="text-sm text-gray-500 mt-1">💰 Combined balance</div>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-xl">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {stats.recentTransactionsCount.toLocaleString()}
                                </div>
                                <div className="text-gray-700 font-medium">Recent Activities</div>
                                <div className="text-sm text-gray-500 mt-1">📝 Latest transactions</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        ✨ Powerful Features
                    </h2>
                    <p className="text-xl text-gray-600">Everything you need to manage student savings effectively</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Student Management
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Complete student profiles with NIS, class grades, parent contacts, and account status tracking.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">💳</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Transaction Processing
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Secure deposit and withdrawal processing with real-time balance updates and transaction history.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Financial Reports
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Monthly financial reports, individual transaction histories, and comprehensive fund tracking.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🔐</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Role-Based Access
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Three-tier access control: Administrator, Staff, and Student roles with appropriate permissions.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📥</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Excel Import/Export
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Bulk student data import via Excel templates and comprehensive data export capabilities.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🖨️</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                            Print-Friendly Reports
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Clean, minimalist black-and-white report layouts optimized for professional printing.
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Preview */}
            {recentTransactions && recentTransactions.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                            📝 Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentTransactions.slice(0, 3).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${
                                            transaction.type === 'Deposit' ? 'bg-green-500' : 'bg-red-500'
                                        }`}></div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {transaction.student?.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.type} • {new Date(transaction.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${
                                        transaction.type === 'Deposit' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        Ready to Transform Your Student Savings Management?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join educational institutions worldwide in modernizing their financial operations.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href={route('register')}>
                            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                                🎯 Get Started Today
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                                📞 Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">💰</span>
                            </div>
                            <span className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                                Student Savings Management
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Empowering educational institutions with modern financial management tools.
                        </p>
                        <div className="flex justify-center space-x-8 text-sm text-gray-400">
                            <span>© 2024 Student Savings Management System</span>
                            <span>•</span>
                            <span>Secure & Reliable</span>
                            <span>•</span>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}