import EditValidator from 'App/Validators/Admin/Subcategories/EditValidator'
import SubcategoryTranslation from 'App/Models/SubcategoryTranslation'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import Subcategory from 'App/Models/Subcategory'
import Uploader from 'App/Services/Uploader'
import Category from 'App/Models/Category'
import xss from 'xss'

export default class EditController {

    /**
     * Get subcategory to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get subcategory id
        const id          = request.input('id')

        // Get subcategory
        const subcategory = await Subcategory
                                    .query()
                                    .where('uid', id)
                                    .preload('ogimage')
                                    .preload('icon')
                                    .preload('translation')
                                    .firstOrFail()

        // Get categories
        const categories  = await Category
                                    .query()
                                    .preload('translation')
                                    .orderBy('handler', 'asc')

        // success
        return response.json({
            subcategory: subcategory,
            categories : categories,
        })

    }


    /**
     * Update subcategory
     * @param param0 
     * @returns 
     */
    public async update({  request, response, auth }: HttpContextContract) {

        // Authenticate user
        await auth.use('api').authenticate()

        // Get subcategory id 
        const id       = request.input('id')

        // Get subcategory
        const subcategory = await Subcategory
                                    .query()
                                    .where('id', id)
                                    .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Update icon if exists in request
        if (request.file('icon')) {
            var icon = await Uploader.singleFile({
                file      : request.file('icon'),
                folder    : 'subcategories',
                uploaderId: auth.user?.id,
                width     : 100,
                deleteOld : true,
                deleteId  : subcategory.icon_id
            }) as any
        } else {
            var icon = subcategory.icon_id as any
        }

        // Update ogimage if exists in request
        if (request.file('ogimage')) {
            var ogimage = await Uploader.singleFile({
                file      : request.file('ogimage'),
                folder    : 'subcategories',
                uploaderId: auth.user?.id,
                width     : 800,
                deleteOld : true,
                deleteId  : subcategory.og_image_id
            }) as any
        } else {
            var ogimage = subcategory.og_image_id as any
        }

        // Update translation
        await this.updateTranslation(request, subcategory.toJSON())

        // Update subcategory
        subcategory.icon_id     = icon
        subcategory.og_image_id = ogimage
        subcategory.handler     = xss(request.input('handler').replace(/\s/g, '-').replace(/\//g, ''))
        subcategory.parent_id   = request.input('parent_id')
        await subcategory.save()

        // Success
        return response.noContent()

    }


    /**
     * Update subcategory translation
     * @param request 
     * @param category 
     */
    public async updateTranslation(request, category) {

        // Get translation
        const translation = await SubcategoryTranslation
                                        .query()
                                        .where('subcategory_id', category.id)
                                        .firstOrFail()

        // Get supported languages
        const languages   = await SettingsLanguages.find(1)

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

        // Update translation
        translation.title       = JSON.stringify(titles)
        translation.description = xss(request.input('description'))
        
        await translation.save()

    }

}
