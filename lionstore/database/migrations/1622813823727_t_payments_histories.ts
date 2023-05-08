import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TPaymentsHistories extends BaseSchema {
  protected tableName = 't_payments_history'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.string('order_id', 32).references('order_number').inTable('t_orders').onDelete('CASCADE')
      table.string('transaction_id', 32).unique()
      table.string('payment_method', 20).defaultTo('paypal')
      table.string('payment_amount', 60).nullable()
      table.string('payment_currency', 10).nullable()
      table.string('payment_currency_locale', 20).nullable()
      table.text('payment_details').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
