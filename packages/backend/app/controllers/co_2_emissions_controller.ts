import type { HttpContext } from '@adonisjs/core/http'
import CalculationHistory from '#models/calculation_history'
import CO2Emission from '#models/co_2_emissions'

export default class CO2EmissionController {
  public async calculate({ request, response }: HttpContext) {
    const { distance, distanceUnit, transportMethod, outputUnit } = request.only([
      'distance',
      'distanceUnit',
      'transportMethod',
      'outputUnit',
    ])

    const emissionData = await CO2Emission.findBy('transportMethod', transportMethod)
    if (!emissionData) {
      return response.status(404).json({ message: 'Transport method not found' })
    }

    let distanceInKm = distance
    if (distanceUnit === 'm') {
      distanceInKm = distance / 1000 // Convert meters to kilometers
    }

    const co2Emission = emissionData.co2PerKm * distanceInKm
    const result = outputUnit === 'kg' ? co2Emission / 1000 : co2Emission

    await CalculationHistory.create({
      distance,
      distanceUnit,
      transportMethod,
      co2Emission: result,
      outputUnit,
    })

    return response.json({ co2Emission: result, unit: outputUnit })
  }
}
