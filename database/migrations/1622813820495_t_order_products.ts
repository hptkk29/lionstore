import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TOrderProducts extends BaseSchema {
  protected tableName = 't_order_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).unique()
      table.integer('order_id').unsigned().references('id').inTable('t_orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.integer('quantity')
      table.string('single_price', 60).nullable()
      table.string('total_price', 60).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
