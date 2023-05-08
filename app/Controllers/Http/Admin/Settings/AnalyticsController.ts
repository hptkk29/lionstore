import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsAnalytics from 'App/Models/SettingsAnalytics'

export default class AnalyticsController {

    /**
     * Get analytics settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get analytics settings
        const settings = await SettingsAnalytics.first()

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update analytics settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsAnalytics
                    .query()
                    .where('id', 1)
                    .update({
                        google_gtm_id    : request.input('google_gtm_id'),
                        facebook_pixel_id: request.input('facebook_pixel_id'),
                        snapchat_pixel_id: request.input('snapchat_pixel_id'),
                        tiktok_pixel_id  : request.input('tiktok_pixel_id')
                    })

        // Success
        return response.noContent()

    }

}