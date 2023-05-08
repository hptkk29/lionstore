import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsSmtp from 'App/Models/SettingsSmtp'

export default class SmtpController {

    /**
     * Get smtp settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get smtp settings
        const settings = await SettingsSmtp.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update smtp settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsSmtp
                    .query()
                    .where('id', 1)
                    .update({
                        host      : request.input('host'),
                        port      : request.input('port'),
                        is_secure : request.input('is_secure'),
                        username  : request.input('username'),
                        password  : request.input('password'),
                        from_email: request.input('from_email'),
                        from_name : request.input('from_name')
                    })

        // Success
        return response.noContent()

    }

}