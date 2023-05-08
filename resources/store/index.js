import Cookies from 'js-cookie'

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req, $config }) {
        
        // Set locale
        if (this.$cookies.get('locale')) {
            commit('lang/SET_LOCALE', { locale: this.$cookies.get('locale') })
        } else {

            // After load default language set it
            commit('lang/SET_LOCALE', { locale: 'en' })

        }

        // Fetch dashboard settings
        await dispatch('settings/fetch')

        // Get items in cart
        await dispatch('cart/getItemsInCart')

    },

    async nuxtClientInit({ commit }) {

        // Locale
        const locale = Cookies.get('locale')
        if (locale) {
            commit('lang/SET_LOCALE', { locale })
        }
    }
}