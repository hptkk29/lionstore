import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TBrands extends BaseSchema {
  protected tableName = 't_brands'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('handler', 60).unique()
      table.integer('logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
