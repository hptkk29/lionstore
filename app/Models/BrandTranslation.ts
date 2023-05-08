import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BrandTranslation extends BaseModel {

  public static table = 't_brand_translation'

  @column({ isPrimary: true })
  public id: number

  @column()
  public brand_id: number

  @column()
  public name: string

  @column()
  public description: string
  

}
