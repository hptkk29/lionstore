import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class ServiceCod extends BaseModel {
  
  public static table = 't_service_cod'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string | null

  @column()
  public description: string | null

  @column()
  public logo_id: number | null

  @belongsTo(() => FileManager, { foreignKey: 'logo_id' })
  public logo: BelongsTo<typeof FileManager>

}
