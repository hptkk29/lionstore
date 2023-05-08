import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import SettingsAuth from 'App/Models/SettingsAuth'

export default class HomeController {

    /**
     * Fetch settings for dashboard
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get languages settings
        const languages      = await SettingsLanguages.find(1)

        // Get general settings
        const general        = await SettingsGeneral
                                        .query()
                                        .preload('mobile_logo')
                                        .preload('desktop_logo')
                                        .preload('country')
                                        .preload('favicon')
                                        .first()

        // Get authentication settings
        const authentication = await SettingsAuth
                                        .query()
                                        .where('id', 1)
                                        .select(
                                            'enable_facebook_login', 
                                            'enable_twitter_login',
                                            'enable_google_login',
                                            'facebook_client_id',
                                            'twitter_client_id',
                                            'google_client_id'
                                        )
                                        .first()

        // Success
        return response.json({
            languages     : languages,
            general       : general,
            authentication: authentication
        })

    }

}