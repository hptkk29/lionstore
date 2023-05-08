import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsSmtp extends BaseModel {

  public static table = 't_settings_smtp'

  @column({ isPrimary: true })
  public id: number

  @column()
  public host: string | null

  @column()
  public port: number | null

  @column()
  public is_secure: boolean | null

  @column()
  public username: string | null

  @column()
  public password: string | null

  @column()
  public from_email: string | null

  @column()
  public from_name: string | null
  
}
