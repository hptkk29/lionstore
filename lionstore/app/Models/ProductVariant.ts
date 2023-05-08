import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class ProductVariant extends BaseModel {

  public static table = 't_product_variants'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public product_id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public options: string

  @belongsTo(() => Product, { localKey: 'product_id' })
  public product: BelongsTo<typeof Product>
  
}
