import { FC, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => (
  <>
    <main className='p-5 max-w-[1280px] flex flex-col justify-between min-h-screen'>
      {children}
      <div className='flex flex-col'>
        <Link href='/auth/login'>LoginPageLink</Link>
        <Link href='/auth/register'>RegisterPageLink</Link>
        <Link href='/user'>UserPageLink</Link>
      </div>
    </main>
  </>
)
