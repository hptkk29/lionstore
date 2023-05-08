import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class SettingsFooter extends BaseModel {
  
  public static table = 't_settings_footer'

  @column({ isPrimary: true })
  public id: number

  @column()
  public copyrights: string | null

  @column()
  public first_column: string | null

  @column()
  public second_column: string | null

  @column()
  public third_column: string | null

  @column()
  public facebook_url: string | null

  @column()
  public twitter_url: string | null

  @column()
  public instagram_url: string | null

  @column()
  public whatsapp_url: string | null

  @column()
  public telegram_url: string | null

  @column()
  public pinterest_url: string | null

  @column()
  public vk_url: string | null

  @column()
  public youtube_url: string | null

  @column()
  public footer_image_id: number | null

  @belongsTo(() => FileManager, { foreignKey: 'footer_image_id' })
  public image: BelongsTo<typeof FileManager>

}
