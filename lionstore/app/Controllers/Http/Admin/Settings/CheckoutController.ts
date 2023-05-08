import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsCheckout from 'App/Models/SettingsCheckout'

export default class CheckoutController {

    /**
     * Get checkout settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get checkout settings
        const settings = await SettingsCheckout.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update checkout settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Update settings
        await SettingsCheckout
                    .query()
                    .where('id', 1)
                    .update({
                        is_guest_checkout   : request.input('is_guest_checkout'),
                        field_name          : request.input('field_name'),
                        field_phone         : request.input('field_phone'),
                        field_state         : request.input('field_state'),
                        field_city          : request.input('field_city'),
                        field_address       : request.input('field_address'),
                        field_zipcode       : request.input('field_zipcode'),
                        is_whatsapp_order   : request.input('is_whatsapp_order'),
                        whatsapp_btn_mobile : request.input('whatsapp_btn_mobile'),
                        whatsapp_btn_desktop: request.input('whatsapp_btn_desktop'),
                        whatsapp_number     : request.input('whatsapp_number')
                    })

        // Success
        return response.noContent()

    }

}