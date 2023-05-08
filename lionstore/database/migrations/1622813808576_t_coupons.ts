import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TCoupons extends BaseSchema {
  protected tableName = 't_coupons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('coupon_code', 60).unique()
      table.string('coupon_type', 12).defaultTo('amount')
      table.string('discount_value', 32)
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_unlimited').defaultTo(false)
      table.integer('usage_times').nullable()
      table.integer('used_times').defaultTo(0)
      table.timestamp('start_date').nullable()
      table.timestamp('ends_date').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
