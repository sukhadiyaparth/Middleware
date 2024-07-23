import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import useSessionStorage from '@/hooks/useSessionStorage';

interface Props {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useSessionStorage();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) signIn(); // Redirect if not authenticated
  }, [session, status]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}