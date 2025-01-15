import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AlterCo2EmissionToFloat extends BaseSchema {
  protected tableName = 'calculationHistories'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('co2Emission').alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('co2Emission').alter()
    })
  }
}
