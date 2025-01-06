'use client'

import { useEffect, useRef } from 'react'

interface MapProps {
  center: google.maps.LatLngLiteral
  zoom: number
}


const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Load the Google Maps API dynamically
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=maps,marker&v=beta`
    script.async = true
    script.onload = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
        })

        new window.google.maps.marker.AdvancedMarkerElement({
          position: center,
          map,
          title: 'Skydive Stockholm',
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [center, zoom])

  return (
    
  )
  // <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
}

export default Map
