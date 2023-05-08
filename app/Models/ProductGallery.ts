import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class ProductGallery extends BaseModel {

  public static table = 't_product_gallery'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public product_id: number

  @column()
  public large_images: string

  @column()
  public medium_images: string

  @column()
  public small_images: string

  @belongsTo(() => Product, { localKey: 'product_id' })
  public product: BelongsTo<typeof Product>
  
}
