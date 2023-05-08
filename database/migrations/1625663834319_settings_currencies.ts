import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsCurrencies extends BaseSchema {
  protected tableName = 't_settings_currency'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('locale', 20).defaultTo('en-US')
      table.string('code', 10).defaultTo('USD')
      table.string('symbol', 20).defaultTo('$')
      table.string('symbol_native', 20).defaultTo('$')
      table.string('name', 60).defaultTo('US dollar')
      table.string('name_plural', 60).defaultTo('US dollars')
      table.string('exchange_rate', 20).defaultTo(1)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
