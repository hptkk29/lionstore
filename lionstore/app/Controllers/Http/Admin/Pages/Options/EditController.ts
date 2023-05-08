import EditValidator from 'App/Validators/Admin/Pages/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import PageTranslation from 'App/Models/PageTranslation'
import Uploader from 'App/Services/Uploader'
import Page from 'App/Models/Page'
import SettingsFooter from 'App/Models/SettingsFooter'

export default class EditController {

    /**
     * Get page to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get page
        const page    = await Page
                                .query()
                                .where('handler', request.input('id'))
                                .preload('translation')
                                .firstOrFail()

        // Get footer settings
        const settings = await SettingsFooter.find(1)

        // Return page
        return response.json({
            page    : page.toJSON(),
            settings: settings?.toJSON()
        })

    }


    /**
     * Update page
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Get page
        const page = await Page
                            .query()
                            .where('id', request.input('id'))
                            .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Check if want to change ogimage file
        if (request.file('ogimage')) {
            var ogimage = await Uploader.singleFile({
                file      : request.file('ogimage'),
                folder    : 'pages',
                uploaderId: auth.user?.id,
                width     : 800,
                deleteOld : page.og_image_id ? true : false,
                deleteId  : page.og_image_id
            }) as any
        } else {
            var ogimage = page.og_image_id as any
        }

        // Update page
        page.column          = request.input('column')
        page.handler         = request.input('handler')
        page.seo_title       = request.input('seo_title')
        page.seo_description = request.input('seo_description')
        page.og_image_id     = ogimage
        await page.save()

        // Update translation
        await this.updateTranslation(page.toJSON(), request)

        // Success
        return response.noContent()

    }


    /**
     * Update page translation
     * @param request 
     * @param page 
     */
     public async updateTranslation(page, request) {

        // Get supported languages
        const languages = await SettingsLanguages.find(1)

        // Set title in supported languages
        const title_ar               = languages?.is_arabic ? request.input('title_ar')     : null
        const title_az               = languages?.is_azerbaijani ? request.input('title_az'): null
        const title_cn               = languages?.is_chinese ? request.input('title_cn')    : null
        const title_de               = languages?.is_german ? request.input('title_de')     : null
        const title_en               = languages?.is_english ? request.input('title_en')    : null
        const title_es               = languages?.is_spanish ? request.input('title_es')    : null
        const title_fr               = languages?.is_french ? request.input('title_fr')     : null
        const title_hi               = languages?.is_hindi ? request.input('title_hi')      : null
        const title_hu               = languages?.is_hungarian ? request.input('title_hu')  : null
        const title_jp               = languages?.is_japanese ? request.input('title_jp')   : null
        const title_nl               = languages?.is_dutch ? request.input('title_nl')      : null
        const title_po               = languages?.is_polish ? request.input('title_po')     : null
        const title_pt               = languages?.is_portuguese ? request.input('title_pt') : null
        const title_ro               = languages?.is_romanian ? request.input('title_ro')   : null
        const title_ru               = languages?.is_russian ? request.input('title_ru')    : null
        const title_th               = languages?.is_thai ? request.input('title_th')       : null
        const title_tr               = languages?.is_turkish ? request.input('title_tr')    : null
        const title_ua               = languages?.is_ukrainian ? request.input('title_ua')  : null

        // Set content in supported languages
        const content_ar             = languages?.is_arabic ? request.input('content_ar')     : null
        const content_az             = languages?.is_azerbaijani ? request.input('content_az'): null
        const content_cn             = languages?.is_chinese ? request.input('content_cn')    : null
        const content_de             = languages?.is_german ? request.input('content_de')     : null
        const content_en             = languages?.is_english ? request.input('content_en')    : null
        const content_es             = languages?.is_spanish ? request.input('content_es')    : null
        const content_fr             = languages?.is_french ? request.input('content_fr')     : null
        const content_hi             = languages?.is_hindi ? request.input('content_hi')      : null
        const content_hu             = languages?.is_hungarian ? request.input('content_hu')  : null
        const content_jp             = languages?.is_japanese ? request.input('content_jp')   : null
        const content_nl             = languages?.is_dutch ? request.input('content_nl')      : null
        const content_po             = languages?.is_polish ? request.input('content_po')     : null
        const content_pt             = languages?.is_portuguese ? request.input('content_pt') : null
        const content_ro             = languages?.is_romanian ? request.input('content_ro')   : null
        const content_ru             = languages?.is_russian ? request.input('content_ru')    : null
        const content_th             = languages?.is_thai ? request.input('content_th')       : null
        const content_tr             = languages?.is_turkish ? request.input('content_tr')    : null
        const content_ua             = languages?.is_ukrainian ? request.input('content_ua')  : null

        // Update translation
        await PageTranslation
                    .query()
                    .where('page_id', page.id)
                    .update({
                        title_ar  : title_ar,
                        title_az  : title_az,
                        title_cn  : title_cn,
                        title_de  : title_de,
                        title_en  : title_en,
                        title_es  : title_es,
                        title_fr  : title_fr,
                        title_hi  : title_hi,
                        title_hu  : title_hu,
                        title_jp  : title_jp,
                        title_nl  : title_nl,
                        title_po  : title_po,
                        title_pt  : title_pt,
                        title_ro  : title_ro,
                        title_ru  : title_ru,
                        title_th  : title_th,
                        title_tr  : title_tr,
                        title_ua  : title_ua,
                        content_ar: content_ar,
                        content_az: content_az,
                        content_cn: content_cn,
                        content_de: content_de,
                        content_en: content_en,
                        content_es: content_es,
                        content_fr: content_fr,
                        content_hi: content_hi,
                        content_hu: content_hu,
                        content_jp: content_jp,
                        content_nl: content_nl,
                        content_po: content_po,
                        content_pt: content_pt,
                        content_ro: content_ro,
                        content_ru: content_ru,
                        content_th: content_th,
                        content_tr: content_tr,
                        content_ua: content_ua,
                    })
        

    }

}