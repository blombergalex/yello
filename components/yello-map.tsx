'use client'

import { Map } from '@vis.gl/react-google-maps'

import React, { useState } from 'react'
import { DroppedPin } from './dropped-pin'
import { getPins } from '@/utils/supabase/queries'
import { Directions } from './directions'

const position = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}

const YelloMap = () => {
  const [showDirections, setShowDirections] = useState<boolean>(false)
  // const [error, setError] = useState<string | null>(null)
  // const [pinData, setPinData] = useState<string[] | null>(null)

  const toggleShowDirections = () => {
    setShowDirections(!showDirections)
  }

  return (
    <>
      <div className="size-full flex overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId={process.env.NEXT_PUBLIC_YELLO_MAP_ID}
        >
          {showDirections && <Directions />}
        </Map>
      </div>
      {/* {error || pinData!.length === 0 ? (
        <p>No dropped pins yet!</p>
      ) : (
        pinData!.map(({ id, created_at, coordinates, description, users, injured}) => (
          <DroppedPin color="yellow" getDirections={toggleShowDirections} 
            key={id}
            name={users?.name || "unknown"}
            time={created_at}
            description={description}
            injured={injured}
            coordinates={coordinates}
          />
        ) )}
      )  */}
      <DroppedPin color="yellow" getDirections={toggleShowDirections} />
    </>
  )
}

export default YelloMap



