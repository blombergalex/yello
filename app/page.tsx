import { Header } from '@/components/header'
import YelloMap from '@/components/yello-map'

export default function Home() {
  return (
    <section className="relative">
      <Header />
      <div className="border-4 rounded-lg border-yellow-500 m-2 h-[400px]">
        <YelloMap />
      </div>
    </section>
  )
}
