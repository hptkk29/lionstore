import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductTranslations extends BaseSchema {
  protected tableName = 't_product_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.text('title', 'longText').nullable()
      table.text('description_ar', 'longText').nullable()
      table.text('description_az', 'longText').nullable()
      table.text('description_cn', 'longText').nullable()
      table.text('description_de', 'longText').nullable()
      table.text('description_en', 'longText').nullable()
      table.text('description_es', 'longText').nullable()
      table.text('description_fr', 'longText').nullable()
      table.text('description_hi', 'longText').nullable()
      table.text('description_hu', 'longText').nullable()
      table.text('description_jp', 'longText').nullable()
      table.text('description_nl', 'longText').nullable()
      table.text('description_po', 'longText').nullable()
      table.text('description_pt', 'longText').nullable()
      table.text('description_ro', 'longText').nullable()
      table.text('description_ru', 'longText').nullable()
      table.text('description_th', 'longText').nullable()
      table.text('description_tr', 'longText').nullable()
      table.text('description_ua', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
