import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styles } from '@/lib/styles/common';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand?: string;
  items?: NavItem[];
}

export function Navbar({ brand = 'Credibly', items = [] }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className={styles.navbar.container}>
      <div className={styles.navbar.content}>
        <Link href="/" className={styles.navbar.brand}>
          {brand}
        </Link>

        <div className={styles.navbar.nav}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                ${styles.navbar.link}
                ${router.pathname === item.href ? styles.navbar.active : ''}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 