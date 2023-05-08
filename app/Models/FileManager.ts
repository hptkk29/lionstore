import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customer from 'App/Models/Customer'

export default class FileManager extends BaseModel {

  public static table = 't_file_manager'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public file_name: string

  @column()
  public file_extension: string

  @column()
  public file_type: string

  @column()
  public file_size: string

  @column()
  public file_folder: string

  @column()
  public uploader_id: number

  @column()
  public is_private: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, { localKey: 'uploader_id' })
  public uploader: BelongsTo<typeof Customer>

}
