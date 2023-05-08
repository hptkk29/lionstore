import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsFooters extends BaseSchema {
  protected tableName = 't_settings_footer'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('copyrights').nullable()
      table.string('first_column', 120).nullable()
      table.string('second_column', 120).nullable()
      table.string('third_column', 120).nullable()
      table.string('facebook_url', 140).nullable()
      table.string('twitter_url', 140).nullable()
      table.string('instagram_url', 140).nullable()
      table.string('whatsapp_url', 140).nullable()
      table.string('telegram_url', 140).nullable()
      table.string('pinterest_url', 140).nullable()
      table.string('vk_url', 140).nullable()
      table.string('youtube_url', 140).nullable()
      table.integer('footer_image_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
