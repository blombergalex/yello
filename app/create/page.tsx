import Link from 'next/link'

import { Logo } from '@/components/logo'
import { CreateForm } from './form'

export default function CreatePinPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Logo />
      <div className="flex w-full flex-col items-center gap-12">
        <h1 className="text-2xl font-bold text-yellow-400">Drop pin of your location</h1>
        <div className="grow"><CreateForm /></div>
      </div>
      <Link
        href="/"
        className="flex text-black text-medium hover:underline underline-offset-2"
      >
        &#8592; Go back to map
      </Link>
    </main>
  )
}
