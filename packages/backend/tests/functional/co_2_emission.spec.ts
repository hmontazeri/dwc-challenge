import { test } from '@japa/runner'
import CO2Emission from '#models/co_2_emissions'

type TransportMethod = { transportMethod: string; co2PerKm: number }

test.group('CO2 Emission CRUD', (group) => {
  let createdIds: number[] = []

  group.each.teardown(async () => {
    await CO2Emission.query().whereIn('id', createdIds).delete()
    createdIds = []
  })

  test('should create a new transport method', async ({ client, assert }) => {
    const response = await client.post('/api/v1/co2-emissions/transport-methods').json({
      transportMethod: 'smart-diesel-car',
      co2PerKm: 142,
    })

    response.assertStatus(201)
    assert.equal(response.body().transportMethod, 'smart-diesel-car')
    assert.equal(response.body().co2PerKm, 142)
    createdIds.push(response.body().id)
  })

  test('should get a transport method by ID', async ({ client, assert }) => {
    const created = await CO2Emission.create({
      transportMethod: 'smart-diesel-car',
      co2PerKm: 142,
    })
    createdIds.push(created.id)

    const response = await client.get(`/api/v1/co2-emissions/transport-methods/${created.id}`)

    response.assertStatus(200)
    assert.equal(response.body().transportMethod, 'smart-diesel-car')
    assert.equal(response.body().co2PerKm, 142)
  })

  test('should update a transport method by ID', async ({ client, assert }) => {
    const created = await CO2Emission.create({
      transportMethod: 'smart-diesel-car',
      co2PerKm: 142,
    })
    createdIds.push(created.id)

    const response = await client
      .put(`/api/v1/co2-emissions/transport-methods/${created.id}`)
      .json({
        transportMethod: 'smart-diesel-car',
        co2PerKm: 150,
      })

    response.assertStatus(200)
    assert.equal(response.body().transportMethod, 'smart-diesel-car')
    assert.equal(response.body().co2PerKm, 150)
  })

  test('should delete a transport method by ID', async ({ client }) => {
    const created = await CO2Emission.create({
      transportMethod: 'smart-diesel-car',
      co2PerKm: 142,
    })
    createdIds.push(created.id)

    const response = await client.delete(`/api/v1/co2-emissions/transport-methods/${created.id}`)

    response.assertStatus(204)
  })

  test('should return 404 for a non-existing transport method', async ({ client }) => {
    const response = await client.get('/api/v1/co2-emissions/transport-methods/999')

    response.assertStatus(404)
    response.assertBodyContains({ message: 'Transport method not found' })
  })

  test('should get a list of all transport methods', async ({ client, assert }) => {
    const created = await CO2Emission.create({
      transportMethod: 'smart-diesel-car',
      co2PerKm: 150,
    })
    createdIds.push(created.id)

    const response = await client.get('/api/v1/co2-emissions/transport-methods')

    response.assertStatus(200)
  })
})
