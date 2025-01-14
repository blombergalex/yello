'use client'

import { Map } from '@vis.gl/react-google-maps'

import React, { useState } from 'react'
import { Directions } from './directions'
import Pins from './pins'

const positionOfHome = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}

export const YelloMap = () => {
  const [showDirections, setShowDirections] = useState<boolean>(false)

  const toggleShowDirections = () => {
    setShowDirections(!showDirections)
  }

  return (
    <>
      <div className="size-full flex overflow-hidden">
        <Map
          defaultCenter={positionOfHome}
          defaultZoom={12}
          mapId={process.env.NEXT_PUBLIC_YELLO_MAP_ID}
        >
          {showDirections && <Directions />}
        </Map>
      </div>
      <Pins toggleShowDirections={toggleShowDirections}/>
    </>
  )
}




