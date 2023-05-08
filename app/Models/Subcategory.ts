import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import SubcategoryTranslation from 'App/Models/SubcategoryTranslation'
import Childcategory from 'App/Models/Childcategory'
import FileManager from 'App/Models/FileManager'
import Category from 'App/Models/Category'
import { DateTime } from 'luxon'

export default class Subcategory extends BaseModel {

  public static table    = 't_subcategories'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public parent_id: number

  @column()
  public handler: string

  @column()
  public og_image_id: number

  @column()
  public icon_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, { foreignKey: 'parent_id' })
  public parent: BelongsTo<typeof Category>

  @belongsTo(() => FileManager, { foreignKey: 'og_image_id' })
  public ogimage: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'icon_id' })
  public icon: BelongsTo<typeof FileManager>

  @hasOne(() => SubcategoryTranslation, { foreignKey: 'subcategory_id' })
  public translation: HasOne<typeof SubcategoryTranslation>

  @hasMany(() => Childcategory, { foreignKey: 'subcategory_id' })
  public childcategories: HasMany<typeof Childcategory>


}
