import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsPayment extends BaseModel {

  public static table = 't_settings_payment'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_paypal: boolean

  @column()
  public is_stripe: boolean

  @column()
  public is_offline: boolean

  @column()
  public is_cod: boolean

}
