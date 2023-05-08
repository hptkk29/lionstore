import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SettingsLanguages extends BaseModel {

  public static table = 't_settings_languages'

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_english: boolean

  @column()
  public is_arabic: boolean

  @column()
  public is_french: boolean

  @column()
  public is_spanish: boolean

  @column()
  public is_russian: boolean

  @column()
  public is_chinese: boolean

  @column()
  public is_hindi: boolean

  @column()
  public is_portuguese: boolean

  @column()
  public is_japanese: boolean

  @column()
  public is_turkish: boolean

  @column()
  public is_ukrainian: boolean

  @column()
  public is_polish: boolean

  @column()
  public is_romanian: boolean

  @column()
  public is_dutch: boolean

  @column()
  public is_thai: boolean

  @column()
  public is_hungarian: boolean

  @column()
  public is_azerbaijani: boolean

  @column()
  public is_german: boolean
  
}
