import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'

export default class Invoice extends BaseModel {

  public static table = 't_invoices'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public order_id: number

  @column()
  public invoice_name: string

  @column()
  public invoice_status: string

  @column()
  public invoice_amount: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Order, { foreignKey: 'order_id' })
  public order: BelongsTo<typeof Order>

}
