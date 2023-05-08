import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class SettingsSeo extends BaseModel {
  
  public static table = 't_settings_seo'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_sitemap: boolean

  @column()
  public facebook_app_id: string | null

  @column()
  public facebook_page_id: string | null

  @column()
  public twitter_username: string | null

  @column()
  public default_ogimage_id: number | null

  @belongsTo(() => FileManager, { foreignKey: 'default_ogimage_id' })
  public ogimage: BelongsTo<typeof FileManager>

}
