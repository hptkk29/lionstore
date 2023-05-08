import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Coupon extends BaseModel {

  public static table = 't_coupons'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public coupon_code: string

  @column()
  public coupon_type: string

  @column()
  public discount_value: string

  @column()
  public is_active: boolean

  @column()
  public is_unlimited: boolean

  @column()
  public usage_times: string

  @column()
  public used_times: string

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public ends_date: DateTime
  
}
