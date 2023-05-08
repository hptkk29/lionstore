import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import Category from 'App/Models/Category'

export default class FetchController {

    /**
     * Fetch data to create subcategories
     * @param param0 
     * @returns 
     */
    public async fetch({ response }: HttpContextContract) {

        // Get supported languages
        const languages  = await SettingsLanguages.find(1)

        // Get general settings
        const settings   = await SettingsGeneral.find(1)

        // Get categories
        const categories = await Category
                                    .query()
                                    .orderBy('handler', 'asc')

        // Return data
        return response.json({
            languages  : languages,
            defaultLang: settings?.default_language,
            categories : categories
        })
    }

}
