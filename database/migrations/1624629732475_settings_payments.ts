import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsPayments extends BaseSchema {
  protected tableName = 't_settings_payment'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_paypal').defaultTo(false)
      table.boolean('is_stripe').defaultTo(false)
      table.boolean('is_offline').defaultTo(false)
      table.boolean('is_cod').defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
