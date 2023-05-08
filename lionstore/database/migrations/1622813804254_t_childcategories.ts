import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TChildcategories extends BaseSchema {
  protected tableName = 't_childcategories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('parent_id').unsigned().references('id').inTable('t_categories').onDelete('CASCADE')
      table.integer('subcategory_id').unsigned().references('id').inTable('t_subcategories').onDelete('CASCADE')
      table.string('handler', 60).unique()
      table.integer('og_image_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.integer('icon_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.boolean('is_featured').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
