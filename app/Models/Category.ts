import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryTranslation from 'App/Models/CategoryTranslation'
import Childcategory from 'App/Models/Childcategory'
import FileManager from 'App/Models/FileManager'
import Subcategory from 'App/Models/Subcategory'
import { DateTime } from 'luxon'

export default class Category extends BaseModel {

  public static table    = 't_categories'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public handler: string

  @column()
  public og_image_id: number

  @column()
  public icon_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FileManager, { foreignKey: 'icon_id' })
  public icon: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'og_image_id' })
  public ogimage: BelongsTo<typeof FileManager>

  @hasOne(() => CategoryTranslation, { foreignKey: 'category_id' })
  public translation: HasOne<typeof CategoryTranslation>

  @hasMany(() => Childcategory, { foreignKey: 'parent_id' })
  public childcategories: HasMany<typeof Childcategory>

  @hasMany(() => Subcategory, { foreignKey: 'parent_id' })
  public subcategories: HasMany<typeof Subcategory>

}
