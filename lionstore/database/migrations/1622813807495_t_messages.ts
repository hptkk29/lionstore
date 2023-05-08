import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TMessages extends BaseSchema {
  protected tableName = 't_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.string('name', 60)
      table.string('email', 60).nullable()
      table.string('phone', 60).nullable()
      table.string('subject', 100).nullable()
      table.text('message', 'longText')
      table.string('ip', 60).nullable()
      table.boolean('is_seen').defaultTo(false)
      table.boolean('is_replied').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
