import Vue from 'vue'
import moment from 'moment-timezone'

export default ({ app, store }, inject) => {

    /** 
     * Toasted message
     */
    Vue.prototype.$message = (message, icon = null, type = 'default') => {
        // Clear old toast
        app.$toast.clear()

        // Show new one
        return app.$toast.show(message, {
            position: 'bottom-center',
            iconPack: 'mdi',
            icon: icon ? icon : null,
            singleton: true,
            duration: 5000,
            type: type
        })
    }

    /**
     * Get time ago from timestamp
     * @param  {[type]} timestamp [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.$ago = (timestamp) => {

        if (store.state.lang.locale === 'ar') {
            moment.defineLocale('ar-sa-mine', {
                parentLocale: 'ar-sa',
                preparse: function (string) {
                  return string;
                },
                postformat: function (string) {
                  return string;
                }
            });
        } else {

            switch (store.state.lang.locale) {
                case 'az':
                    moment.locale('az')
                    break;

                case 'cn':
                    moment.locale('zh-cn')
                    break;

                case 'de':
                    moment.locale('de')
                    break;

                case 'en':
                    moment.locale('en')
                    break;

                case 'es':
                    moment.locale('es')
                    break;

                case 'fr':
                    moment.locale('fr')
                    break;

                case 'hi':
                    moment.locale('hi')
                    break;

                case 'hu':
                    moment.locale('hu')
                    break;

                case 'jp':
                    moment.locale('ja')
                    break;

                case 'nl':
                    moment.locale('nl')
                    break;

                case 'po':
                    moment.locale('pl')
                    break;

                case 'pt':
                    moment.locale('pt')
                    break;

                case 'ro':
                    moment.locale('ro')
                    break;

                case 'ru':
                    moment.locale('ru')
                    break;

                case 'th':
                    moment.locale('th')
                    break;

                case 'tr':
                    moment.locale('tr')
                    break;

                case 'ua':
                    moment.locale('uk')
                    break;
            
                default:
                    moment.locale('en')
                    break;
            }
        }

        let time = moment(timestamp)
        return time.fromNow();
    }


    /**
     * Get full time from timestamp
     * @param  {[type]} timestamp [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.$fulltime = (timestamp) => {
        
        if (store.state.lang.locale === 'ar') {
            moment.defineLocale('ar-sa-mine', {
                parentLocale: 'ar-sa',
                preparse: function (string) {
                  return string;
                },
                postformat: function (string) {
                  return string;
                }
            });
        } else {

            switch (store.state.lang.locale) {
                case 'az':
                    moment.locale('az')
                    break;

                case 'cn':
                    moment.locale('zh-cn')
                    break;

                case 'de':
                    moment.locale('de')
                    break;

                case 'en':
                    moment.locale('en')
                    break;

                case 'es':
                    moment.locale('es')
                    break;

                case 'fr':
                    moment.locale('fr')
                    break;

                case 'hi':
                    moment.locale('hi')
                    break;

                case 'hu':
                    moment.locale('hu')
                    break;

                case 'jp':
                    moment.locale('ja')
                    break;

                case 'nl':
                    moment.locale('nl')
                    break;

                case 'po':
                    moment.locale('pl')
                    break;

                case 'pt':
                    moment.locale('pt')
                    break;

                case 'ro':
                    moment.locale('ro')
                    break;

                case 'ru':
                    moment.locale('ru')
                    break;

                case 'th':
                    moment.locale('th')
                    break;

                case 'tr':
                    moment.locale('tr')
                    break;

                case 'ua':
                    moment.locale('uk')
                    break;
            
                default:
                    moment.locale('en')
                    break;
            }
        }

        let time = moment(timestamp)
        return time.format('LLLL')
    }


    /**
     * Get full time from timestamp
     * @param  {[type]} timestamp [description]
     * @return {[type]}           [description]
     */
    Vue.prototype.$momentLL = (timestamp) => {
        
        if (store.state.lang.locale === 'ar') {
            moment.defineLocale('ar-sa-mine', {
                parentLocale: 'ar-sa',
                preparse: function (string) {
                  return string;
                },
                postformat: function (string) {
                  return string;
                }
            });
        } else {

            switch (store.state.lang.locale) {
                case 'az':
                    moment.locale('az')
                    break;

                case 'cn':
                    moment.locale('zh-cn')
                    break;

                case 'de':
                    moment.locale('de')
                    break;

                case 'en':
                    moment.locale('en')
                    break;

                case 'es':
                    moment.locale('es')
                    break;

                case 'fr':
                    moment.locale('fr')
                    break;

                case 'hi':
                    moment.locale('hi')
                    break;

                case 'hu':
                    moment.locale('hu')
                    break;

                case 'jp':
                    moment.locale('ja')
                    break;

                case 'nl':
                    moment.locale('nl')
                    break;

                case 'po':
                    moment.locale('pl')
                    break;

                case 'pt':
                    moment.locale('pt')
                    break;

                case 'ro':
                    moment.locale('ro')
                    break;

                case 'ru':
                    moment.locale('ru')
                    break;

                case 'th':
                    moment.locale('th')
                    break;

                case 'tr':
                    moment.locale('tr')
                    break;

                case 'ua':
                    moment.locale('uk')
                    break;
            
                default:
                    moment.locale('en')
                    break;
            }
        }

        let time = moment(timestamp)
        return time.format('LL')
    }


    /** 
     * Set errors
     */
    Vue.prototype.$errors = (response) => {
        // Create errors object
        const errors = {}

        // Filter response
        for (let index = 0; index < response.length; index++) {
            const element = response[index];
            const field   = element.field
            const message = element.message
            errors[field] = [message]
        }
        
        // Return errors
        return errors
    }

     
    /** 
     * Format price
     */
    Vue.prototype.$formatMoney = (price, locale = null, code = null) => {
        try {

            if (locale && code) {
                return new Intl.NumberFormat(locale, { style: 'currency', currency: code }).format(price)
            }
            
            return new Intl.NumberFormat(store.state.settings.currency.locale, { style: 'currency', currency: store.state.settings.currency.code }).format(price)
        
        } catch (error) {
            return 'N/A'
        }
    }

    // Format number
    Vue.prototype.$formatNumber = (number, locale = null, code = null) => {
        try {

            if (locale && code) {
                return new Intl.NumberFormat(locale).format(number)
            }
            
            return new Intl.NumberFormat(store.state.settings.currency.locale).format(number)
        
        } catch (error) {
            return 'N/A'
        }
    }

    // API link
    inject('serverIndex', to => {
        if (to) {
            return `${app.$config.APP_API_URL}/${to}`
        } else {
            return `${app.$config.APP_API_URL}`
        }
    })

    // Client link
    inject('clientIndex', to => {
        if (to) {
            return `${app.$config.APP_URL}/${to}`
        } else {
            return `${app.$config.APP_URL}`
        }
    })

    /**
     * Generate gallery for product
     * @param {*} media 
     */
    inject('gallery', (media, isZoomer = true) => {

        // Set array for large, normal and small pics
        var large        = []
        var normal       = []
        var small        = []
        
        // Parse data in database
        const largeJson  = JSON.parse(media.large_images)
        const normalJson = JSON.parse(media.medium_images)
        const smallJson  = JSON.parse(media.small_images)

        // Loop trough large images
        for (const [lKey, lValue] of Object.entries(largeJson)) {
            let element = {
                id : parseInt(lKey),
                url: `${app.$config.APP_URL}/uploads/products/${lValue}`
            }
            large.push(element)
        }

        // Loop trough normal images
        for (const [nKey, nValue] of Object.entries(normalJson)) {
            let element = {
                id : parseInt(nKey),
                url: `${app.$config.APP_URL}/uploads/products/${nValue}`
            }
            normal.push(element)
        }

        // Loop trough large images
        for (const [sKey, sValue] of Object.entries(smallJson)) {
            let element = {
                id : parseInt(sKey),
                url: `${app.$config.APP_URL}/uploads/products/${sValue}`
            }
            small.push(element)
        }

        // Check if product zoomer enabled
        if (!isZoomer) {
            // Return images
            return {
                thumbs     : small,
                normal_size: large,
                large_size : large
            }
        }

        // Return images
        return {
            thumbs     : small,
            normal_size: normal,
            large_size : large
        }

    })

    // Client link
    inject('cookiesOptions', () => {
        return {
            httpOnly: false,
            path    : '/',
            domain  : '',
            maxAge  : 60 * 60 * 24 * 7
        }
    })

    // Set reCaptcha language
    inject('setRecaptchaLang', (locale) => {
        
        // Get supported languages
        const data = {
            ar: 'ar',
            az: 'az',
            cn: 'zh-CN',
            de: 'de',
            en: 'en',
            es: 'es',
            fr: 'fr',
            hi: 'hi',
            hu: 'hu',
            jp: 'ja',
            nl: 'nl',
            po: 'pl',
            pt: 'pt',
            ro: 'ro',
            ru: 'ru',
            th: 'th',
            tr: 'tr',
            ua: 'uk',
        }

        // Set recaptcha language
        app.$recaptcha.language = data[locale]

    })

    // Set favicon
    inject('favicon', () => {
        // Check if site has favicon
        if (store.state.settings.favicon) {
            
            // Return favicon
            return `${ app.$config.APP_URL }/uploads/${ store.state.settings.favicon.file_folder }/${ store.state.settings.favicon.uid }.webp`

        } else {

            // Site has no favicon, return default
            return `${ app.$config.APP_URL }/images/default/favicon.svg`

        }
    })

    // Set ogimage
    inject('ogimage', () => {
        // Check if site has default favicon
        if (store.state.settings.seo && store.state.settings.seo.ogimage) {
            
            // OG image
            const ogimage = store.state.settings.seo.ogimage

            // Return ogimage
            return `${ app.$config.APP_URL }/uploads/${ ogimage.file_folder }/${ ogimage.uid }.webp`

        } else {

            // Return default ogimage
            return `${ app.$config.APP_URL }/images/default/ogimage.svg`

        }
    })

}