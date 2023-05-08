import EditValidator from 'App/Validators/Admin/Brands/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import BrandTranslation from 'App/Models/BrandTranslation'
import Uploader from 'App/Services/Uploader'
import Brand from 'App/Models/Brand'
import xss from 'xss'

export default class EditController {

    /**
     * Get brand to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get brand id
        const id    = request.input('id')

        // Get brand
        const brand = await Brand
                                .query()
                                .where('uid', id)
                                .preload('logo')
                                .preload('translation')
                                .firstOrFail()

        // Return brand
        return response.json(brand.toJSON())

    }


    /**
     * Update brand
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Get brand id
        const id = request.input('id')
        
        // Get brand
        const brand = await Brand
        .query()
        .where('id', id)
        .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Check if new logo requested
        if (request.file('logo')) {
            var logo = await Uploader.singleFile({
                file      : request.file('logo'),
                folder    : 'brands',
                uploaderId: auth.user?.id,
                width     : 100,
                deleteOld : true,
                deleteId  : brand.logo_id
            }) as any
        } else {
            var logo = brand.logo_id as any
        }

        // Update brand
        brand.logo_id = logo
        brand.handler = xss(request.input('handler').replace(/\s/g, '-').replace(/\//g, ''))
        await brand.save()

        // Update translation
        await this.updateTranslation(request, brand.toJSON())

        // Success
        return response.noContent()

    }


    /**
     * Update brand translation
     * @param request 
     * @param brand 
     */
    public async updateTranslation(request, brand) {

        // Get supported languages
        const languages = await SettingsLanguages.find(1)

        // Set name in supported languages
        const names     = {
            ar: languages?.is_arabic ? request.input('name_ar')     : null,
            az: languages?.is_azerbaijani ? request.input('name_az'): null,
            cn: languages?.is_chinese ? request.input('name_cn')    : null,
            de: languages?.is_german ? request.input('name_de')     : null,
            en: languages?.is_english ? request.input('name_en')    : null,
            es: languages?.is_spanish ? request.input('name_es')    : null,
            fr: languages?.is_french ? request.input('name_fr')     : null,
            hi: languages?.is_hindi ? request.input('name_hi')      : null,
            hu: languages?.is_hungarian ? request.input('name_hu')  : null,
            jp: languages?.is_japanese ? request.input('name_jp')   : null,
            nl: languages?.is_dutch ? request.input('name_nl')      : null,
            po: languages?.is_polish ? request.input('name_po')     : null,
            pt: languages?.is_portuguese ? request.input('name_pt') : null,
            ro: languages?.is_romanian ? request.input('name_ro')   : null,
            ru: languages?.is_russian ? request.input('name_ru')    : null,
            th: languages?.is_thai ? request.input('name_th')       : null,
            tr: languages?.is_turkish ? request.input('name_tr')    : null,
            ua: languages?.is_ukrainian ? request.input('name_ua')  : null,
        }

        // Get brand translation
        await BrandTranslation
                .query()
                .where('brand_id', brand.id)
                .update({
                    name: JSON.stringify(names),
                    description: xss(request.input('description'))
                })

    }

}
