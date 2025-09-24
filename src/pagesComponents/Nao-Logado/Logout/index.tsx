'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { clearAuthData } from '@/utils/auth';
import { useRouter } from 'next/navigation';

export default function LogoutComponent() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            clearAuthData();
            await signOut({ redirect: false });
            router.push('/');
        };

        performLogout();
    }, [router]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
            Saindo...
        </div>
    );
}