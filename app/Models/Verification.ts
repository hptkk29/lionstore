import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from 'App/Models/Customer'
import { DateTime } from 'luxon'

export default class Verification extends BaseModel {

  public static table = 't_verifications'

  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public token: string

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
