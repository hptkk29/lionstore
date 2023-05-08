import EditValidator from 'App/Validators/Admin/Childcategories/EditValidator'
import ChildcategoryTranslation from 'App/Models/ChildcategoryTranslation'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import Childcategory from 'App/Models/Childcategory'
import Uploader from 'App/Services/Uploader'
import Category from 'App/Models/Category'
import xss from 'xss'
import Subcategory from 'App/Models/Subcategory'

export default class EditController {

    /**
     * Get childcategory to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get childcategory id
        const id            = request.input('id')

        // Get childcategory
        const childcategory = await Childcategory
                                    .query()
                                    .where('uid', id)
                                    .preload('translation')
                                    .firstOrFail()

        // Get categories
        const categories    = await Category
                                    .query()
                                    .orderBy('handler', 'desc')
                                    .preload('translation')

        // Get subcategories
        const subcategories = await Subcategory
                                        .query()
                                        .where('parent_id', childcategory.parent_id)
                                        .preload('translation')
                                        .orderBy('handler', 'desc')

        // success
        return response.json({
            childcategory: childcategory,
            categories   : categories,
            subcategories: subcategories,
        })

    }


    /**
     * Update childcategory
     * @param param0 
     * @returns 
     */
    public async update({  request, response, auth }: HttpContextContract) {

        // Authenticate user
        await auth.use('api').authenticate()

        // Get childcategory id 
        const id       = request.input('id')

        // Get childcategory
        const childcategory = await Childcategory
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
                deleteId  : childcategory.icon_id
            }) as any
        } else {
            var icon = childcategory.icon_id as any
        }

        // Update ogimage if exists in request
        if (request.file('ogimage')) {
            var ogimage = await Uploader.singleFile({
                file      : request.file('ogimage'),
                folder    : 'subcategories',
                uploaderId: auth.user?.id,
                width     : 800,
                deleteOld : true,
                deleteId  : childcategory.og_image_id
            }) as any
        } else {
            var ogimage = childcategory.og_image_id as any
        }

        // Update translation
        await this.updateTranslation(request, childcategory.toJSON())

        // Update childcategory
        childcategory.icon_id        = icon
        childcategory.og_image_id    = ogimage
        childcategory.handler        = xss(request.input('handler').replace(/\s/g, '-').replace(/\//g, ''))
        childcategory.is_featured    = request.input('is_featured')
        childcategory.parent_id      = request.input('parent_id')
        childcategory.subcategory_id = request.input('subcategory_id')
        await childcategory.save()

        // Success
        return response.noContent()

    }


    /**
     * Update childcategory translation
     * @param request 
     * @param category 
     */
    public async updateTranslation(request, category) {

        // Get translation
        const translation = await ChildcategoryTranslation
                                        .query()
                                        .where('childcategory_id', category.id)
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
