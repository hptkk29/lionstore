import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsCurrency extends BaseModel {

  public static table = 't_settings_currency'

  @column({ isPrimary: true })
  public id: number

  @column()
  public locale: string

  @column()
  public code: string

  @column()
  public symbol: string

  @column()
  public symbol_native: string

  @column()
  public name: string

  @column()
  public name_plural: string

  @column()
  public exchange_rate: string

}
