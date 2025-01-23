import Link from 'next/link'

import { Logo } from '@/components/logo'
import { CreateForm } from './form'

export default function CreatePinPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Logo />
      <div className="flex w-full flex-col items-center gap-12 my-auto">
        <h1 className="text-2xl font-bold text-yellow-400">Drop a pin</h1>
        <div className="w-full"><CreateForm /></div>
      </div>
      <Link
        href="/"
        className="flex text-gray-400 text-medium hover:underline underline-offset-2 m-2"
      >
        &#8592; Go back to map
      </Link>
    </main>
  )
}
