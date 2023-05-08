import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Verifications extends BaseSchema {
  protected tableName = 't_verifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.string('token', 64).unique()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
