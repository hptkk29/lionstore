import CreateValidator from 'App/Validators/Admin/Categories/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Uploader from 'App/Services/Uploader'
import Category from 'App/Models/Category'
import xss from 'xss'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import CategoryTranslation from 'App/Models/CategoryTranslation'

export default class CreateController {

    /**
     * Create new category
     * @param param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Validate form
        await request.validate(CreateValidator)

        // Authenticate user
        await auth.use('api').authenticate()

        // Upload icon if it exists
        if (request.file('icon')) {
            var icon = await Uploader.singleFile({
                file      : request.file('icon'),
                folder    : 'categories',
                uploaderId: auth.user?.id,
                width     : 100
            }) as any
        } else {
            var icon = null as any
        }

        // Upload ogimage if it exists
        if (request.file('ogimage')) {
            var ogimage = await Uploader.singleFile({
                file      : request.file('ogimage'),
                folder    : 'categories',
                uploaderId: auth.user?.id,
                width     : 800
            }) as any
        } else {
            var ogimage = null as any
        }

        // Save category
        const category             = new Category()
              category.uid         = string.generateRandom(32)
              category.handler     = xss(request.input('handler').replace(/\s/g, '-').replace(/\//g, ''))
              category.icon_id     = icon
              category.og_image_id = ogimage

        await category.save()

        // Save translation
        await this.saveTranslation(request, category.toJSON())

        // Success
        return response.noContent()

    }


    /**
     * Save category translation
     * @param request 
     * @param category 
     */
    public async saveTranslation(request, category) {

        // Get supported languages
        const languages = await SettingsLanguages.find(1)

        // Set title in supported languages
        const titles = {
            ar: languages?.is_arabic ? request.input('title_ar')     : null,
            az: languages?.is_azerbaijani ? request.input('title_az'): null,
            cn: languages?.is_chinese ? request.input('title_cn')    : null,
            de: languages?.is_german ? request.input('title_de')     : null,
            en: languages?.is_english ? request.input('title_en')    : null,
            es: languages?.is_spanish ? request.input('title_es')    : null,
            fr: languages?.is_french ? request.input('title_fr')     : null,
            hi: languages?.is_hindi ? request.input('title_hi')      : null,
            hu: languages?.is_hungarian ? request.input('title_hu')  : null,
            jp: languages?.is_japanese ? request.input('title_jp')   : null,
            nl: languages?.is_dutch ? request.input('title_nl')      : null,
            po: languages?.is_polish ? request.input('title_po')     : null,
            pt: languages?.is_portuguese ? request.input('title_pt') : null,
            ro: languages?.is_romanian ? request.input('title_ro')   : null,
            ru: languages?.is_russian ? request.input('title_ru')    : null,
            th: languages?.is_thai ? request.input('title_th')       : null,
            tr: languages?.is_turkish ? request.input('title_tr')    : null,
            ua: languages?.is_ukrainian ? request.input('title_ua')  : null,
        }

        // Save translation
        const translation             = new CategoryTranslation()
              translation.category_id = category.id
              translation.title       = JSON.stringify(titles)
              translation.description = xss(request.input('description'))
        
        await translation.save()
        

    }

}
