import Application from '@ioc:Adonis/Core/Application'
import { I18n } from 'i18n'
import edge from 'edge.js'
import moment from 'moment'
import Env from '@ioc:Adonis/Core/Env'

// Translate text
edge.global('trans', function (text, locale, params = false as any) {
    
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
})

// Get time ago
edge.global('ago', function (timestamp, locale) {
    moment.locale(locale)
    let time = moment(timestamp)
    return time.fromNow();
})

// Get app url
edge.global('index', function (to = false) {
    if (to) {
        return `${ Env.get('APP_URL') }/${ to }`
    } else {
        return Env.get('APP_URL')
    }
})

// New line to Break
edge.global('nl2br', function (text) {
    return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2')
})

// Format money
edge.global('formatMoney', function (price, locale, code) {
    try {

        return new Intl.NumberFormat(locale, { style: 'currency', currency: code }).format(price)
            
    } catch (error) {
        return 'N/A'
    }
})