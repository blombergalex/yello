'use client'

import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

import React, { useEffect, useState } from 'react'
import { DroppedPin } from './dropped-pin'

const position = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}

const YelloMap = () => {
  const [showDirections, setShowDirections] = useState<boolean>(false)

  const toggleShowDirections = () => {
    console.log("showDirections state before click: ", showDirections)
    setShowDirections(!showDirections) //if true it sets to false and vice versa
  }

  useEffect(() => {
    console.log('show directions on change: ', showDirections)
  }, [showDirections])


  const Directions = () => {
    const map = useMap()
    const routesLibrary = useMapsLibrary('routes')
    const [directionsService, setDirectionsService] =
      useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer] =
      useState<google.maps.DirectionsRenderer>()
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
    const [userCoords, setUserCoords] = useState<string | null>(null)

    console.log(routes)
    console.log("directionsRenderer ", directionsRenderer)

    useEffect(() => {
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }

              const userCoords = `${pos.lat},${pos.lng}`
              setUserCoords(userCoords)
            }
          )
        } else {
          console.error('Geolocation is not supported by browser')
        }
      }

      getLocation()
    }, []) // getLocation runs once

    useEffect(() => {
      if (!routesLibrary || !map) return
      
      const renderer = new routesLibrary.DirectionsRenderer({ map })
      setDirectionsService(new routesLibrary.DirectionsService())
      setDirectionsRenderer(renderer)

      return () => {
        if (renderer) {
          renderer.setMap(null)
        }
      }
    }, [routesLibrary, map])

    useEffect(() => {
      if (!directionsService || !directionsRenderer || !userCoords) return

      directionsService
        .route({
          origin: `${userCoords}`,
          destination: '60.286041259765625, 17.425235748291016',
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        })
        .then((response) => {
          directionsRenderer.setDirections(response)
          setRoutes(response.routes)
        })
    }, [directionsService, directionsRenderer, userCoords])

    return null
  }

  return (
    <>
      <div className="size-full flex overflow-hidden">
        <Map defaultCenter={position} defaultZoom={12} mapId={process.env.NEXT_PUBLIC_YELLO_MAP_ID}>
          {showDirections && <Directions />}
        </Map>
      </div>
      <DroppedPin color='yellow' getDirections={toggleShowDirections} />
    </>
  )
}

export default YelloMap
