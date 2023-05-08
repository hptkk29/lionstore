import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceCods extends BaseSchema {
  protected tableName = 't_service_cod'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 60).defaultTo('Cash on delivery')
      table.string('description', 60).defaultTo('Pay upon delivery')
      table.integer('logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
