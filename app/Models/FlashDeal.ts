import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'
import { DateTime } from 'luxon'

export default class FlashDeal extends BaseModel {

  public static table = 't_flash_deals'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public product_id: number

  @column.dateTime()
  public ends_at: DateTime

  @belongsTo(() => Product, { foreignKey: 'product_id' })
  public product: BelongsTo<typeof Product>
  
}
