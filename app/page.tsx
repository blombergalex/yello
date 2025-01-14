import { Header } from '@/components/header'
import { YelloMap } from '@/components/yello-map'
import { getPins } from '@/utils/supabase/queries'

export default async function Home() {

  const {data, error} = await getPins()

    // console.log('data in home: ', data)

  return (
    <section className="relative">
      <Header />
      <div className="border-4 rounded-lg border-yellow-500 m-2 h-[400px]">
        <YelloMap />
      </div>
      {error || data.length === 0 ? (
        <p>No pins have been dropped!</p>
      ) : (
        <p>List of pins goes here</p>
      )}
    </section>
  )
}
