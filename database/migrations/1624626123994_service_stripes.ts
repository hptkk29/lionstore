import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceStripes extends BaseSchema {
  protected tableName = 't_service_stripe'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 60).defaultTo('Stripe')
      table.string('description', 60).defaultTo('Credit Card Payment')
      table.text('public_key').nullable()
      table.text('secret_key').nullable()
      table.integer('logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
