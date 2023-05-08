import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TSearchHistories extends BaseSchema {
  protected tableName = 't_search_history'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('keyword', 60).nullable()
      table.integer('counter').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
