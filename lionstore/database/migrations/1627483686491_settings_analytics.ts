import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsAnalytics extends BaseSchema {
  protected tableName = 't_settings_analytics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('google_gtm_id', 60).nullable()
      table.string('facebook_pixel_id', 60).nullable()
      table.string('snapchat_pixel_id', 60).nullable()
      table.string('tiktok_pixel_id', 60).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
