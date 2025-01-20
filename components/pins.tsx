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

  console.log(data)

  return (
    <>
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
            // users={pin.users ? pin.users.username : ''}
          />
        ))}
      {error && (
        <section className="flex font-bold text-yellow-600">
          <p>{error.message}</p>
        </section>
      )}
    </>
  )
}
