import SettingsCurrency from "App/Models/SettingsCurrency";
import Application from "@ioc:Adonis/Core/Application";
import { I18n } from 'i18n'

export default class Helpers {

    /**
     * Format price depends on default currency
     * @param amount 
     * @param locale 
     * @param code 
     * @returns 
     */
    static async formatMoney(amount, locale = null, code = null) {

        try {

            // Check if want to customize locale and code
            if (locale && code) {
                return new Intl.NumberFormat(locale as any, { style: 'currency', currency: code as any }).format(amount)
            }

            // Get default currency settings
            const settings = await SettingsCurrency.first()

            // Format money
            return new Intl.NumberFormat(settings?.locale, { style: 'currency', currency: settings?.code }).format(amount)
            
        } catch (error) {
            return 'N/A'
        }

         

    }


    /**
     * Translate text
     * @param text 
     * @param locale 
     * @returns 
     */
    static trans (text, locale, params = false as any) {
    
        // Config translation
        const i18n     = new I18n({
            locales      : ['ar', 'az', 'cn', 'de', 'en', 'es', 'fr', 'hi', 'hu', 'jp', 'nl', 'po', 'pt', 'ro', 'ru', 'th', 'tr', 'ua'],
            directory    : Application.resourcesPath('locales'),
            defaultLocale: locale,
            fallbacks    : { 
                ar: 'en',
                az: 'en',
                cn: 'en',
                de: 'en',
                en: 'en',
                es: 'en',
                fr: 'en',
                hi: 'en',
                hu: 'en',
                jp: 'en',
                nl: 'en',
                po: 'en',
                pt: 'en',
                ro: 'en',
                ru: 'en',
                th: 'en',
                tr: 'en',
                ua: 'en',
            }
        })

        // Check if translate has params
        if (params) {
            return i18n.__(text, params)
        }

        // Return translation
        return i18n.__(text)
    }

}