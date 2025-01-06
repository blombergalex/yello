'use client'

import { APIProvider, Map } from '@vis.gl/react-google-maps'

import React from 'react'
import { DroppedPin } from './dropped-pin'

const position = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}


const map = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="size-full flex overflow-hidden">
        <Map defaultCenter={position} defaultZoom={14} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
        </Map>
      </div>
      <DroppedPin color='yellow' />
    </APIProvider>
  )
}

export default map
