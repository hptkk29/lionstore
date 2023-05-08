import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PasswordToken extends BaseModel {

  public static table = 't_password_tokens'

  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string

  @column()
  public email: string

  @column()
  public ip: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
}
