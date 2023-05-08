export const state = () => ({
    orders   : 0,
    messages : 0,
    customers: 0,
    refunds  : 0,
    reviews  : 0,
    isLoaded : false
})

export const getters = {
    orders   : state => state.orders,
    messages : state => state.messages,
    customers: state => state.customers,
    refunds  : state => state.refunds,
    reviews  : state => state.reviews,
    isLoaded : state => state.isLoaded
}

export const mutations = {

    // Set notifications
    SET_NOTIFICATIONS(state, data) {
        state.orders    = Number(data.orders[0].meta.total),
        state.messages  = Number(data.messages[0].meta.total),
        state.customers = Number(data.customers[0].meta.total),
        state.refunds   = Number(data.refunds[0].meta.total),
        state.reviews   = Number(data.reviews[0].meta.total),
        state.isLoaded  = true
    }

}

export const actions = {

    // Count notifications
    async count({ commit }) {

        await this
                .$axios
                .post('dashboard/notifications')
                .then(response => {
                    
                    // Set notifications
                    commit('SET_NOTIFICATIONS', response.data)

                })
                .catch(error => {
                    console.log(error)
                })
        
    }

}