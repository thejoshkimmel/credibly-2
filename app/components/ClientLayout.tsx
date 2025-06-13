'use client';

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';

// List of paths where we don't want to show the navigation bar
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/verify-email',
  '/reset-password',
  '/forgot-password',
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !publicPaths.includes(pathname);

  return (
    <>
      {showNav && <NavBar />}
      {children}
    </>
  );
}
