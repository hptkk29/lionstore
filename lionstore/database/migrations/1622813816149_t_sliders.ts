import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TSliders extends BaseSchema {
  protected tableName = 't_sliders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 32).unique()
      table.integer('desktop_slider_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.integer('mobile_slider_id').unsigned().references('id').inTable('t_file_manager').onDelete('CASCADE')
      table.string('link_type', 10).defaultTo('inside')
      table.text('link_value').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
