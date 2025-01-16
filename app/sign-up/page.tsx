import Link from 'next/link'

import { SignUpForm } from './form'

export default function LogInPage() {
  return (
    <main className='main flex h-screen flex-col items-center justify-center gap-6'>
      <Link
        className="uppercase font-bold text-medium self-start absolute top-8 left-8 text-black"
        href="/"
      >
        Yello
      </Link>
      <div className='flex w-full flex-col items-center gap-12'>
        <h1 className='text-2xl font-bold'>Welcome to Yello</h1>
        <SignUpForm />
      </div>
      <Link href='/log-in' className='text-yellow-500 text-small hover:underline underline-offset-2'>
        Already have an account? Log in
      </Link>
    </main>
  )
}
