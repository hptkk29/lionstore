import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServiceTwilios extends BaseSchema {
  protected tableName = 't_service_twilio'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('account_sid', 100).nullable()
      table.string('auth_token', 100).nullable()
      table.string('phone', 60).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
