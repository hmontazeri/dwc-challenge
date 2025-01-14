import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'calculationHistories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('distance').notNullable()
      table.string('distanceUnit').notNullable()
      table.string('transportMethod').notNullable()
      table.integer('co2Emission').notNullable() // CO2 emission result
      table.string('outputUnit').notNullable() // g or kg
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
