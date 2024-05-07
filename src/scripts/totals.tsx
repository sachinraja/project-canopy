import { getSavings } from '@/lib/calculate'
import { formatMoney, formatNumber } from '@/lib/format'
import { ftSquaredToMetersSquared } from '@/lib/utils'
import { readFileSync } from 'fs'

const parkingLots = JSON.parse(
  readFileSync('public/parking-lots.geojson', 'utf8'),
).features

const annualKilowattsPerSquareMeter = 325
function calculateTotals() {
  let savings = 0
  let yearlyKwh = 0
  for (const parkingLot of parkingLots) {
    const area = ftSquaredToMetersSquared(parkingLot.properties.Shape_STAr)
    savings += getSavings({ area, annualKilowattsPerSquareMeter })

    const annualEnergyProduction = area * annualKilowattsPerSquareMeter
    yearlyKwh += annualEnergyProduction
  }

  return { savings, yearlyKwh }
}

const totals = calculateTotals()

console.log('Savings: ' + formatMoney(totals.savings))
console.log('kwh/yr: ' + formatNumber(totals.yearlyKwh))
