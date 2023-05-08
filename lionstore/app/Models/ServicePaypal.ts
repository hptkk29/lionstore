import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class ServicePaypal extends BaseModel {
  
  public static table = 't_service_paypal'

  @column({ isPrimary: true })
  public id: number

  @column()
  public env: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public public_key: string | null

  @column()
  public secret_key: string | null

  @column()
  public logo_id: number | null

  @belongsTo(() => FileManager, { foreignKey: 'logo_id' })
  public logo: BelongsTo<typeof FileManager>

}
