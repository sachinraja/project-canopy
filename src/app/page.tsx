import { MapContainer } from '@/components/MapContainer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl">
            <span className="font-semibold">Project Canopy</span> - estimated
            energy generation from parking lot solar canopies
          </h1>
          <p>
            Data sourced from{' '}
            <a
              className="underline"
              href="https://re.jrc.ec.europa.eu/pvg_tools/en/"
            >
              PVGIS
            </a>{' '}
            and{' '}
            <a
              className="underline"
              href="https://data.lacounty.gov/datasets/413ba9befacf41a68f7dcad55a08f9a8"
            >
              LARIAC
            </a>
          </p>
        </div>
        <MapContainer />
      </div>
    </main>
  )
}
