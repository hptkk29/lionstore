import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsSmtps extends BaseSchema {
  protected tableName = 't_settings_smtp'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('host', 100).nullable()
      table.integer('port').nullable()
      table.boolean('is_secure').defaultTo(false)
      table.text('username').nullable()
      table.text('password').nullable()
      table.string('from_email', 100).nullable()
      table.string('from_name', 100).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
