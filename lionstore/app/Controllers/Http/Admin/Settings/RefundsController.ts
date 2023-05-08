import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsRefund from 'App/Models/SettingsRefund'

export default class AuthController {

    /**
     * Get refunds settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get refunds settings
        const settings = await SettingsRefund.first()

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update refunds settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsRefund
                    .query()
                    .where('id', 1)
                    .update({
                        is_enabled         : request.input('is_enabled'),
                        message_to_customer: request.input('message_to_customer')
                    })

        // Success
        return response.noContent()

    }

}