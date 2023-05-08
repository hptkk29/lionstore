import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TInvoices extends BaseSchema {
  protected tableName = 't_invoices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('order_id').unsigned().references('id').inTable('t_orders').onDelete('CASCADE')
      table.string('invoice_name', 60).unique()
      table.string('invoice_status').defaultTo('pending')
      table.string('invoice_amount', 60).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
