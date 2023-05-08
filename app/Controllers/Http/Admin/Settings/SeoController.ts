import SeoValidator from 'App/Validators/Admin/Settings/SeoValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsSeo from 'App/Models/SettingsSeo'
import Uploader from 'App/Services/Uploader'

export default class SeoController {

    /**
     * Get seo settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get seo settings
        const settings = await SettingsSeo.first()

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update seo settings
     * @param param0 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Validate form
        await request.validate(SeoValidator)

        // Get seo settings
        const settings              = await SettingsSeo.find(1) as any

        // Check if want to change desktop logo
        if (request.file('ogimage')) {
            var ogimage = await Uploader.singleFile({
                file      : request.file('ogimage'),
                folder    : 'settings',
                uploaderId: auth.user?.id,
                width     : 1080,
                deleteOld : settings?.default_ogimage_id ? true : false,
                deleteId  : settings?.default_ogimage_id
            }) as any
        } else {
            var ogimage = settings?.default_ogimage_id as any
        }

        // Update settings
        settings.is_sitemap         = request.input('is_sitemap')
        settings.facebook_app_id    = request.input('facebook_app_id')
        settings.facebook_page_id   = request.input('facebook_page_id')
        settings.twitter_username   = request.input('twitter_username')
        settings.default_ogimage_id = ogimage
        await settings.save()

        // Success
        return response.noContent()

    }

}