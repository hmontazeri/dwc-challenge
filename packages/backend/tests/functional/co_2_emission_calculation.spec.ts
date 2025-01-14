import { test } from '@japa/runner'

test.group('CO2 Emission Calculation', (group) => {
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
  })
})
