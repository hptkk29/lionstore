import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductReviews extends BaseSchema {
  protected tableName = 't_product_reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.integer('customer_id').unsigned().references('id').inTable('t_customers').onDelete('CASCADE')
      table.integer('rating_value')
      table.text('review_comment').nullable()
      table.boolean('is_private').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_seen').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
