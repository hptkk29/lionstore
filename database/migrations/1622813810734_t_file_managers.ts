import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TFileManagers extends BaseSchema {
  protected tableName = 't_file_manager'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('file_name', 100).nullable()
      table.string('file_extension', 10).nullable()
      table.string('file_type', 60).nullable()
      table.bigInteger('file_size').nullable()
      table.string('file_folder', 100).nullable()
      table.integer('uploader_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE').nullable()
      table.boolean('is_private').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
