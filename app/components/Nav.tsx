'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/layout.module.css'
import { useLogoutMutation } from '@/lib/features/auth/authApiSlice'

export const Nav = () => {
  const pathname = usePathname()
  const [logout] = useLogoutMutation()

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
          pathname === '/restricted' ? styles.active : ''
        }`}
        href="/restricted"
      >
        Restricted content
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/logout' ? styles.active : ''
        }`}
        href="/logout"
      >
        Logout
      </Link>
    </nav>
  )
}
