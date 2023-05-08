import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsSecurity from 'App/Models/SettingsSecurity'

export default class SecurityController {

    /**
     * Get security settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get security settings
        const settings = await SettingsSecurity.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update security settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update security settings
        await SettingsSecurity
                    .query()
                    .where('id', 1)
                    .update({
                        is_recaptcha        : request.input('is_recaptcha'),
                        recaptcha_site_key  : request.input('recaptcha_site_key', null),
                        recaptcha_secret_key: request.input('recaptcha_secret_key', null)
                    })

        // Success
        return response.noContent()

    }

}