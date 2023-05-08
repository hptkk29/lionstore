import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsAuth from 'App/Models/SettingsAuth'

export default class AuthController {

    /**
     * Get auth settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get auth settings
        const settings = await SettingsAuth.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update authentication settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsAuth
                    .query()
                    .where('id', 1)
                    .update({
                        enable_facebook_login: request.input('is_facebook'),
                        enable_twitter_login : request.input('is_twitter'),
                        enable_google_login  : request.input('is_google'),
                        facebook_client_id   : request.input('facebook_client_id'),
                        facebook_secret_id   : request.input('facebook_secret_id'),
                        twitter_client_id    : request.input('twitter_client_id'),
                        twitter_secret_id    : request.input('twitter_secret_id'),
                        google_client_id     : request.input('google_client_id'),
                        google_secret_id     : request.input('google_secret_id'),
                        verification_required: request.input('verification_required')
                    })

        // Success
        return response.noContent()

    }

}