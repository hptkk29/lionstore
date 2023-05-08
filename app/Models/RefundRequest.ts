import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'
import { DateTime } from 'luxon'

export default class RefundRequest extends BaseModel {

  public static table    = 't_refunds_requests'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public order_id: number

  @column()
  public refund_reason: string | null

  @column()
  public is_seen: boolean

  @column()
  public is_processed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

  @belongsTo(() => Order, { foreignKey: 'order_id' })
  public order: BelongsTo<typeof Order>

}
