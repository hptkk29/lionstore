import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CategoryTranslation extends BaseModel {

  public static table = 't_category_translation'

  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public title: string

  @column()
  public description: string

}
