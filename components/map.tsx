'use client'

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'

import React from 'react'

const projectId = process.env.GOOGLE_MAPS_PROJECT_ID
const position = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

const map = () => {
  return (
    <APIProvider apiKey={API_KEY}>
      <div className="h-lvh w-full">
        <Map defaultCenter={position} zoom={14} mapId={projectId}></Map>
      </div>
    </APIProvider>
  )
}

export default map
