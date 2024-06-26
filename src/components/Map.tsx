'use client'
import { useEffect, useRef, useState } from 'react'
import { Map as MapLibre } from 'maplibre-gl'
import { ParkingLot } from '@/lib/types'
import { LoadingSpinner } from './LoadingSpinner'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ftSquaredToMetersSquared } from '@/lib/utils'

export interface MapProps {
  onFeatureChange?: (parkingLot: ParkingLot) => void
}

export function Map(props: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const currentClickedFeatureId = useRef<string | number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const map = new MapLibre({
      container: mapRef.current!,
      style:
        'https://api.maptiler.com/maps/bright/style.json?key=gzMrkckgmKH9pBxcJMDJ',
      center: [-118.2426, 34.0549],
      zoom: 10,
    })
    map.on('load', () => {
      map
        .addSource('parking-lots', {
          type: 'geojson',
          data: '/parking-lots.geojson',
          generateId: true,
        })
        .addLayer({
          id: 'parking-lots',
          type: 'fill',
          source: 'parking-lots',
          layout: {},
          paint: {
            'fill-color': '#088',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'click'], false],
              0.8,
              0.5,
            ],
          },
        })
        .on('click', 'parking-lots', (e) => {
          const { AIN, Shape_STAr } = e.features![0].properties
          if (currentClickedFeatureId.current) {
            map.setFeatureState(
              { source: 'parking-lots', id: currentClickedFeatureId.current! },
              { click: false },
            )
          }

          const featureId = e.features![0].id!
          map.setFeatureState(
            { source: 'parking-lots', id: featureId },
            { click: true },
          )
          currentClickedFeatureId.current = featureId

          props.onFeatureChange?.({
            id: AIN,
            lngLat: e.lngLat,
            area: ftSquaredToMetersSquared(Shape_STAr),
          })
        })
        .on('mouseover', 'parking-lots', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        .on('mouseout', 'parking-lots', () => {
          map.getCanvas().style.cursor = ''
        })
        .once('idle', () => setIsLoading(false))
    })
    return () => map.remove()
  }, [props.onFeatureChange])

  return (
    <div className="flex flex-col space-y-2">
      <div className="w-[500px] h-[500px]" ref={mapRef} />
      {isLoading && (
        <div className="flex flex-row space-x-2 items-center">
          <LoadingSpinner />
          <p>loading parking lots... (this will take a few seconds)</p>
        </div>
      )}
    </div>
  )
}
