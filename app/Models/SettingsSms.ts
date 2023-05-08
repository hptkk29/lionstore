import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsSms extends BaseModel {

  public static table = 't_settings_sms'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_active: boolean

  @column()
  public default_gateway: string | null

  @column()
  public template_order_confirmed: string | null

  @column()
  public template_order_delivered: string | null

  @column()
  public template_order_shipped: string | null

  @column()
  public template_order_refunded: string | null

  @column()
  public template_order_canceled: string | null
  
}
