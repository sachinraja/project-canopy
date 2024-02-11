import { LngLat } from 'maplibre-gl'

export interface ParkingLot {
  id: string
  lngLat: LngLat
  area: number
}
