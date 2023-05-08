import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServiceTwilio extends BaseModel {

  public static table = 't_service_twilio'

  @column({ isPrimary: true })
  public id: number

  @column()
  public account_sid: string | null

  @column()
  public auth_token: string | null

  @column()
  public phone: string | null
  
}
