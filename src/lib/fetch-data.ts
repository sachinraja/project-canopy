'use server'
import { unstable_cache } from 'next/cache'

async function fetchEnergyProduction(options: {
  lat: number
  lon: number
  peakPower: number
  loss: number
}): Promise<{
  outputs: {
    totals: {
      fixed: {
        'H(i)_y': number
        SD_y: number
        E_y: number
      }
    }
  }
}> {
  const params = new URLSearchParams({
    lat: options.lat.toString(),
    lon: options.lon.toString(),
    peakpower: options.peakPower.toString(),
    loss: options.loss.toString(),
    mountingplace: 'building',
    outputformat: 'json',
    optimalangles: '1',
  })

  const res = await fetch(
    `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?${params}`,
  )

  return res.json()
}

export const getEnergyProduction = unstable_cache(fetchEnergyProduction, [
  'energy-production',
])
