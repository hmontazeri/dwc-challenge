import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CO2Emission extends BaseModel {
  public static table = 'co2Emissions'
  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'transportMethod' })
  public transportMethod!: string

  @column({ columnName: 'co2PerKm' })
  public co2PerKm!: number // CO2 emission in grams per kilometer

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
