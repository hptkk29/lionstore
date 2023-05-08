import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TCustomers extends BaseSchema {
  protected tableName = 't_customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('username', 60).unique()
      table.string('email', 60).unique()
      table.string('password', 64).nullable()
      table.string('provider_name', 60).nullable()
      table.string('provider_id', 30).nullable()
      table.boolean('is_verified').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
