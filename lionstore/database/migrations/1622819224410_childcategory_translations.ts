import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChildcategoryTranslations extends BaseSchema {
  protected tableName = 't_childcategory_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('childcategory_id').unsigned().references('id').inTable('t_childcategories').onDelete('CASCADE')
      table.text('title', 'longText').nullable()
      table.text('description', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
