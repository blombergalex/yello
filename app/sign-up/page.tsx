import Link from 'next/link'
import { Moirai_One } from 'next/font/google'

import { SignUpForm } from './form'

const moiraiOne = Moirai_One({
  weight: '400',
  subsets: ['latin'],
})

export default function LogInPage() {
  return (
    <main className='main flex h-screen flex-col items-center justify-center gap-6'>
      <Link
        className={`${moiraiOne.className} text-6xl font-bold self-start absolute top-8 left-8 text-yellow-500`}
        href="/"
      >
        Yello
      </Link>
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold text-yellow-400'>Welcome</h1>
        <SignUpForm />
      </div>
      <Link href='/log-in' className='text-yellow-500 text-small hover:underline underline-offset-2'>
        Already have an account? Log in
      </Link>
    </main>
  )
}
