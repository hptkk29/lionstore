import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsPayment from 'App/Models/SettingsPayment'

export default class GatewaysController {

    /**
     * Get payment gateways settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get payment gateways settings
        const settings = await SettingsPayment.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update payment gateways settings
        await SettingsPayment
                    .query()
                    .where('id', 1)
                    .update({
                        is_paypal : request.input('is_paypal'),
                        is_stripe : request.input('is_stripe'),
                        is_offline: request.input('is_offline'),
                        is_cod    : request.input('is_cod')
                    })

        // Success
        return response.noContent()

    }

}