import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class ProductSeo extends BaseModel {

  public static table = 't_product_seo'

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public uid: string

  @column()
  public product_id: number

  @column()
  public title: string

  @column()
  public description: string

  @belongsTo(() => Product, { localKey: 'product_id' })
  public product: BelongsTo<typeof Product>

}
