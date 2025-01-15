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
    router.get(
      `/${API_VERSION}/co2-emissions/transport-methods`,
      '#controllers/co_2_emissions_controller.transportMethods'
    )
    router.post(
      `/${API_VERSION}/co2-emissions/calculate`,
      '#controllers/co_2_emissions_controller.calculate'
    )
  })
  .prefix('api')
