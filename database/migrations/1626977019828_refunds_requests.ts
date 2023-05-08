import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RefundsRequests extends BaseSchema {
  protected tableName = 't_refunds_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.integer('order_id').unsigned().references('id').inTable('t_orders').onDelete('CASCADE')
      table.text('refund_reason', 'longText').nullable()
      table.boolean('is_seen').defaultTo(false)
      table.boolean('is_processed').defaultTo(false)  

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
