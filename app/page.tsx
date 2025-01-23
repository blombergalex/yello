import { ActionBar } from '@/components/action-bar'
import { Header } from '@/components/header'
import { YelloMap } from '@/components/yello-map'
import { getPins } from '@/utils/supabase/queries'

export default async function Home() {
  const { data, error } = await getPins()

  return (
    <section className="relative flex flex-col h-screen">
      <Header />
      <div className="flex h-2/3 border-4 rounded-lg border-yellow-400 m-2">
        <YelloMap />
      </div>
      {error || data.length === 0 ? (
        <div className="flex p-2 grow">
          <p>No pins dropped.</p>
        </div>
      ) : (
        <div className="flex p-2 grow">
          {/* <p>List of pins goes here</p> */}
        </div>
      )}
      <ActionBar />
    </section>
  )
}
