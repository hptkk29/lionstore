import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsCheckout extends BaseModel {
  
  public static table = 't_settings_checkout'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_guest_checkout: boolean

  @column()
  public field_name: boolean

  @column()
  public field_phone: boolean

  @column()
  public field_state: boolean

  @column()
  public field_city: boolean

  @column()
  public field_address: boolean

  @column()
  public field_zipcode: boolean

  @column()
  public is_whatsapp_order: boolean

  @column()
  public whatsapp_btn_mobile: boolean

  @column()
  public whatsapp_btn_desktop: boolean

  @column()
  public whatsapp_number: string | null

}
