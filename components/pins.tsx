import { useEffect, useState } from 'react'
import { DroppedPin } from './dropped-pin'
import { getPins, pinType } from '@/utils/supabase/queries'

export default function Pins({
  toggleShowDirections,
}: {
  toggleShowDirections: () => void
}) {
  const [data, setData] = useState<pinType>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getPins()
      if (error) {
        setError(error)
      } else {
        setData(data)
      }
    }
    fetchData()
  }, [])

  console.log('data', data)

  return (
    <section className='flex flex-col'>
      {data &&
        data.map((pin) => (
          <DroppedPin
            key={pin.id}
            getDirections={toggleShowDirections}
            coordinates={pin.coordinates}
            created_at={pin.created_at}
            description={pin.description}
            id={pin.id}
            injured={pin.injured}
            username={pin.users?.username}
            user_id={pin.user_id} // I have pin.description why not pin.user_id when it's in the table????
          />
        ))}
      {error && (
        <div className="font-bold text-yellow-600">
          <p>{error.message}</p>
        </div>
      )}
    </section>
  )
}
