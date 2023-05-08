import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsGenerals extends BaseSchema {
  protected tableName = 't_settings_general'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('site_title', 60)
      table.string('site_tagline', 60).nullable()
      table.text('site_description').nullable()
      table.string('title_separator', 2).defaultTo('|')
      table.boolean('is_global').defaultTo(false)
      table.integer('default_country').unsigned().references('id').inTable('t_countries').onDelete('CASCADE').nullable()
      table.string('default_language', 2).defaultTo('en')
      table.integer('desktop_logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
      table.integer('mobile_logo_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
      table.integer('favicon_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
      table.string('site_email', 60).nullable()
      table.string('site_phone', 60).nullable()
      table.text('site_address').nullable()
      table.boolean('is_rtl').defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
