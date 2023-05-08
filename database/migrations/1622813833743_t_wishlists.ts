import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TWishlists extends BaseSchema {
  protected tableName = 't_wishlist'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
