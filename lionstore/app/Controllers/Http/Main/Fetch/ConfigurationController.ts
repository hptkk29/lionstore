import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import SettingsAnalytics from 'App/Models/SettingsAnalytics'
import SettingsCurrency from 'App/Models/SettingsCurrency'
import SettingsSecurity from 'App/Models/SettingsSecurity'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import SettingsRefund from 'App/Models/SettingsRefund'
import SettingsFooter from 'App/Models/SettingsFooter'
import SettingsAuth from 'App/Models/SettingsAuth'
import SettingsSeo from 'App/Models/SettingsSeo'
import Page from 'App/Models/Page'
import SettingsCheckout from 'App/Models/SettingsCheckout'

export default class ConfigurationController {

    /**
     * Fetch Site Configuration data
     * @param param0 
     */
    public async configuration({ response }: HttpContextContract) {

        // Get footer settings
        const footer         = await SettingsFooter
                                        .query()
                                        .preload('image')
                                        .first()

        // Get pages
        const pages          = await Page
                                        .query()
                                        .preload('translation')

        // Get languages settings
        const languages      = await SettingsLanguages.find(1)

        // Get seo settings
        const seo            = await SettingsSeo
                                        .query()
                                        .preload('ogimage', (builder) => {
                                            builder.select('id', 'uid', 'file_folder')
                                        })
                                        .first()
                                        
        // Get general settings
        const general        = await SettingsGeneral
                                        .query()
                                        .preload('mobile_logo')
                                        .preload('desktop_logo')
                                        .preload('country')
                                        .preload('favicon')
                                        .first()

        // Get authentication settings
        const authentication = await SettingsAuth
                                        .query()
                                        .where('id', 1)
                                        .select(
                                            'enable_facebook_login', 
                                            'enable_twitter_login',
                                            'enable_google_login',
                                            'facebook_client_id',
                                            'twitter_client_id',
                                            'google_client_id'
                                        )
                                        .first()

        // Get recaptcha settings
        const recaptcha      = await SettingsSecurity
                                        .query()
                                        .where('id', 1)
                                        .select('is_recaptcha', 'recaptcha_site_key')
                                        .first()

        // Get default currency
        const currency       = await SettingsCurrency.find(1)

        // Get refunds settings
        const refunds        = await SettingsRefund.first()

        // Get analytics settings
        const analytics      = await SettingsAnalytics.first()

        // Get checkout settings
        const checkout       = await SettingsCheckout.first()

        // Return data
        return response.json({
            footer        : footer?.toJSON(),
            pages         : pages,
            languages     : languages?.toJSON(),
            general       : general?.toJSON(),
            authentication: authentication,
            recaptcha     : recaptcha,
            currency      : currency?.toJSON(),
            seo           : seo?.toJSON(),
            refunds       : refunds?.toJSON(),
            analytics     : analytics?.toJSON(),
            checkout      : checkout?.toJSON(),
        })

    }

}