'use client'

import { NextUIProvider } from '@nextui-org/react'
import { APIProvider } from '@vis.gl/react-google-maps'
import React from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_YELLO_API_KEY!}>
        {children}
      </APIProvider>
    </NextUIProvider>
  )
}
