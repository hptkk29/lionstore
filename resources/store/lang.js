import Cookies from 'js-cookie'

// state
export const state = () => ({
    locale: 'en',
    locales: {
        'ar': 'AR',
        'cn': 'CN',
        'de': 'DE',
        'en': 'EN',
        'es': 'ES',
        'fr': 'FR',
        'hi': 'HI',
        'hu': 'HU',
        'jp': 'JP',
        'nl': 'NL',
        'po': 'PO',
        'pt': 'PT',
        'ro': 'RO',
        'ru': 'RU',
        'th': 'TH',
        'tr': 'TR',
        'ua': 'UA'
    }
})

// getters
export const getters = {
    locale: state => state.locale,
    locales: state => state.locales
}

// mutations
export const mutations = {
    SET_LOCALE(state, { locale }) {
        state.locale = locale
    }
}

// actions
export const actions = {
    setLocale({ commit }, { locale }) {
        commit('SET_LOCALE', { locale })

        Cookies.set('locale', locale, { expires: 365 })
    }
}