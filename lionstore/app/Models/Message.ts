import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Message extends BaseModel {

  public static table    = 't_messages'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public subject: string

  @column()
  public message: string

  @column()
  public ip: string

  @column()
  public is_seen: boolean

  @column()
  public is_replied: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
}
