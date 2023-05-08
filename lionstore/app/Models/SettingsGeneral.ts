import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Country from 'App/Models/Country'
import FileManager from 'App/Models/FileManager'

export default class SettingsGeneral extends BaseModel {

  public static table = 't_settings_general'

  @column({ isPrimary: true })
  public id: number

  @column()
  public site_title: string

  @column()
  public site_tagline: string

  @column()
  public site_description: string

  @column()
  public title_separator: string

  @column()
  public is_global: boolean

  @column()
  public default_country: number

  @column()
  public default_language: string

  @column()
  public desktop_logo_id: number

  @column()
  public mobile_logo_id: number

  @column()
  public favicon_id: number

  @column()
  public site_email: string

  @column()
  public site_phone: string

  @column()
  public site_address: string

  @column()
  public is_rtl: boolean

  @belongsTo(() => Country, { foreignKey: 'default_country' })
  public country: BelongsTo<typeof Country>

  @belongsTo(() => FileManager, { foreignKey: 'desktop_logo_id' })
  public desktop_logo: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'mobile_logo_id' })
  public mobile_logo: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'favicon_id' })
  public favicon: BelongsTo<typeof FileManager>
  
}
