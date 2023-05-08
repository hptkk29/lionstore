import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pages extends BaseSchema {
  protected tableName = 't_pages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('column').defaultTo('first')
      table.string('handler', 140).unique()
      table.string('seo_title', 120).nullable()
      table.text('seo_description').nullable()
      table.integer('og_image_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
