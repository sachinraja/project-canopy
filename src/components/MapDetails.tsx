import { formatMoney, formatNumber } from '@/lib/format'
import { getEnergyProduction } from '@/lib/fetch-data'
import { ParkingLot } from '@/lib/types'
import { useEffect, useState } from 'react'
import {
  CONVERSION_EFFICIENCY,
  TRANSMISSION_LOSS,
  getPeakPower,
  getSavings,
  getSystemCost,
} from '@/lib/calculate'

export function ParkingLotDetails(props: { parkingLot: ParkingLot }) {
  const { parkingLot } = props

  const [annualEnergyProduction, setAnnualEnergyProduction] =
    useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const peakPower = getPeakPower(parkingLot.area)
  const annualKilowattsPerSquareMeter = annualEnergyProduction / parkingLot.area
  useEffect(() => {
    setIsDataLoading(true)
    getEnergyProduction({
      lat: parkingLot.lngLat.lat,
      lon: parkingLot.lngLat.lng,
      // 20% efficiency
      peakPower,
      // 2% loss
      loss: 14,
    }).then((res) => {
      console.log(JSON.stringify(res))
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
              : formatNumber(annualKilowattsPerSquareMeter)}{' '}
            kWh/m²/yr
            <br />
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Price</h2>
          <p>
            Peak Power: {formatNumber(peakPower)} kW
            <br />
            System Cost: {formatMoney(getSystemCost(peakPower))}
            <br />
            Savings:{' '}
            {isDataLoading
              ? '...'
              : formatMoney(
                  getSavings({
                    area: parkingLot.area,
                    annualKilowattsPerSquareMeter,
                  }),
                )}
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Area</h2>
          <p>{formatNumber(parkingLot.area)} m²</p>
        </div>
        <div>
          <h2 className="font-semibold">Assumptions</h2>
          <p>
            Conversion Efficiency: {CONVERSION_EFFICIENCY * 100}%
            <br />
            Transmission Loss: {TRANSMISSION_LOSS * 100}%
          </p>
        </div>
      </div>
    </div>
  )
}
