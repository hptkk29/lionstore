import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTwilio from 'App/Models/ServiceTwilio'

export default class TwilioController {

    /**
     * Get twilio settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get twilio sms settings
        const settings = await ServiceTwilio.first()

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update twilio sms settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await ServiceTwilio
                .query()
                .where('id', 1)
                .update({
                    account_sid: request.input('account_sid'),
                    auth_token : request.input('auth_token'),
                    phone      : request.input('phone')
                })

        // Success
        return response.noContent()

    }

}