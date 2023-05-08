import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class ProductTranslation extends BaseModel {

  public static table = 't_product_translation'

  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public title: string

  @column()
  public description_ar: string | null

  @column()
  public description_az: string | null

  @column()
  public description_cn: string | null

  @column()
  public description_de: string | null

  @column()
  public description_en: string | null

  @column()
  public description_es: string | null

  @column()
  public description_fr: string | null

  @column()
  public description_hi: string | null

  @column()
  public description_hu: string | null

  @column()
  public description_jp: string | null

  @column()
  public description_nl: string | null

  @column()
  public description_po: string | null

  @column()
  public description_pt: string | null

  @column()
  public description_ro: string | null

  @column()
  public description_ru: string | null

  @column()
  public description_th: string | null

  @column()
  public description_tr: string | null

  @column()
  public description_ua: string | null

  @belongsTo(() => Product, { localKey: 'product_id' })
  public product: BelongsTo<typeof Product>
  
}
