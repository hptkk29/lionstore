import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BrandTranslations extends BaseSchema {
  protected tableName = 't_brand_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('brand_id').unsigned().references('id').inTable('t_brands').onDelete('CASCADE')
      table.text('name', 'longText').nullable()
      table.text('description', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
