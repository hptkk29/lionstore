import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsSms from 'App/Models/SettingsSms'

export default class SmsController {

    /**
     * Get sms settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get sms settings
        const settings = await SettingsSms.first()

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update sms settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsSms
                    .query()
                    .where('id', 1)
                    .update({
                        is_active               : request.input('is_active'),
                        default_gateway         : request.input('default_gateway'),
                        template_order_confirmed: request.input('template_order_confirmed'),
                        template_order_delivered: request.input('template_order_delivered'),
                        template_order_shipped  : request.input('template_order_shipped'),
                        template_order_refunded : request.input('template_order_refunded'),
                        template_order_canceled : request.input('template_order_canceled'),
                    })

        // Success
        return response.noContent()

    }

}