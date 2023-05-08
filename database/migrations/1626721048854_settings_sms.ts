import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsSms extends BaseSchema {
  protected tableName = 't_settings_sms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_active').defaultTo(false)
      table.string('default_gateway', 60).defaultTo('twilio')
      table.text('template_order_confirmed').nullable()
      table.text('template_order_delivered').nullable()
      table.text('template_order_shipped').nullable()
      table.text('template_order_refunded').nullable()
      table.text('template_order_canceled').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
