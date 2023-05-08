import CurrencyValidator from 'App/Validators/Admin/Settings/CurrencyValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsCurrency from 'App/Models/SettingsCurrency'

export default class AuthController {

    /**
     * Get currency settings
     * @param param0 
     */
    public async settings({ response }: HttpContextContract) {

        // Get currency settings
        const settings = await SettingsCurrency.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update currency settings
     * @param param0 
     */
    public async update({ request, response }: HttpContextContract) {

        // Validate form
        await request.validate(CurrencyValidator)

        // Update settings
        await SettingsCurrency
                    .query()
                    .where('id', 1)
                    .update({
                        locale       : request.input('locale'),
                        code         : request.input('code'),
                        name         : request.input('name'),
                        symbol       : request.input('symbol'),
                        symbol_native: request.input('symbol_native'),
                        name_plural  : request.input('name_plural'),
                        exchange_rate: request.input('exchange_rate')
                    })

        // Success
        return response.noContent()

    }

}