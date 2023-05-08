import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TOrders extends BaseSchema {
  protected tableName = 't_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()

      // Customer and Address
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')

      // Customer ip address
      table.string('customer_ip', 60).nullable()

      // Order details
      table.string('order_number', 15).unique()
      table.string('order_status').defaultTo('pending')

      // Customer, declined, fraud, inventory, other
      table.text('cancel_reason').nullable()

      // Payment method
      table.integer('payment_id').unsigned().references('id').inTable('t_payments_history').onDelete('CASCADE')

      // Pricing
      table.string('total_price', 60).nullable()
      table.string('subtotal_price').nullable()
      table.string('shipping_cost', 60).nullable()
      table.string('taxes_cost', 60).nullable()

      // Discount
      table.string('discount_code', 60).nullable()
      table.string('discount_type', 60).nullable()
      table.string('discount_value', 60).nullable()

      // invoice & tracking code
      table.integer('invoice_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.string('invoice_tracking_code', 60).nullable()

      // Order notes
      table.text('order_notes').nullable()

      // Order source (Web, Mobile, Android, iPhone)
      table.string('order_source_name', 20).defaultTo('desktop')

      // Timing
      table.timestamp('placed_at', { useTz: true }).nullable()
      table.timestamp('processed_at', { useTz: true }).nullable()
      table.timestamp('shipped_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('cancelled_at', { useTz: true }).nullable()
      table.timestamp('delivered_at', { useTz: true }).nullable()
      table.timestamp('refunded_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
