export const state = () => ({

    products        : [],
    orderNumber     : null,
    success         : null,
    total           : null,
    subtotal        : null,
    shipping        : null,
    tax             : null,
    email           : null,
    coupon_code     : null,
    coupon_type     : null,
    coupon_value    : null,
    date            : null,
    payment         : null,
    address_name    : null,
    address_phone   : null,
    address_city    : null,
    address_zip_code: null,
    address_content : null

})

export const getters = {
    success         : state => state.success,
    products        : state => state.products,
    orderNumber     : state => state.orderNumber,
    success         : state => state.success,
    total           : state => state.total,
    subtotal        : state => state.subtotal,
    shipping        : state => state.shipping,
    tax             : state => state.tax,
    email           : state => state.email,
    coupon_code     : state => state.coupon_code,
    coupon_type     : state => state.coupon_type,
    coupon_value    : state => state.coupon_value,
    date            : state => state.date,
    payment         : state => state.payment,
    address_name    : state => state.address_name,
    address_phone   : state => state.address_phone,
    address_city    : state => state.address_city,
    address_zip_code: state => state.address_zip_code,
    address_content : state => state.address_content
}

export const mutations = {

    // Set order details
    SET_ORDER(state, data) {

        state.products         = data.products
        state.orderNumber      = data.order
        state.success          = data.success
        state.total            = data.total
        state.subtotal         = data.subtotal
        state.shipping         = data.shipping
        state.tax              = data.tax
        state.email            = data.email
        state.coupon_code      = data.coupon_code
        state.coupon_type      = data.coupon_type
        state.coupon_value     = data.coupon_value
        state.date             = data.date
        state.payment          = data.payment
        state.address_name     = data.address_name
        state.address_phone    = data.address_phone
        state.address_city     = data.address_city
        state.address_zip_code = data.address_zip_code
        state.address_content  = data.address_content
        
    }

}

export const actions = {

    // Set order details
    async setOrder({ commit }, order) {
        commit('SET_ORDER', order)
    }

}