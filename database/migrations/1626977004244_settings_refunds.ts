import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsRefunds extends BaseSchema {
  protected tableName = 't_settings_refunds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_enabled').defaultTo(true)
      table.text('message_to_customer', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
