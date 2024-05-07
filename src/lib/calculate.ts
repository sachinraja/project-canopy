export const CONVERSION_EFFICIENCY = 0.2
export const TRANSMISSION_LOSS = 0.02

// $1,760 per kW
export function getSystemCost(peakPower: number) {
  return 1760 * peakPower
}

export function getPeakPower(area: number) {
  return CONVERSION_EFFICIENCY * area
}
interface PricingOptions {
  area: number
  annualKilowattsPerSquareMeter: number
}

const DISCOUNT_RATE = 0.04
const STARTING_UTILITY_RATE = 0.33 // 33 cents for every kWh
const UTILITY_RATE_YEARLY_INCREASE = 0.022
const SYSTEM_LIFETIME_YEARS = 25

export function getSavings(options: PricingOptions) {
  const peakPower = getPeakPower(options.area)
  const initialCost = getSystemCost(peakPower)
  const annualEnergyProduction =
    options.area * options.annualKilowattsPerSquareMeter

  let totalRevenue = 0
  for (let i = 0; i < SYSTEM_LIFETIME_YEARS; i++) {
    const utilityRate =
      STARTING_UTILITY_RATE * Math.pow(1 + UTILITY_RATE_YEARLY_INCREASE, i)
    const discountRate = Math.pow(1 + DISCOUNT_RATE, i)
    totalRevenue += (utilityRate * annualEnergyProduction) / discountRate
  }
  return totalRevenue - initialCost
}
