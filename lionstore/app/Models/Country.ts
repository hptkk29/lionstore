import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {

  public static table = 't_countries'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public is_active: boolean
  
}
