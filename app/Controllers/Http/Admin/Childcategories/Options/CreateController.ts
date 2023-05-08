import CreateValidator from 'App/Validators/Admin/Childcategories/CreateValidator'
import ChildcategoryTranslation from 'App/Models/ChildcategoryTranslation'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import Childcategory from 'App/Models/Childcategory'
import { string } from '@ioc:Adonis/Core/Helpers'
import Uploader from 'App/Services/Uploader'
import xss from 'xss'

export default class CreateController {

    /**
     * Create new subcategory
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
                folder    : 'childcategories',
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
                folder    : 'childcategories',
                uploaderId: auth.user?.id,
                width     : 800
            }) as any
        } else {
            var ogimage = null as any
        }

        // Save childcategory
        const childcategory                = new Childcategory()
              childcategory.uid            = string.generateRandom(32)
              childcategory.handler        = xss(request.input('handler').replace(/\s/g, '-').replace(/\//g, ''))
              childcategory.icon_id        = icon
              childcategory.og_image_id    = ogimage
              childcategory.parent_id      = request.input('parent_id')
              childcategory.subcategory_id = request.input('subcategory_id')
              childcategory.is_featured    = request.input('is_featured')

        await childcategory.save()

        // Save translation
        await this.saveTranslation(request, childcategory.toJSON())

        // Success
        return response.noContent()

    }


    /**
     * Save subcategory translation
     * @param request 
     * @param subcategory 
     */
    public async saveTranslation(request, subcategory) {

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
        const translation                  = new ChildcategoryTranslation()
              translation.childcategory_id = subcategory.id
              translation.title            = JSON.stringify(titles)
              translation.description      = xss(request.input('description'))
        
        await translation.save()
        

    }

}
