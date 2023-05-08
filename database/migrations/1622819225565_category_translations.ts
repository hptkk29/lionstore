import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryTranslations extends BaseSchema {
  protected tableName = 't_category_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('id').inTable('t_categories').onDelete('CASCADE')
      table.text('title', 'longText').nullable()
      table.text('description', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
