import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductVariantAttributes extends BaseSchema {
  protected tableName = 't_product_variant_attributes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.text('attributes', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
