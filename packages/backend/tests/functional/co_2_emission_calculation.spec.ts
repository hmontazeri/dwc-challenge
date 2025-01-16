import { test } from '@japa/runner'
import CalculationHistory from '#models/calculation_history'

test.group('CO2 Emission Calculation', (group) => {
  let createdIds: number[] = []

  group.each.teardown(async () => {
    await CalculationHistory.query().whereIn('id', createdIds).delete()
    createdIds = []
  })

  test('should calculate CO2 emissions for a valid transport method', async ({
    client,
    assert,
  }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 100,
      distanceUnit: 'km',
      transportMethod: 'small-diesel-car',
      outputUnit: 'g',
    })

    response.assertStatus(200)
    assert.equal(response.body().co2Emission, 14200)
    assert.equal(response.body().unit, 'g')

    const history = await CalculationHistory.findBy('id', response.body().id)
    if (history) {
      createdIds.push(history.id)
    }
  })

  test('should return 404 for an invalid transport method', async ({ client }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 100,
      distanceUnit: 'km',
      transportMethod: 'invalid-transport',
      outputUnit: 'g',
    })

    response.assertStatus(404)
    response.assertBodyContains({ message: 'Transport method not found' })
  })

  test('should calculate CO2 emissions in kilograms', async ({ client, assert }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 1000, // 1000 km
      distanceUnit: 'km',
      transportMethod: 'bus',
      outputUnit: 'kg',
    })

    response.assertStatus(200)
    assert.equal(response.body().co2Emission, 27) // 1000 * 27 / 1000 = 27 kg
    assert.equal(response.body().unit, 'kg')

    const history = await CalculationHistory.findBy('id', response.body().id)
    if (history) {
      createdIds.push(history.id)
    }
  })

  test('should handle distance in meters and convert to kilometers', async ({ client, assert }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 5000, // 5000 meters = 5 km
      distanceUnit: 'm',
      transportMethod: 'train',
      outputUnit: 'g',
    })

    response.assertStatus(200)
    assert.equal(response.body().co2Emission, 30) // 5 km * 6 g/km = 30 g
    assert.equal(response.body().unit, 'g')

    const history = await CalculationHistory.findBy('id', response.body().id)
    if (history) {
      createdIds.push(history.id)
    }
  })

  test('should return 422 for missing required fields', async ({ client }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 100,
      distanceUnit: 'km',
    })

    response.assertStatus(422)
  })

  test('should return 422 for invalid distance unit', async ({ client }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 100,
      distanceUnit: 'invalid-unit',
      transportMethod: 'small-diesel-car',
      outputUnit: 'g',
    })

    response.assertStatus(422)
  })

  test('should return 422 for invalid output unit', async ({ client }) => {
    const response = await client.post('/api/v1/co2-emissions/calculate').json({
      distance: 100,
      distanceUnit: 'km',
      transportMethod: 'small-diesel-car',
      outputUnit: 'invalid-unit',
    })

    response.assertStatus(422)
  })
})
