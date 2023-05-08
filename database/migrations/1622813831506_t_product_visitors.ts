import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TProductVisitors extends BaseSchema {
  protected tableName = 't_product_visitors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 60).notNullable().unique()
      table.integer('product_id').unsigned().references('id').inTable('t_products').onDelete('CASCADE')
      table.string('ip').nullable()

      // Geolocation
      table.string('country', 60).nullable()
      table.string('country_code', 3).nullable()
      table.string('region', 60).nullable()
      table.string('region_code', 60).nullable()
      table.string('city', 60).nullable()
      table.string('zip_code', 30).nullable()
      table.string('timezone', 60).nullable()
      table.string('latitude', 60).nullable()
      table.string('longitude', 60).nullable()

      // User Agent
      table.text('user_agent').nullable()
      table.string('browser_name', 60).nullable()
      table.string('browser_version', 60).nullable()
      table.string('browser_language', 60).nullable()
      table.string('os_name', 60).nullable()
      table.string('os_version', 60).nullable()
      table.string('engine_name', 60).nullable()
      table.string('engine_version', 60).nullable()
      table.string('device_name', 60).nullable()
      table.string('device_model', 60).nullable()
      table.string('device_type', 60).nullable()
      table.string('cpu_architecture', 60).nullable()

      // Bot
      table.string('bot_name', 100).nullable()
      table.string('bot_category', 100).nullable()
      table.string('bot_url', 100).nullable()
      table.string('bot_producer_name', 100).nullable()
      table.string('bot_producer_url', 100).nullable()

      // UTM & Info
      table.text('utm_medium', 'longText').nullable()
      table.text('utm_campaign', 'longText').nullable()
      table.text('utm_source', 'longText').nullable()
      table.text('url_queries', 'longText').nullable()
      table.string('visit_from', 100).nullable()

      // Referrer
      table.text('referrer', 'longText').nullable()

      // Dates
      table.timestamp('first_visit', { useTz: true })
      table.timestamp('last_visit', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
