import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ChildcategoryTranslation from 'App/Models/ChildcategoryTranslation'
import FileManager from 'App/Models/FileManager'
import Category from 'App/Models/Category'
import Subcategory from 'App/Models/Subcategory'

export default class Childcategory extends BaseModel {

  public static table = 't_childcategories'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public handler: string

  @column()
  public parent_id: number

  @column()
  public subcategory_id: number

  @column()
  public og_image_id: number

  @column()
  public icon_id: number

  @column()
  public is_featured: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FileManager, { foreignKey: 'icon_id' })
  public icon: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'og_image_id' })
  public ogimage: BelongsTo<typeof FileManager>

  @belongsTo(() => Category, { foreignKey: 'parent_id' })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Subcategory, { foreignKey: 'subcategory_id' })
  public subcategory: BelongsTo<typeof Subcategory>

  @hasOne(() => ChildcategoryTranslation, { foreignKey: 'childcategory_id' })
  public translation: HasOne<typeof ChildcategoryTranslation>

}
