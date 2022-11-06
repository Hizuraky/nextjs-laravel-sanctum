import Button from '@mui/material/Button'
import { useState } from 'react'
import { CommonInput } from '@/components/CommonInput'
import { fetcherPost, fetcherGet } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface ErrMsg {
  email?: string
  name?: string
  password?: string
}

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessages, setErrorMessages] = useState<ErrMsg>()
  const router = useRouter()

  const handleRegistration = async () => {
    await fetcherGet('sanctum/csrf-cookie')
    const { err } = await fetcherPost('api/register', {
      name: name,
      email: email,
      password: password,
    })
    if (err) {
      err.status === 422 ? setErrorMessages(err.data.message) : toast.error(err.data.message)
    } else {
      await fetcherPost('api/login', { email: email, password: password })
      setErrorMessages({})
      toast.success('登録しました')
      router.push('/')
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Register</h1>
      <CommonInput
        onChange={setName}
        label='name'
        className='w-3/4 mb-4'
        errorMessage={errMessages?.name}
      />
      <CommonInput
        onChange={setEmail}
        label='email'
        className='w-3/4 mb-4'
        errorMessage={errMessages?.email}
      />
      <CommonInput
        onChange={setPassword}
        label='password'
        className='w-3/4 mb-4'
        errorMessage={errMessages?.password}
      />
      <Button onClick={handleRegistration} variant='outlined'>
        Registration
      </Button>
    </div>
  )
}
