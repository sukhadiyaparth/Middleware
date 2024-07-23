
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useSessionStorage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      localStorage.setItem('session', JSON.stringify(session));
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('session');
    }
  }, [session, status]);
};

export default useSessionStorage;