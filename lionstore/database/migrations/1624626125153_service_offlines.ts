import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceOfflines extends BaseSchema {
  protected tableName = 't_service_offline'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 60).defaultTo('Offline')
      table.string('description', 60).defaultTo('Bank, Check payment')
      table.text('details').nullable()
      table.integer('logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
