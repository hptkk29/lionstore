import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Country from 'App/Models/Country'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'

export default class OrderAddress extends BaseModel {

  public static table = 't_order_address'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public customer_id: number | null

  @column()
  public order_id: number

  @column()
  public name: string | null

  @column()
  public phone: string | null

  @column()
  public address: string | null

  @column()
  public country_id: number | null

  @column()
  public state: string | null

  @column()
  public city: string | null

  @column()
  public zipcode: string | null

  @belongsTo(() => Country, { foreignKey: 'country_id' })
  public country: BelongsTo<typeof Country>

  @belongsTo(() => Order, { foreignKey: 'order_id' })
  public order: BelongsTo<typeof Order>

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

}
