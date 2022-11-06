import Button from '@mui/material/Button'
import { useState } from 'react'
import { CommonInput } from '@/components/CommonInput'
import { fetcherPost } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegistration = async () => {
    const { err } = await fetcherPost('api/register', {
      name: name,
      email: email,
      password: password,
    })
    if (err) {
      console.log(err)

      toast.error(err.data.message)
    } else {
      toast.success('登録しました')
      // router.push('/')
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Register</h1>
      <CommonInput onChange={setName} label='name' className='w-3/4 mb-4' />
      <CommonInput onChange={setEmail} label='email' className='w-3/4 mb-4' />
      <CommonInput onChange={setPassword} label='password' className='w-3/4 mb-4' />
      <Button onClick={handleRegistration} variant='outlined'>
        Registration
      </Button>
    </div>
  )
}
