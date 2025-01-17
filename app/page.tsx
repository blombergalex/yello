import { Header } from '@/components/header'
import { YelloMap } from '@/components/yello-map'
import { getPins } from '@/utils/supabase/queries'
import Link from 'next/link'

export default async function Home() {

  const {data, error} = await getPins()

    // console.log('data in home: ', data)

  return (
    <section className="relative flex flex-col min-h-screen">
      <Header />
      <div className="border-4 rounded-lg border-yellow-500 m-2 h-[400px]">
        <YelloMap />
      </div>
      {error || data.length === 0 ? (
      <p>No pins have been dropped!</p>
      ) : (
      <p>List of pins goes here</p>
      )}
      <section className='grow'>
      <Link href='/log-in' className='text-yellow-500 text-small hover:underline underline-offset-2'>
        Have an account? Log in
      </Link>
      </section>
    </section>
  )
}
