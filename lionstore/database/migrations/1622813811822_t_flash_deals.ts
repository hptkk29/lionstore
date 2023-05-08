import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TFlashDeals extends BaseSchema {
  protected tableName = 't_flash_deals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.timestamp('ends_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
