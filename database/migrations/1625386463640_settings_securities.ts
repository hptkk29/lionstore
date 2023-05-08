import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsSecurities extends BaseSchema {
  protected tableName = 't_settings_security'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_recaptcha').defaultTo(false)
      table.string('recaptcha_site_key', 100).nullable()
      table.string('recaptcha_secret_key', 100).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
