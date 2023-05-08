import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubcategoryTranslation extends BaseModel {

  public static table = 't_subcategory_translation'

  @column({ isPrimary: true })
  public id: number

  @column()
  public subcategory_id: number

  @column()
  public title: string

  @column()
  public description: string
  
}
