import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PageTranslation extends BaseModel {

  public static table = 't_page_translation'

  @column({ isPrimary: true })
  public id: number

  @column()
  public page_id: number

  @column()
  public title_ar: string | null

  @column()
  public title_az: string | null

  @column()
  public title_cn: string | null

  @column()
  public title_de: string | null

  @column()
  public title_en: string | null

  @column()
  public title_es: string | null

  @column()
  public title_fr: string | null

  @column()
  public title_hi: string | null

  @column()
  public title_hu: string | null

  @column()
  public title_jp: string | null

  @column()
  public title_nl: string | null

  @column()
  public title_po: string | null

  @column()
  public title_pt: string | null

  @column()
  public title_ro: string | null

  @column()
  public title_ru: string | null

  @column()
  public title_th: string | null

  @column()
  public title_tr: string | null

  @column()
  public title_ua: string | null

  @column()
  public content_ar: string | null

  @column()
  public content_az: string | null

  @column()
  public content_cn: string | null

  @column()
  public content_de: string | null

  @column()
  public content_en: string | null

  @column()
  public content_es: string | null

  @column()
  public content_fr: string | null

  @column()
  public content_hi: string | null

  @column()
  public content_hu: string | null

  @column()
  public content_jp: string | null

  @column()
  public content_nl: string | null

  @column()
  public content_po: string | null

  @column()
  public content_pt: string | null

  @column()
  public content_ro: string | null

  @column()
  public content_ru: string | null

  @column()
  public content_th: string | null

  @column()
  public content_tr: string | null

  @column()
  public content_ua: string | null
  
}
