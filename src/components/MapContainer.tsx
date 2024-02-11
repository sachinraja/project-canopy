'use client'
import { useCallback, useState } from 'react'
import { Map, MapProps } from './Map'
import { ParkingLotDetails } from './MapDetails'
import { ParkingLot } from '@/lib/types'

export function MapContainer() {
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null)
  const onFeatureChange = useCallback<NonNullable<MapProps['onFeatureChange']>>(
    (newParkingLot) => {
      setParkingLot((parkingLot) => {
        if (parkingLot?.id !== newParkingLot.id) return newParkingLot
        return parkingLot
      })
    },
    [],
  )

  return (
    <div className="flex flex-row space-x-4">
      <Map onFeatureChange={onFeatureChange} />
      {parkingLot ? (
        <ParkingLotDetails parkingLot={parkingLot} />
      ) : (
        <div>Click on a parking lot to see details</div>
      )}
    </div>
  )
}
