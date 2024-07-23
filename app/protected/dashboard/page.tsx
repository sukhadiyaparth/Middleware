"use client";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/public/login');
  };

  // This page should be protected by middleware; 
  // you do not need additional session checks here if middleware handles it

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
console.log(status,"----");
//   if (!session) {
//     router.push('/public/login');
//     return null;
//   }

  return (
    <div>
      <h1>Welcome to the Dashboard, {session?.user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;