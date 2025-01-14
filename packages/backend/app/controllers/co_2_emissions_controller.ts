import type { HttpContext } from '@adonisjs/core/http'
import CalculationHistory from '#models/calculation_history'
import CO2Emission from '#models/co_2_emissions'
import { calculateCO2EmissionValidator } from '#validators/calculate_co_2_emission'

export default class CO2EmissionController {
  public async calculate({ request, response }: HttpContext) {
    // Validate the request data
    const payload = await request.validateUsing(calculateCO2EmissionValidator)
    const { distance, distanceUnit, transportMethod, outputUnit } = payload

    // Find the CO2 emission data for the given transport method
    const emissionData = await CO2Emission.findBy('transportMethod', transportMethod)
    if (!emissionData) {
      return response.status(404).json({ message: 'Transport method not found' })
    }

    // Calculate the CO2 emission
    let distanceInKm = distance
    if (distanceUnit === 'm') {
      distanceInKm = distance / 1000 // Convert meters to kilometers
    }

    // Calculate the CO2 emission in grams
    const co2Emission = emissionData.co2PerKm * distanceInKm
    const result = outputUnit === 'kg' ? co2Emission / 1000 : co2Emission

    // Save the calculation history
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
