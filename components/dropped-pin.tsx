'use client'

import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'

export const DroppedPin = ({ color, getDirections }: { color: string, getDirections: () => void }) => {
  const skydiverPosition = {
    lat: 60.284,
    lng: 17.4,
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <AdvancedMarker position={skydiverPosition} onClick={() => setOpen(true)}>
        <Pin background={color} glyphColor={color} borderColor={'black'} />
      </AdvancedMarker>
      {open && (
        <InfoWindow
          position={skydiverPosition}
          onCloseClick={() => setOpen(false)}
        >
          <h3>Jane Doe</h3>
          <p>*info about jumper...*</p>
          <button onClick={() => getDirections()}>Go here</button>
        </InfoWindow>
      )}
    </div>
  ) 
}
