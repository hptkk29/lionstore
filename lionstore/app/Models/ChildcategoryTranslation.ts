import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ChildcategoryTranslation extends BaseModel {

  public static table = 't_childcategory_translation'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public childcategory_id: number

  @column()
  public title: string

  @column()
  public description: string

}
