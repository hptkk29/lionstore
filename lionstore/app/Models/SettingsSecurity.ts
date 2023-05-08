import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsSecurity extends BaseModel {

  public static table = 't_settings_security'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_recaptcha: boolean

  @column()
  public recaptcha_site_key: string | null

  @column()
  public recaptcha_secret_key: string | null
  
}
