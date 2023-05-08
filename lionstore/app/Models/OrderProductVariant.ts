import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

export default class OrderProductVariant extends BaseModel {

  public static table = 't_order_product_variants'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public order_id: number

  @column()
  public product_id: number

  @column()
  public quantity: number

  @column()
  public variants: string | null

  @belongsTo(() => Order, { foreignKey: 'order_id' })
  public order: BelongsTo<typeof Order>

  @belongsTo(() => Product, { foreignKey: 'product_id' })
  public product: BelongsTo<typeof Product>

}
