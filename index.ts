import { readFileSync, writeFileSync } from 'node:fs'

const text = JSON.parse(readFileSync('public/parking-lots.geojson', 'utf-8'))
writeFileSync('public/parking-lots.json', JSON.stringify(text), 'utf-8')
