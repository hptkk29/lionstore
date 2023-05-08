import GeneralValidator from 'App/Validators/Admin/Settings/GeneralValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import Uploader from 'App/Services/Uploader'
import Country from 'App/Models/Country'

export default class LanguagesController {

    /**
     * Get general settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get countries
        const countries  = await Country.all()

        // Get general settings
        const general    = await SettingsGeneral.find(1)

        // Return data
        return response.json({
            countries : countries,
            general   : general
        })

    }


    /**
     * Update General settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate user
        await auth.use('api').authenticate()

        // Validate form
        await request.validate(GeneralValidator)

        // Get general settings
        const general = await SettingsGeneral.find(1) as any

        // Check if want to change desktop logo
        if (request.file('desktop_logo')) {
            var desktop_logo = await Uploader.singleFile({
                file      : request.file('desktop_logo'),
                folder    : 'settings',
                uploaderId: auth.user?.id,
                width     : 200,
                deleteOld : general?.desktop_logo_id ? true : false,
                deleteId  : general?.desktop_logo_id
            }) as any
        } else {
            var desktop_logo = general?.desktop_logo_id as any
        }

        // Check if want to change mobile logo
        if (request.file('mobile_logo')) {
            var mobile_logo = await Uploader.singleFile({
                file      : request.file('mobile_logo'),
                folder    : 'settings',
                uploaderId: auth.user?.id,
                width     : 150,
                deleteOld : general?.mobile_logo_id ? true : false,
                deleteId  : general?.mobile_logo_id
            }) as any
        } else {
            var mobile_logo = general?.mobile_logo_id as any
        }

        // Check if want to change favicon
        if (request.file('favicon')) {
            var favicon = await Uploader.singleFile({
                file      : request.file('favicon'),
                folder    : 'settings',
                uploaderId: auth.user?.id,
                width     : 50,
                deleteOld : general?.favicon_id ? true : false,
                deleteId  : general?.favicon_id
            }) as any
        } else {
            var favicon = general?.favicon_id as any
        }

        // Update settings
        general.site_title       = request.input('site_title')
        general.site_tagline     = request.input('site_tagline')
        general.site_description = request.input('site_description')
        general.title_separator  = request.input('title_separator')
        general.is_global        = request.input('is_global')
        general.default_country  = request.input('default_country')
        general.default_language = request.input('default_language')
        general.desktop_logo_id  = desktop_logo
        general.mobile_logo_id   = mobile_logo
        general.favicon_id       = favicon
        general.site_email       = request.input('site_email')
        general.site_phone       = request.input('site_phone')
        general.site_address     = request.input('site_address')
        general.is_rtl           = request.input('is_rtl')

        await general.save()

        // Success
        return response.noContent()

    }

}