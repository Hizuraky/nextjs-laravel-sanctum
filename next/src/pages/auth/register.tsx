import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Link className={styles.title} href='/'>
        Welcome to Next.js!
      </Link>
    </div>
  )
}
