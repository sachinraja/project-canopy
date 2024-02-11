'use server'

export async function getSolarIrradiance(options: {
  lat: number
  lon: number
  peakPower: number
  loss: number
  tiltAngle: number
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
    angle: options.tiltAngle.toString(),
    mountingplace: 'building',
    outputformat: 'json',
  })

  const res = await fetch(
    `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?${params}`,
  )

  return res.json()
}
