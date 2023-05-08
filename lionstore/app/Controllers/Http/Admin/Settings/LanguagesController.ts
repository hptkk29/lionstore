import LanguageValidator from 'App/Validators/Admin/Settings/LanguageValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'

export default class LanguagesController {

    /**
     * Get languages settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get settings
        const settings = await SettingsLanguages.find(1)
        
        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update languages settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Validate request
        await request.validate(LanguageValidator)

        // Update languages settings
        await SettingsLanguages
                    .query()
                    .where('id', 1)
                    .update({
                        is_english    : request.input('is_english'),
                        is_arabic     : request.input('is_arabic'),
                        is_french     : request.input('is_french'),
                        is_spanish    : request.input('is_spanish'),
                        is_russian    : request.input('is_russian'),
                        is_chinese    : request.input('is_chinese'),
                        is_hindi      : request.input('is_hindi'),
                        is_portuguese : request.input('is_portuguese'),
                        is_japanese   : request.input('is_japanese'),
                        is_turkish    : request.input('is_turkish'),
                        is_ukrainian  : request.input('is_ukrainian'),
                        is_polish     : request.input('is_polish'),
                        is_romanian   : request.input('is_romanian'),
                        is_dutch      : request.input('is_dutch'),
                        is_thai       : request.input('is_thai'),
                        is_hungarian  : request.input('is_hungarian'),
                        is_azerbaijani: request.input('is_azerbaijani'),
                        is_german     : request.input('is_german')
                    })

        // Success
        return response.noContent()

    }

}
