import axios from 'axios'
import { loadMessages } from '~/plugins/i18n'

export default async ({ app: { i18n, $cookies }, store }) => {

    // Get locale saved in cookies
    const locale = $cookies.get('locale') || store.state.settings.default_language

    // Check locale
    switch (locale) {

        case 'ar':
            i18n.locale = 'ar'
            await loadMessages('ar')
            break;

            case 'az':
                i18n.locale = 'az'
                await loadMessages('az')
                break;

            case 'cn':
                i18n.locale = 'cn'
                await loadMessages('cn')
                break;

            case 'de':
                i18n.locale = 'de'
                await loadMessages('de')
                break;

            case 'en':
                i18n.locale = 'en'
                await loadMessages('en')
                break;

            case 'es':
                i18n.locale = 'es'
                await loadMessages('es')
                break;

            case 'fr':
                i18n.locale = 'fr'
                await loadMessages('fr')
                break;

            case 'hi':
                i18n.locale = 'hi'
                await loadMessages('hi')
                break;

            case 'hu':
                i18n.locale = 'hu'
                await loadMessages('hu')
                break;

            case 'jp':
                i18n.locale = 'jp'
                await loadMessages('jp')
                break;

            case 'nl':
                i18n.locale = 'nl'
                await loadMessages('nl')
                break;

            case 'po':
                i18n.locale = 'po'
                await loadMessages('po')
                break;

            case 'pt':
                i18n.locale = 'pt'
                await loadMessages('pt')
                break;

            case 'ro':
                i18n.locale = 'ro'
                await loadMessages('ro')
                break;

            case 'ru':
                i18n.locale = 'ru'
                await loadMessages('ru')
                break;

            case 'th':
                i18n.locale = 'th'
                await loadMessages('th')
                break;

            case 'tr':
                i18n.locale = 'tr'
                await loadMessages('tr')
                break;

            case 'ua':
                i18n.locale = 'ua'
                await loadMessages('ua')
                break;
    
        default:
            i18n.locale = 'en'
            await loadMessages('en')
            break;
    }


    if (process.server) {
        axios.defaults.headers.common['Accept-Language'] = locale
        axios.defaults.headers.common['locale']          = locale
    }
    
}