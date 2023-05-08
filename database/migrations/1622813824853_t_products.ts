import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProducts extends BaseSchema {
  protected tableName = 't_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).unique()
      table.bigInteger('pid').unique()

      table.integer('media_small_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.integer('media_medium_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.integer('media_large_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.boolean('is_product_zoomer').defaultTo(true)

      table.string('handler', 160).unique()
      table.text('tags').nullable()

      table.integer('stock').defaultTo(0)
      table.string('video_provider', 60).nullable()
      table.string('video_link', 120).nullable()
      table.boolean('is_active').defaultTo(true)
      table.string('discount_type', 20).nullable()
      table.string('discount_value', 60).nullable()

      table.integer('category_id').unsigned().references('id').inTable('t_categories').onDelete('CASCADE')
      table.integer('subcategory_id').unsigned().references('id').inTable('t_subcategories').onDelete('CASCADE')
      table.integer('childcategory_id').unsigned().references('id').inTable('t_childcategories').onDelete('CASCADE')
      
      table.bigInteger('visits').defaultTo(0)
      table.bigInteger('sales').defaultTo(0)
      table.bigInteger('rating').defaultTo(0)
      
      table.integer('brand_id').unsigned().references('id').inTable('t_brands').onDelete('CASCADE')

      table.string('price', 60).nullable()
      table.string('purchase_unit', 100).nullable()

      table.string('tax_value', 100).nullable()
      table.string('tax_type', 100).nullable()

      table.string('shipping_type', 100).nullable()
      table.string('shipping_cost', 100).nullable()

      table.string('product_barcode', 100).nullable()

      table.text('original_source', 'longText').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
