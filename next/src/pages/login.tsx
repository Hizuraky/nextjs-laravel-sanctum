import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { apiClient, apiServer } from '@/utils/apiClient'
import { useEffect } from 'react'
import axios from 'axios'
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
