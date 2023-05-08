import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsRefund extends BaseModel {

  public static table = 't_settings_refunds'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_enabled: boolean

  @column()
  public message_to_customer: string | null
  
}
