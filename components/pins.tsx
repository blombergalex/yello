import { DroppedPin } from './dropped-pin'
import { getPins } from '@/utils/supabase/queries'
import { pinType } from '@/utils/supabase/queries'

export default async function pins({ toggleShowDirections } : { toggleShowDirections: () => void }) {
  const { data, error } = await getPins()

  console.log('data in pins component: ', data)

  // map over all pins and create a dropped pin from each
  return (
    <section>
      {data && //in case data is null
        data.map((pin) => (
          <DroppedPin
            key={pin.id}
            getDirections={toggleShowDirections}
            // data={pin}
            coordinates={pin.coordinates}
            created_at={pin.created_at}
            description={pin.description}
            id={pin.id}
            injured={pin.injured}
            users={pin.users?.name}
          />
        ))}
    </section>
  )
}
