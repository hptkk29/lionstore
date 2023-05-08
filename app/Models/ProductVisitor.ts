import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class ProductVisitor extends BaseModel {

  public static table = 't_product_visitors'
  
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string | null

  @column()
  public product_id: number | null

  @column()
  public ip: string | null

  @column()
  public country: string | null

  @column()
  public country_code: string | null

  @column()
  public region: string | null

  @column()
  public region_code: string | null

  @column()
  public city: string | null

  @column()
  public zip_code: string | null

  @column()
  public timezone: string | null

  @column()
  public latitude: string | null

  @column()
  public longitude: string | null

  @column()
  public user_agent: string | null

  @column()
  public browser_name: string | null

  @column()
  public browser_version: string | null

  @column()
  public browser_language: string | null
  @column()
  public os_name: string | null

  @column()
  public os_version: string | null

  @column()
  public engine_name: string | null

  @column()
  public engine_version: string | null

  @column()
  public device_name: string | null

  @column()
  public device_model: string | null

  @column()
  public device_type: string | null

  @column()
  public cpu_architecture: string | null

  @column()
  public bot_name: string | null

  @column()
  public bot_category: string | null

  @column()
  public bot_url: string | null

  @column()
  public bot_producer_name: string | null

  @column()
  public bot_producer_url: string | null

  @column()
  public utm_medium: string | null

  @column()
  public utm_campaign: string | null

  @column()
  public utm_source: string | null

  @column()
  public url_queries: string | null

  @column()
  public visit_from: string | null

  @column()
  public referrer: string | null

  @column.dateTime({ autoCreate: true })
  public first_visit: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public last_visit: DateTime

  @belongsTo(() => Product, { localKey: 'product_id' })
  public product: BelongsTo<typeof Product>
}
