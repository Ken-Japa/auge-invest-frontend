import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Área Logada | AugeInvest",
    description: "Acesso à área exclusiva para membros da AugeInvest. Gerencie sua carteira, acesse análises e ferramentas avançadas de investimento.",
    robots: 'noindex, nofollow',
};

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <main className="pt-16">
            {children}
        </main>
    );
}