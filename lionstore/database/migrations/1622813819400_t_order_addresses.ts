import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TOrderAddresses extends BaseSchema {
  protected tableName = 't_order_address'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.integer('order_id').unsigned().references('id').inTable('t_orders').onDelete('CASCADE')
      table.string('name', 60).nullable()
      table.string('phone', 60).nullable()
      table.integer('country_id').unsigned().references('id').inTable('t_countries').onDelete('CASCADE')
      table.string('state', 60).nullable()
      table.string('city', 60).nullable()
      table.string('zipcode', 60).nullable()
      table.text('address').nullable()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
