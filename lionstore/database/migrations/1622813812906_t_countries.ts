import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TCountries extends BaseSchema {
  protected tableName = 't_countries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('name', 60).unique()
      table.string('code', 2).unique()
      table.boolean('is_active').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
