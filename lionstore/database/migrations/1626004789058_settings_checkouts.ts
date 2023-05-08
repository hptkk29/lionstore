import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsCheckouts extends BaseSchema {
  protected tableName = 't_settings_checkout'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_guest_checkout').defaultTo(true)
      table.boolean('field_name').defaultTo(true)
      table.boolean('field_phone').defaultTo(true)
      table.boolean('field_state').defaultTo(true)
      table.boolean('field_city').defaultTo(true)
      table.boolean('field_address').defaultTo(true)
      table.boolean('field_zipcode').defaultTo(true)
      table.boolean('is_whatsapp_order').defaultTo(true)
      table.boolean('whatsapp_btn_mobile').defaultTo(true)
      table.boolean('whatsapp_btn_desktop').defaultTo(true)
      table.string('whatsapp_number', 60).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
