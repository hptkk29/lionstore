// state
export const state = () => ({
    default_language: null,
    site_title      : null,
    site_tagline    : null,
    site_description: null,
    title_separator : null,
    is_global       : false,
    default_country : null,
    desktop_logo    : null,
    mobile_logo     : null,
    favicon         : null,
    site_email      : null,
    site_phone      : null,
    site_address    : null,
    is_rtl          : null,
    pages           : [],
    footer          : null,
    authentication  : null,
    recaptcha       : null,
    currency        : null,
    seo             : null,
    refunds         : null,
    analytics       : null,
    checkout        : null,
    languages       : {
        ar: false,
        cn: false,
        de: false,
        en: false,
        es: false,
        fr: false,
        hi: false,
        hu: false,
        jp: false,
        nl: false,
        po: false,
        pt: false,
        ro: false,
        ru: false,
        th: false,
        tr: false,
        ua: false
    }
})

// getters
export const getters = {
    default_language: state => state.default_language,
    languages       : state => state.languages,
    site_title      : state => state.site_title,
    site_tagline    : state => state.site_tagline,
    site_description: state => state.site_description,
    title_separator : state => state.title_separator,
    is_global       : state => state.is_global,
    default_country : state => state.default_country,
    desktop_logo    : state => state.desktop_logo,
    mobile_logo     : state => state.mobile_logo,
    favicon         : state => state.favicon,
    site_email      : state => state.site_email,
    site_phone      : state => state.site_phone,
    site_address    : state => state.site_address,
    is_rtl          : state => state.is_rtl,
    authentication  : state => state.authentication,
    currency        : state => state.currency,
    seo             : state => state.seo,
    refunds         : state => state.refunds,
    analytics       : state => state.analytics,
    checkout        : state => state.checkout
}

// mutations
export const mutations = {

    // Set settings
    SET_SETTINGS(state, { languages, general, pages, footer, authentication, recaptcha, currency, seo, refunds, analytics, checkout }) {

        // Set available languages
        state.languages.ar     = languages.is_arabic
        state.languages.en     = languages.is_english
        state.languages.fr     = languages.is_french
        state.languages.es     = languages.is_spanish
        state.languages.ru     = languages.is_russian
        state.languages.cn     = languages.is_chinese
        state.languages.hi     = languages.is_hindi
        state.languages.pt     = languages.is_portuguese
        state.languages.jp     = languages.is_japanese
        state.languages.tr     = languages.is_turkish
        state.languages.ua     = languages.is_ukrainian
        state.languages.po     = languages.is_polish
        state.languages.ro     = languages.is_romanian
        state.languages.nl     = languages.is_dutch
        state.languages.th     = languages.is_thai
        state.languages.hu     = languages.is_hungarian
        state.languages.az     = languages.is_azerbaijani
        state.languages.de     = languages.is_german

        // Set general settings
        state.default_language = general.default_language
        state.site_title       = general.site_title
        state.site_tagline     = general.site_tagline
        state.site_description = general.site_description
        state.title_separator  = general.title_separator
        state.is_global        = general.is_global
        state.default_country  = general.default_country
        state.desktop_logo     = general.desktop_logo
        state.mobile_logo      = general.mobile_logo
        state.favicon          = general.favicon
        state.site_email       = general.site_email
        state.site_phone       = general.site_phone
        state.site_address     = general.site_address
        state.is_rtl           = general.is_rtl

        // Set pages
        state.pages            = pages

        // Set footer settings
        state.footer           = footer

        // Set authentication settings
        state.authentication   = authentication

        // Set recaptcha settings
        state.recaptcha        = recaptcha

        // Set default currency
        state.currency         = currency

        // Set default seo
        state.seo              = seo

        // Set refunds settings
        state.refunds          = refunds

        // Set analytics settings
        state.analytics        = analytics

        // Set checkout settings
        state.checkout         = checkout

    },

    // Set RTL
    SET_RTL(state, value) {
        state.is_rtl = value
    }

}

// actions
export const actions = {

    // Fetch settings
    async fetch({ commit }) {

        // Send request
        let response = await this.$axios.post('fetch/configuration')
        
        // Set settings
        commit('SET_SETTINGS', { 
            languages     : response.data.languages,
            general       : response.data.general,
            footer        : response.data.footer,
            pages         : response.data.pages,
            authentication: response.data.authentication,
            recaptcha     : response.data.recaptcha,
            currency      : response.data.currency,
            seo           : response.data.seo,
            refunds       : response.data.refunds,
            analytics     : response.data.analytics,
            checkout      : response.data.checkout,
        })
        
    }

}