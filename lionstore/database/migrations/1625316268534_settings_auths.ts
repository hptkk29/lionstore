import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsAuths extends BaseSchema {
  protected tableName = 't_settings_auth'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('enable_facebook_login').defaultTo(false)
      table.boolean('enable_twitter_login').defaultTo(false)
      table.boolean('enable_google_login').defaultTo(false)
      table.string('facebook_client_id', 140).nullable()
      table.string('facebook_secret_id', 140).nullable()
      table.string('twitter_client_id', 140).nullable()
      table.string('twitter_secret_id', 140).nullable()
      table.string('google_client_id', 140).nullable()
      table.string('google_secret_id', 140).nullable()
      table.boolean('verification_required').defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
