'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from '../styles/layout.module.css'

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/login' ? styles.active : ''
        }`}
        href="/login"
      >
        Login
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/signup' ? styles.active : ''
        }`}
        href="/signup"
      >
        Signup
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/restricted' ? styles.active : ''
        }`}
        href="/restricted"
      >
        Restricted content
      </Link>
    </nav>
  )
}
