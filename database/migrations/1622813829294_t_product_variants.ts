import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductVariants extends BaseSchema {
  protected tableName = 't_product_variants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.string('name', 60).nullable()
      table.string('type', 15).nullable()
      table.text('options').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
