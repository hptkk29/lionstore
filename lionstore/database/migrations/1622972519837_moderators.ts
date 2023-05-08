import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Moderators extends BaseSchema {

  protected tableName = 't_moderators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('uuid')
      table.string('username', 60).unique()
      table.string('email', 60).unique()
      table.string('password', 120).unique()
      table.string('role', 15).defaultTo('admin')
      table.integer('verification_pin', 6).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
