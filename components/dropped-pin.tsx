'use client'

import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'

export const DroppedPin = ({
  getDirections,
  coordinates,
  created_at,
  description,
  injured,
  users,
}: {
  getDirections: () => void
  coordinates: string,
  created_at: string,
  description: string | null,
  id: string,
  injured: boolean | null,
  users: string | undefined
}) => {
  
  const [open, setOpen] = useState<boolean>(false)
  const [showCoords, setShowCoords] = useState<boolean>(false)
  const [routeBtn, setRouteBtn] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(false)
  
  const coordinatesArray = { 
    lat: Number(coordinates.split(', ')[0]),
    lng: Number(coordinates.split(', ')[1])
  }

  console.log('coordarray: ', coordinatesArray)
  
  const gubbangen = {
    lat: 59.26466205817659,
    lng: 18.081463238506704
  }

  console.log('gubbangen: ', gubbangen) 

  const handleClose = () => {
    setOpen(false)
  }

  const toggleCoordinates = () => {
    setShowCoords(!showCoords)
  }

  const controlRouteBtn = () => {
    if (routeBtn) {
      getDirections()
      setRouteBtn(false)
    } else {
      getDirections()
      setRouteBtn(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(coordinates)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${coordinates}`
    window.open(url, '_blank')
  }

  const color = () => {
    if (injured) {
      return 'red'
    } else {
      return 'yellow'
    }
  }

  const time = () => {
    const date = new Date(created_at)
    return date.toLocaleString()
  }

  return (
    <div>
      <AdvancedMarker position={gubbangen} onClick={() => setOpen(true)}>
        <Pin background={color()} glyphColor={color()} borderColor={'black'} />
      </AdvancedMarker>
      {open && (
        <InfoWindow
          // position={coordinatesArray}
          position={gubbangen}
          onCloseClick={() => handleClose()}
          className="flex flex-col items-start w-full space-y-2 p-1"
        >
          <h2 className="font-bold">{users}</h2>
          <p>{description ?? ''}</p>
          <p className='text-tiny text-gray-500'>{time()}</p>
          {routeBtn ? (
            <Button
              onPress={() => controlRouteBtn()}
              size="sm"
              radius="sm"
              className="bg-yellow-400"
            >
              Show route
            </Button>
          ) : (
            <Button
              onPress={() => controlRouteBtn()}
              size="sm"
              radius="sm"
              className="bg-yellow-400"
            >
              Hide route
            </Button>
          )}
          {showCoords ? (
            <div className="space-y-1">
              <Button
                onPress={() => toggleCoordinates()}
                size="sm"
                radius="sm"
                className="bg-yellow-500"
              >
                Hide coordinates
              </Button>
              <div className="flex text-wrap items-center">
                <h3 className="text-xs w-min">{coordinates}</h3>
                <button className="p-2" onClick={() => handleCopy()}>
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <Button
              onPress={() => toggleCoordinates()}
              size="sm"
              radius="sm"
              className="bg-yellow-500"
            >
              Show coordinates
            </Button>
          )}
          <Button
            size="sm"
            radius="sm"
            className="items-center"
            onPress={() => openInGoogleMaps()}
          >
            Open in Google Maps
          </Button>
        </InfoWindow>
      )}
    </div>
  )
}
