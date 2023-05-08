import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PageTranslation from 'App/Models/PageTranslation'
import FileManager from 'App/Models/FileManager'
import { DateTime } from 'luxon'

export default class Page extends BaseModel {
  
  public static table = 't_pages'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public column: string

  @column()
  public handler: string

  @column()
  public seo_title: string | null

  @column()
  public seo_description: string | null

  @column()
  public og_image_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => PageTranslation, { foreignKey: 'page_id' })
  public translation: HasOne<typeof PageTranslation>

  @belongsTo(() => FileManager, { foreignKey: 'og_image_id' })
  public ogimage: BelongsTo<typeof FileManager>

}
