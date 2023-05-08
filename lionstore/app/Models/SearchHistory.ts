import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SearchHistory extends BaseModel {

  public static table = 't_search_history'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public keyword: string

  @column()
  public counter: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
