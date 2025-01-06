// hooks/useGoogleMaps.ts
import { useEffect } from 'react'

const API_KEY = process.env.API_KEY

const useGoogleMaps = () => {
  useEffect(() => {
    if (window.google) return // If already loaded, no need to load again

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=maps,marker&v=beta`
    script.async = true
    script.onload = () => {
      console.log('Google Maps API loaded')
    }

    document.head.appendChild(script)

    return () => {
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [])
}

export default useGoogleMaps
