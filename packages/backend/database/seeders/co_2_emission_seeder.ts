import CO2Emission from '#models/co_2_emissions'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const emissions = [
      { transportMethod: 'small-diesel-car', co2PerKm: 142 },
      { transportMethod: 'small-petrol-car', co2PerKm: 154 },
      { transportMethod: 'small-plugin-hybrid-car', co2PerKm: 73 },
      { transportMethod: 'small-electric-car', co2PerKm: 50 },
      { transportMethod: 'medium-diesel-car', co2PerKm: 171 },
      { transportMethod: 'medium-petrol-car', co2PerKm: 192 },
      { transportMethod: 'medium-plugin-hybrid-car', co2PerKm: 110 },
      { transportMethod: 'medium-electric-car', co2PerKm: 58 },
      { transportMethod: 'large-diesel-car', co2PerKm: 209 },
      { transportMethod: 'large-petrol-car', co2PerKm: 282 },
      { transportMethod: 'large-plugin-hybrid-car', co2PerKm: 126 },
      { transportMethod: 'large-electric-car', co2PerKm: 73 },
      { transportMethod: 'bus', co2PerKm: 27 },
      { transportMethod: 'train', co2PerKm: 6 },
    ]

    await CO2Emission.createMany(emissions)
  }
}
