import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customer from 'App/Models/Customer'
import Product from 'App/Models/Product'

export default class Wishlist extends BaseModel {

  public static table = 't_wishlist'

  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public customer_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product, { foreignKey: 'product_id' })
  public product: BelongsTo<typeof Product>

}
