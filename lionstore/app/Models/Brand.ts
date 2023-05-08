import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'
import BrandTranslation from 'App/Models/BrandTranslation'

export default class Brand extends BaseModel {

  public static table = 't_brands'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public handler: string

  @column()
  public logo_id: number

  @belongsTo(() => FileManager, { foreignKey: 'logo_id' })
  public logo: BelongsTo<typeof FileManager>

  @hasOne(() => BrandTranslation, { foreignKey: 'brand_id' })
  public translation: HasOne<typeof BrandTranslation>

}
