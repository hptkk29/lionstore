import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PageTranslations extends BaseSchema {
  protected tableName = 't_page_translation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('page_id').unsigned().references('id').inTable('t_pages').onDelete('CASCADE')
      table.string('title_ar', 120).nullable()
      table.string('title_az', 120).nullable()
      table.string('title_cn', 120).nullable()
      table.string('title_de', 120).nullable()
      table.string('title_en', 120).nullable()
      table.string('title_es', 120).nullable()
      table.string('title_fr', 120).nullable()
      table.string('title_hi', 120).nullable()
      table.string('title_hu', 120).nullable()
      table.string('title_jp', 120).nullable()
      table.string('title_nl', 120).nullable()
      table.string('title_po', 120).nullable()
      table.string('title_pt', 120).nullable()
      table.string('title_ro', 120).nullable()
      table.string('title_ru', 120).nullable()
      table.string('title_th', 120).nullable()
      table.string('title_tr', 120).nullable()
      table.string('title_ua', 120).nullable()
      table.text('content_ar', 'longText').nullable()
      table.text('content_az', 'longText').nullable()
      table.text('content_cn', 'longText').nullable()
      table.text('content_de', 'longText').nullable()
      table.text('content_en', 'longText').nullable()
      table.text('content_es', 'longText').nullable()
      table.text('content_fr', 'longText').nullable()
      table.text('content_hi', 'longText').nullable()
      table.text('content_hu', 'longText').nullable()
      table.text('content_jp', 'longText').nullable()
      table.text('content_nl', 'longText').nullable()
      table.text('content_po', 'longText').nullable()
      table.text('content_pt', 'longText').nullable()
      table.text('content_ro', 'longText').nullable()
      table.text('content_ru', 'longText').nullable()
      table.text('content_th', 'longText').nullable()
      table.text('content_tr', 'longText').nullable()
      table.text('content_ua', 'longText').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
