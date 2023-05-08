import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServicePaypals extends BaseSchema {
  protected tableName = 't_service_paypal'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('env', 10).defaultTo('sandbox')
      table.string('title', 60).defaultTo('PayPal')
      table.string('description', 60).defaultTo('Pay using your PayPal account')
      table.text('public_key').nullable()
      table.text('secret_key').nullable()
      table.integer('logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
