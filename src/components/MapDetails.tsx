import { formatNumber } from '@/lib/format'
import { getSolarIrradiance } from '@/lib/solar-irradiance'
import { ParkingLot } from '@/lib/types'
import { useEffect, useState } from 'react'

export function ParkingLotDetails(props: { parkingLot: ParkingLot }) {
  const { parkingLot } = props

  const [annualSolarIrradiance, setAnnualSolarIrradiance] = useState<number>(0)
  const [isSolarIrradianceLoading, setIsSolarIrradianceLoading] = useState(true)
  useEffect(() => {
    setIsSolarIrradianceLoading(true)
    getSolarIrradiance({
      lat: parkingLot.lngLat.lat,
      lon: parkingLot.lngLat.lng,
      // 20% efficiency
      peakPower: props.parkingLot.area * 0.2,
      // 2% loss
      loss: 2,
      tiltAngle: 0,
    }).then((res) => {
      console.log(res)
      setAnnualSolarIrradiance(res.outputs.totals.fixed['E_y'])
      setIsSolarIrradianceLoading(false)
    })
  }, [parkingLot])

  return (
    <div className="bg-slate-800 p-4 rounded-lg w-[20vw]">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="font-semibold">Annual Energy Production</h2>
          <p>
            {isSolarIrradianceLoading
              ? '...'
              : formatNumber(annualSolarIrradiance)}{' '}
            kWh/yr
            <br />
            {isSolarIrradianceLoading
              ? '...'
              : formatNumber(annualSolarIrradiance / parkingLot.area)}{' '}
            kWh/m²/yr
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Area</h2>
          <p>{formatNumber(parkingLot.area)} m²</p>
        </div>
        <div>
          <h2 className="font-semibold">Assumptions</h2>
          <p>
            Efficiency: 20%
            <br />
            Loss: 2%
          </p>
        </div>
      </div>
    </div>
  )
}
