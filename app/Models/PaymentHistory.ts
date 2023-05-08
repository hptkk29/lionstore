import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'
import Customer from 'App/Models/Customer'

export default class PaymentHistory extends BaseModel {

  public static table = 't_payments_history'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public customer_id: number

  @column()
  public order_id: string

  @column()
  public transaction_id: string

  @column()
  public payment_method: string

  @column()
  public payment_amount: string | number

  @column()
  public payment_currency: string

  @column()
  public payment_currency_locale: string

  @column()
  public payment_details: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Order, { foreignKey: 'id' })
  public order: HasOne<typeof Order>

  @hasOne(() => Customer, { foreignKey: 'id' })
  public customer: HasOne<typeof Customer>

}
