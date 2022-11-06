import { useState, useEffect } from 'react'
import { fetcherPost, fetcherGet } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

interface User {
  email: string
  name: string
}

export default function UserPage() {
  const [user, setUser] = useState<User>()
  const router = useRouter()
  const handleLogout = async () => {
    await fetcherPost('api/logout')
    toast.success('ログアウトしました')
    router.push('/auth/login')
  }

  useEffect(() => {
    ;(async () => {
      setUser(await fetcherGet('api/user'))
    })()
  }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>User</h1>
      {user && (
        <div className='mb-4'>
          <p>name:{user?.name}</p>
          <p>email:{user?.email}</p>
        </div>
      )}

      <Button onClick={handleLogout} variant='outlined'>
        Logout
      </Button>
    </div>
  )
}
