export const CONVERSION_EFFICIENCY = 0.183
export const TRANSMISSION_LOSS = 0.02

// $1,760 per kW
export function getSystemCost(peakPower: number) {
  return 1760 * peakPower
}
