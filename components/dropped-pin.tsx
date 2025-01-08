'use client'

import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'
import {Button} from "@nextui-org/button";

export const DroppedPin = ({
  color,
  getDirections,
}: {
  color: string
  getDirections: () => void
}) => {
  const skydiverPosition = {
    lat: 60.284545435546455464565433,
    lng: 17.445754543434,
  }

  const [open, setOpen] = useState(false)
  const [showCoords, setShowCoords] = useState<boolean>(false)

  const positionString = `${skydiverPosition.lat}, ${skydiverPosition.lng}`

  const toggleCoordinates = () => {
    if (showCoords) {
      setShowCoords(false)
    } else {
      setShowCoords(true)
    }
  }

  return (
    <div>
      <AdvancedMarker position={skydiverPosition} onClick={() => setOpen(true)}>
        <Pin background={color} glyphColor={color} borderColor={'black'} />
      </AdvancedMarker>
      {open && (
        <InfoWindow
          position={skydiverPosition}
          onCloseClick={() => setOpen(false)}
          className="flex flex-col items-start w-full space-y-1 text-lg"
        >
          <h2 className="font-bold">Jane Doe</h2>
          <p>*info about jumper...*</p>
          <Button onPress={() => getDirections()} size="sm" radius="sm">Go here</Button>
          {showCoords ? (
            <div>
              <Button onClick={() => toggleCoordinates()} size="sm" radius="sm">Hide coordinates</Button>
              <div className="flex text-wrap">
                <h3 className='text-sm'>{positionString}</h3>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
        ) : 
        <Button onClick={() => toggleCoordinates()} size="sm" radius="sm">Show coordinates</Button>
        }
        </InfoWindow>
      )}
    </div>
  )
}
