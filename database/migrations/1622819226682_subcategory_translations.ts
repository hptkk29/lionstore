import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubcategoryTranslations extends BaseSchema {
  protected tableName = 't_subcategory_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subcategory_id').unsigned().references('id').inTable('t_subcategories').onDelete('CASCADE')
      table.text('title', 'longText').nullable()
      table.text('description', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
