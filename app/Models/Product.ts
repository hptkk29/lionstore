import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductVariantAttribute from 'App/Models/ProductVariantAttribute'
import ProductTranslation from 'App/Models/ProductTranslation'
import ProductGallery from 'App/Models/ProductGallery'
import ProductVariant from 'App/Models/ProductVariant'
import ProductReview from 'App/Models/ProductReview'
import Childcategory from 'App/Models/Childcategory'
import FileManager from 'App/Models/FileManager'
import Subcategory from 'App/Models/Subcategory'
import ProductSeo from 'App/Models/ProductSeo'
import FlashDeal from 'App/Models/FlashDeal'
import Category from 'App/Models/Category'
import Brand from 'App/Models/Brand'
import { DateTime } from 'luxon'

export default class Product extends BaseModel {

  public static table    = 't_products'

  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public pid: string
  
  @column()
  public media_small_id: number

  @column()
  public media_medium_id: number

  @column()
  public media_large_id: number

  @column()
  public is_product_zoomer: boolean

  @column()
  public handler: string

  @column()
  public tags: string | null

  @column()
  public stock: string

  @column()
  public video_provider: string

  @column()
  public video_link: string

  @column()
  public is_active: boolean

  @column()
  public discount_type: string

  @column()
  public discount_value: string

  @column()
  public category_id: number

  @column()
  public subcategory_id: number

  @column()
  public childcategory_id: number

  @column()
  public visits: string

  @column()
  public sales: string

  @column()
  public rating: string | number

  @column()
  public brand_id: number

  @column()
  public price: string

  @column()
  public purchase_unit: string

  @column()
  public tax_value: string

  @column()
  public tax_type: string

  @column()
  public shipping_type: string

  @column()
  public shipping_cost: string

  @column()
  public product_barcode: string

  @column()
  public original_source: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FileManager, { foreignKey: 'media_small_id' })
  public thumbnail: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'media_medium_id' })
  public preview: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'media_large_id' })
  public large: BelongsTo<typeof FileManager>

  @belongsTo(() => Category, { foreignKey: 'category_id' })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Subcategory, { foreignKey: 'subcategory_id' })
  public subcategory: BelongsTo<typeof Subcategory>

  @belongsTo(() => Childcategory, { foreignKey: 'childcategory_id' })
  public childcategory: BelongsTo<typeof Childcategory>

  @hasOne(() => ProductTranslation, { foreignKey: 'product_id' })
  public translation: HasOne<typeof ProductTranslation>

  @hasOne(() => ProductSeo, { foreignKey: 'product_id' })
  public seo: HasOne<typeof ProductSeo>

  @belongsTo(() => Brand, { foreignKey: 'brand_id' })
  public brand: BelongsTo<typeof Brand>

  @hasOne(() => ProductGallery, { foreignKey: 'product_id' })
  public gallery: HasOne<typeof ProductGallery>

  @hasOne(() => FlashDeal, { foreignKey: 'product_id' })
  public flashDeal: HasOne<typeof FlashDeal>

  @hasMany(() => ProductVariant, { foreignKey: 'product_id' })
  public variants: HasMany<typeof ProductVariant>

  @hasMany(() => ProductVariantAttribute, { foreignKey: 'product_id' })
  public variants_attributes: HasMany<typeof ProductVariantAttribute>

  @hasMany(() => ProductReview, { foreignKey: 'product_id' })
  public reviews: HasMany<typeof ProductReview>

}
