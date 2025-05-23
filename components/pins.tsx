import { useEffect, useState } from 'react'
import { DroppedPin } from './dropped-pin'
import { getPins, pinType } from '@/utils/supabase/queries'
import { toast } from 'sonner'

export default function Pins({
  toggleShowDirections,
}: {
  toggleShowDirections: () => void
}) {
  const [data, setData] = useState<pinType>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getPins()
      if (error) {
        toast.error('Error fetching data')
      } else {
        setData(data)
      }
    }
    fetchData()
  }, [])

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
            user_id={pin.user_id}
            username={pin.users?.username}
          />
        ))}
    </>
  )
}
