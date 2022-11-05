import Button from '@mui/material/Button'
import { useState } from 'react'
import { CommonInput } from '@/components/CommonInput'
import { fetcherPost, fetcherGet } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    await fetcherGet('/sanctum/csrf-cookie')
    const { err } = await fetcherPost('api/login', { email: email, password: password })
    if (err) {
      toast.error(err.data.message)
    } else {
      toast.success('ログインしました')
      router.push('/')
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Login</h1>
      <CommonInput onChange={setEmail} label='email' className='w-3/4 mb-4' />
      <CommonInput onChange={setPassword} label='password' className='w-3/4 mb-4' />
      <Button onClick={handleLogin} variant='outlined'>
        Login
      </Button>
    </div>
  )
}
