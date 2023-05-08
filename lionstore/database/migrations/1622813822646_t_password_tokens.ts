import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TPasswordTokens extends BaseSchema {
  protected tableName = 't_password_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token', 64)
      table.string('email', 60)
      table.string('ip', 20).nullable()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
