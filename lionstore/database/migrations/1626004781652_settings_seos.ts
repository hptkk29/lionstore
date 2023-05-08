import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsSeos extends BaseSchema {
  protected tableName = 't_settings_seo'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_sitemap').defaultTo(false)
      table.string('facebook_app_id', 60).nullable()
      table.string('facebook_page_id', 60).nullable()
      table.string('twitter_username', 60).nullable()
      table.integer('default_ogimage_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
