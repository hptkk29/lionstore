import Cookies from 'js-cookie'

export const state = () => ({

    address: {
        uid       : '',
        name      : '',
        country_id: '',
        state     : '',
        city      : '',
        zipcode   : '',
        phone     : '',
        address   : ''
    }
})

export const getters = {
    address: state => state.address
}

export const mutations = {

    // Set shipping address
    SET_ADDRESS(state, data) {

        // Set address
        state.address.uid        = data.uid,
        state.address.name       = data.name,
        state.address.country_id = data.country_id,
        state.address.state      = data.state,
        state.address.city       = data.city,
        state.address.zipcode    = data.zipcode,
        state.address.phone      = data.phone,
        state.address.address    = data.address

    },

    // Clear saved address
    CLEAR_ADDRESS(state) {

        // Set cookie options
        const options = {
            expires: 7,
            path   : '/'
        }

        // Delete cookies
        Cookies.remove('order_address_uid', options)
        Cookies.remove('order_address_name', options)
        Cookies.remove('order_address_country_id', options)
        Cookies.remove('order_address_state', options)
        Cookies.remove('order_address_city', options)
        Cookies.remove('order_address_zipcode', options)
        Cookies.remove('order_address_phone', options)
        Cookies.remove('order_address_address', options)

    }

}

export const actions = {

    // Set new address
    async setAddress({ commit }, address) {

        // Set cookie options
        const options = {
            expires: 7,
            path   : '/'
        }

        // Set address in cookies
        Cookies.set('order_address_uid', address.uid , options)
        Cookies.set('order_address_name', address.name , options)
        Cookies.set('order_address_country_id', address.country_id , options)
        Cookies.set('order_address_state', address.state , options)
        Cookies.set('order_address_city', address.city , options)
        Cookies.set('order_address_zipcode', address.zipcode , options)
        Cookies.set('order_address_phone', address.phone , options)
        Cookies.set('order_address_address', address.address , options)

        commit('SET_ADDRESS', address)
    }

}