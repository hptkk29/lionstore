import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SettingsLanguages extends BaseSchema {
  protected tableName = 't_settings_languages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_english').defaultTo(true)
      table.boolean('is_arabic').defaultTo(false)
      table.boolean('is_french').defaultTo(false)
      table.boolean('is_spanish').defaultTo(false)
      table.boolean('is_russian').defaultTo(false)
      table.boolean('is_chinese').defaultTo(false)
      table.boolean('is_hindi').defaultTo(false)
      table.boolean('is_portuguese').defaultTo(false)
      table.boolean('is_japanese').defaultTo(false)
      table.boolean('is_turkish').defaultTo(false)
      table.boolean('is_ukrainian').defaultTo(false)
      table.boolean('is_polish').defaultTo(false)
      table.boolean('is_romanian').defaultTo(false)
      table.boolean('is_dutch').defaultTo(false)
      table.boolean('is_thai').defaultTo(false)
      table.boolean('is_hungarian').defaultTo(false)
      table.boolean('is_azerbaijani').defaultTo(false)
      table.boolean('is_german').defaultTo(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
