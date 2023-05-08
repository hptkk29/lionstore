import FooterValidator from 'App/Validators/Admin/Settings/FooterValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsFooter from 'App/Models/SettingsFooter'
import Uploader from 'App/Services/Uploader'

export default class FooterController {

    /**
     * Get footer settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get footer settings
        const settings = await SettingsFooter.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update settings
     * @param param0 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Validate request
        await request.validate(FooterValidator)

        // Get footer settings
        const settings           = await SettingsFooter
                                                .query()
                                                .where('id', 1)
                                                .first() as any

        // Check if want to change footer payment methods image
        if (request.file('footer_image')) {
            var footer_image     = await Uploader.singleFile({
                file      : request.file('footer_image'),
                folder    : 'settings',
                uploaderId: auth.user?.id,
                height    : 60,
                deleteOld : settings?.footer_image_id ? true : false,
                deleteId  : settings?.footer_image_id
            }) as any
        } else {
            var footer_image     = settings?.footer_image_id as any
        }

        // Update settings
        settings.copyrights      = request.input('copyrights', null)
        settings.first_column    = request.input('first_column', null)
        settings.second_column   = request.input('second_column', null)
        settings.third_column    = request.input('third_column', null)
        settings.facebook_url    = request.input('facebook_url', null)
        settings.twitter_url     = request.input('twitter_url', null)
        settings.instagram_url   = request.input('instagram_url', null)
        settings.whatsapp_url    = request.input('whatsapp_url', null)
        settings.telegram_url    = request.input('telegram_url', null)
        settings.pinterest_url   = request.input('pinterest_url', null)
        settings.vk_url          = request.input('vk_url', null)
        settings.youtube_url     = request.input('youtube_url', null)
        settings.footer_image_id = footer_image
        await settings.save()

        // Success
        return response.noContent()

    }

}