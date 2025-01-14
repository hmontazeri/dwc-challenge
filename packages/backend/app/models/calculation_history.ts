import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CalculationHistory extends BaseModel {
  public static table = 'calculationHistories'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'distance' })
  public distance!: number

  @column({ columnName: 'distanceUnit' })
  public distanceUnit!: string

  @column({ columnName: 'transportMethod' })
  public transportMethod!: string

  @column({ columnName: 'co2Emission' })
  public co2Emission!: number

  @column({ columnName: 'outputUnit' })
  public outputUnit!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
