import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductGalleries extends BaseSchema {
  protected tableName = 't_product_gallery'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.text('large_images', 'longtext').nullable()
      table.text('medium_images', 'longtext').nullable()
      table.text('small_images', 'longtext').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
