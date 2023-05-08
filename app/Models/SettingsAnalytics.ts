import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsAnalytics extends BaseModel {

  public static table = 't_settings_analytics'

  @column({ isPrimary: true })
  public id: number

  @column()
  public google_gtm_id: string | null

  @column()
  public facebook_pixel_id: string | null

  @column()
  public snapchat_pixel_id: string | null

  @column()
  public tiktok_pixel_id: string | null
  
}
