import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import Customer from 'App/Models/Customer'
import Product from 'App/Models/Product'

export default class ProductReview extends BaseModel {

  public static table    = 't_product_reviews'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public product_id: number

  @column()
  public customer_id: number

  @column()
  public rating_value: string | number

  @column()
  public review_comment: string

  @column()
  public is_private: boolean

  @column()
  public is_active: boolean

  @column()
  public is_seen: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product, { foreignKey: 'product_id' })
  public product: BelongsTo<typeof Product>

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

}
