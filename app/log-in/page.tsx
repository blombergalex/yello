import Link from 'next/link'

import { LogInForm } from './form'
import { Logo } from '@/components/logo'

export default function LogInPage() {
  return (
    <main className='main flex h-screen flex-col items-center justify-center gap-6'>
      {/* <Link
        className={`${moiraiOne.className} text-6xl font-bold self-start absolute top-2 left-2 text-yellow-500`}
        href="/"
      >
        Yello
      </Link> */}
      <Logo />
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold text-yellow-400'>Welcome</h1>
        <LogInForm />
      </div>
      <Link href='/sign-up' className='text-yellow-500 text-small hover:underline underline-offset-2'>
        Don&quot;t have an account? Sign up
      </Link>
    </main>
  )
}
