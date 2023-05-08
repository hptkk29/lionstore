import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import FileManager from 'App/Models/FileManager'

export default class Slider extends BaseModel {

  public static table = 't_sliders'

  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public desktop_slider_id: number

  @column()
  public mobile_slider_id: number

  @column()
  public link_type: string

  @column()
  public link_value: string

  @belongsTo(() => FileManager, { foreignKey: 'desktop_slider_id' })
  public desktopSlider: BelongsTo<typeof FileManager>

  @belongsTo(() => FileManager, { foreignKey: 'mobile_slider_id' })
  public mobileSlider: BelongsTo<typeof FileManager>
  
}
