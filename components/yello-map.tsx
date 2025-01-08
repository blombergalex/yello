'use client'

import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

import React, { useEffect, useState } from 'react'
import { DroppedPin } from './dropped-pin'

const position = {
  lat: 60.286041259765625,
  lng: 17.425235748291016,
}

const YelloMap = () => {
    const [showDirections, setShowDirections] = useState<boolean>(false)
  
    const handleShowDirections = () => {
      setShowDirections(true)
    }
  
  const Directions = () => {
    const map = useMap()
    const routesLibrary = useMapsLibrary("routes")
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
    const [userCoords, setUserCoords] = useState<string | null>(null)

    console.log(routes)

    useEffect(() => {
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              const userCoords = `${pos.lat},${pos.lng}`
              setUserCoords(userCoords)
            },
          )
        } else {
          console.error("Geolocation is not supported by browser")
        }
      }

      getLocation()
    }, []) // getLocation runs once

    useEffect(() => {
      if (!routesLibrary || !map) return
      setDirectionsService(new routesLibrary.DirectionsService())
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))

    }, [routesLibrary, map])

    useEffect(() => {
      if (!directionsService || !directionsRenderer || !userCoords) return

      directionsService.route({
        origin: `${userCoords}`, 
        destination: "60.286041259765625, 17.425235748291016", // either coordinates or adress works, get users positon as either but preferably current position coordinates
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      }).then(response => {
        directionsRenderer.setDirections(response)
        setRoutes(response.routes)
      })
    }, [directionsService, directionsRenderer, userCoords])
    
    return null
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="size-full flex overflow-hidden">
        <Map defaultCenter={position} defaultZoom={12} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          {showDirections && <Directions />}
        </Map>
      </div>
      <DroppedPin color='yellow' getDirections={handleShowDirections} />
    </APIProvider>
  )
}

export default YelloMap
