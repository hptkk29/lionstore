import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class ServiceOffline extends BaseModel {

  public static table = 't_service_offline'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public details: string

  @column()
  public logo_id: number | null

  @belongsTo(() => FileManager, { foreignKey: 'logo_id' })
  public logo: BelongsTo<typeof FileManager>
  
}
