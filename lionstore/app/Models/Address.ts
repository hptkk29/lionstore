import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Country from 'App/Models/Country'
import Customer from 'App/Models/Customer'

export default class Address extends BaseModel {

  public static table = 't_addresses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public customer_id: number

  @column()
  public name: string | null

  @column()
  public phone: string | null

  @column()
  public country_id: number

  @column()
  public state: string | null

  @column()
  public city: string | null

  @column()
  public zipcode: string | null

  @column()
  public address: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Country, { foreignKey: 'country_id' })
  public country: BelongsTo<typeof Country>

  @belongsTo(() => Customer, { foreignKey: 'customer_id' })
  public customer: BelongsTo<typeof Customer>

}
