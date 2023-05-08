import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import OrderProductVariant from 'App/Models/OrderProductVariant'
import PaymentHistory from 'App/Models/PaymentHistory'
import OrderAddress from 'App/Models/OrderAddress'
import OrderProduct from 'App/Models/OrderProduct'
import Customer from 'App/Models/Customer'
import Invoice from 'App/Models/Invoice'
import { DateTime } from 'luxon'

export default class Order extends BaseModel {

  public static table    = 't_orders'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public customer_id: number

  @column()
  public customer_ip: string

  @column()
  public order_number: string

  @column()
  public order_status: string

  @column()
  public cancel_reason: string

  @column()
  public payment_id: number

  @column()
  public total_price: string

  @column()
  public subtotal_price: string

  @column()
  public shipping_cost: string

  @column()
  public taxes_cost: string

  @column()
  public discount_code: string

  @column()
  public discount_type: string

  @column()
  public discount_value: string

  @column()
  public invoice_id: number

  @column()
  public invoice_tracking_code: string

  @column()
  public order_notes: string

  @column()
  public order_source_name: string

  @column.dateTime({ autoCreate: true })
  public placed_at: DateTime

  @column.dateTime()
  public processed_at: DateTime

  @column.dateTime()
  public shipped_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public cancelled_at: DateTime

  @column.dateTime()
  public delivered_at: DateTime

  @column.dateTime()
  public refunded_at: DateTime

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

  @belongsTo(() => PaymentHistory, { foreignKey: 'payment_id' })
  public payment: BelongsTo<typeof PaymentHistory>

  @belongsTo(() => Invoice, { foreignKey: 'invoice_id' })
  public invoice: BelongsTo<typeof Invoice>

  @hasOne(() => OrderAddress, { foreignKey: 'order_id' })
  public address: HasOne<typeof OrderAddress>

  @hasMany(() => OrderProduct, { foreignKey: 'order_id' })
  public products: HasMany<typeof OrderProduct>

  @hasMany(() => OrderProductVariant, { foreignKey: 'order_id' })
  public variants: HasMany<typeof OrderProductVariant>

}
