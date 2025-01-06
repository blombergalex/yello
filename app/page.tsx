import Map from '@/components/map'

export default function Home() {
  const center: google.maps.LatLngLiteral = {
    lat: 60.286041259765625, // Latitude
    lng: 17.425235748291016, // Longitude
  }
  const zoom = 14 // Zoom level

  return (
    <div>
      <p className="text-yellow-500">Yello</p>
      <Map center={center} zoom={zoom} />
    </div>
  )
}

{
  /* <gmp-map center="60.286041259765625,17.425235748291016" zoom="14" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="60.286041259765625,17.425235748291016" title="My location"></gmp-advanced-marker>
    </gmp-map> */
}
