import { ActionBar } from '@/components/action-bar'
import { Header } from '@/components/header'
import { YelloMap } from '@/components/yello-map'
import { getPins } from '@/utils/supabase/queries'

export default async function Home() {
  const { data, error } = await getPins()

  return (
    <section className="relative flex flex-col min-h-screen">
      <Header />
      <div className="border-4 rounded-lg border-yellow-500 m-2 h-[600px]">
        <YelloMap />
      </div>
      {error || data.length === 0 ? (
        <div className='flex grow p-2'>
          <p>No pins dropped.</p>
        </div>
      ) : (
        <p className='grow'>List of pins goes here</p>
      )}
      <ActionBar />
    </section>
  )
}
