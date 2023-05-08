import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsCheckout from 'App/Models/SettingsCheckout'

export default class AuthController {

    /**
     * Fetch checkout settings
     * @param param0 
     * @returns 
     */
    public async fetch({ response }: HttpContextContract) {

        // Get checkout settings
        const settings = await SettingsCheckout.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }

}