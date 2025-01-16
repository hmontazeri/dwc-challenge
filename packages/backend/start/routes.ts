/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const API_VERSION = 'v1'

router
  .group(() => {
    // CRUD routes for transport-methods
    router.post(
      `/${API_VERSION}/co2-emissions/transport-methods`,
      '#controllers/co_2_emissions_controller.createTransportMethod'
    )
    router.get(
      `/${API_VERSION}/co2-emissions/transport-methods/:id`,
      '#controllers/co_2_emissions_controller.getTransportMethod'
    )
    router.put(
      `/${API_VERSION}/co2-emissions/transport-methods/:id`,
      '#controllers/co_2_emissions_controller.updateTransportMethod'
    )
    router.delete(
      `/${API_VERSION}/co2-emissions/transport-methods/:id`,
      '#controllers/co_2_emissions_controller.deleteTransportMethod'
    )
    router.get(
      `/${API_VERSION}/co2-emissions/transport-methods`,
      '#controllers/co_2_emissions_controller.transportMethods'
    )
    router.get(
      `/${API_VERSION}/co2-emissions/history`,
      '#controllers/co_2_emissions_controller.history'
    )
    router.post(
      `/${API_VERSION}/co2-emissions/calculate`,
      '#controllers/co_2_emissions_controller.calculate'
    )
  })
  .prefix('api')
