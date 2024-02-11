import { formatNumber } from '@/lib/format'
import { getEnergyProduction } from '@/lib/fetch-data'
import { ParkingLot } from '@/lib/types'
import { useEffect, useState } from 'react'

export function ParkingLotDetails(props: { parkingLot: ParkingLot }) {
  const { parkingLot } = props

  const [annualEnergyProduction, setAnnualEnergyProduction] =
    useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState(true)
  useEffect(() => {
    setIsDataLoading(true)
    getEnergyProduction({
      lat: parkingLot.lngLat.lat,
      lon: parkingLot.lngLat.lng,
      // 20% efficiency
      peakPower: props.parkingLot.area * 0.2,
      // 2% loss
      loss: 2,
      tiltAngle: 0,
    }).then((res) => {
      setAnnualEnergyProduction(res.outputs.totals.fixed['E_y'])
      setIsDataLoading(false)
    })
  }, [parkingLot])

  return (
    <div className="bg-slate-800 p-4 rounded-lg w-[20vw]">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="font-semibold">Annual Energy Production</h2>
          <p>
            {isDataLoading ? '...' : formatNumber(annualEnergyProduction)}{' '}
            kWh/yr
            <br />
            {isDataLoading
              ? '...'
              : formatNumber(annualEnergyProduction / parkingLot.area)}{' '}
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
            Conversion Efficiency: 20%
            <br />
            Loss: 2%
          </p>
        </div>
      </div>
    </div>
  )
}
