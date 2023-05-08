import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductSeos extends BaseSchema {
  protected tableName = 't_product_seo'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.text('title').nullable()
      table.text('description').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
