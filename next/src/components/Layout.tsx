import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { fetcherPost } from '../utils/fetcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const handleLogout = async () => {
    await fetcherPost('api/logout')
    toast.success('ログアウトしました')
    router.push('/auth/login')
  }
  return (
    <>
      <main className='p-5 max-w-[1280px] flex flex-col justify-between min-h-screen'>
        {children}
        <div className='flex flex-col'>
          <Link href='/auth/login'>LoginPageLink</Link>
          <Link href='/user'>UserPageLink</Link>
          <p className='cursor-pointer' onClick={handleLogout}>
            HandleLogout
          </p>
        </div>
      </main>
    </>
  )
}
