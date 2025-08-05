import { AppShell } from '@/components/app-shell';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard() {
    useEffect(() => {
        // Redirect to the main savings dashboard
        router.get(route('home'), {}, {
            replace: true
        });
    }, []);

    return (
        <AppShell>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-lg text-gray-600">Redirecting to dashboard...</p>
                </div>
            </div>
        </AppShell>
    );
}