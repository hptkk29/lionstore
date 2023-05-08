import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsAuth extends BaseModel {

  public static table = 't_settings_auth'

  @column({ isPrimary: true })
  public id: number

  @column()
  public enable_facebook_login: boolean

  @column()
  public enable_twitter_login: boolean

  @column()
  public enable_google_login: boolean

  @column()
  public facebook_client_id: string | null

  @column()
  public facebook_secret_id: string | null

  @column()
  public twitter_client_id: string | null

  @column()
  public twitter_secret_id: string | null

  @column()
  public google_client_id: string | null

  @column()
  public google_secret_id: string | null

  @column()
  public verification_required: boolean
  
  
}
