import YelloMap from '@/components/yello-map'

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-yellow-500 text-lg">Yello</h1>
      </div>
      <div className="border-4 rounded-lg border-yellow-500 m-2 h-[400px]">
        <YelloMap />
      </div>
    </>
  )
}
