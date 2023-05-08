
export const state = () => ({

    itemsInCart: []
})

export const getters   = {
    itemsInCart: state => state.itemsInCart
}

export const mutations = {
    
    // Add product to list
    ADD_TO_CART(state, data) {

        // Set items in cart
        state.itemsInCart = data

    },


    // Get product in cart
    SET_ITEMS_IN_CART(state, { product, sessions }) {

        for (let index = 0; index < sessions.length; index++) {

            const item = sessions[index];

            if (item.productId === product.pid) {

                let element = {
                    product  : product,
                    productId: item.productId,
                    quantity : item.quantity,
                    price    : item.price,
                    total    : item.total,
                    variants : item.variants
                }

                state.itemsInCart.push(element)

                break;

            }

        }
    },


    // Delete product from cart
    DELETE_FROM_CART(state, product) {

        // Find the product in cart
        const itemExists = state.itemsInCart.find(item => {
            return item.productId === product
        })

        // Check if product exists
        if (itemExists) {

            // Get index of product in cart
            const index = state.itemsInCart.indexOf(itemExists)

            // Delete from cart
            state.itemsInCart.splice(index, 1)

        }

    },

    // Increment product quantity
    INCREMENT_QUANTITY(state, index) {

        Number(state.itemsInCart[index].quantity++)
        state.itemsInCart[index].total = Number(state.itemsInCart[index].quantity) * Number(state.itemsInCart[index].price)

    },

    // Decrement product quantity
    DECREMENT_QUANTITY(state, index) {

        if (Number(state.itemsInCart[index].quantity) === 1) {
            state.itemsInCart[index].quantity = 1
            state.itemsInCart[index].total    = Number(state.itemsInCart[index].price)
        } else {
            Number(state.itemsInCart[index].quantity--)
            state.itemsInCart[index].total = Number(state.itemsInCart[index].quantity) * Number(state.itemsInCart[index].price)
        }

    },

    // Update item quantity
    UPDATE_ITEM_QUANTITY(state, { item, value }) {

        // Find the product in cart
        let itemExists = state.itemsInCart.find(p => {
            return p.productId === item.productId
        })

        // Check if product exists
        if (itemExists) {

            // Check if value is positive number
            if (value >= 1) {
                itemExists.quantity = Number(value)
                itemExists.total    = Number(value) * Number(itemExists.price)
            } else {
                itemExists.quantity = 1
                itemExists.total    = Number(itemExists.price)
            }

        }

    },


    // Clear cart
    CLEAR_CART(state) {
        state.itemsInCart = []
    }

}

export const actions = {
    
    // Add product to cart
    async addToCart({ commit }, item) {
        await this.$axios
            .post(`cart/options/add`, {
                productId: item.productId,
                quantity : item.quantity,
                variants : item.variants
            }, {withCredentials: true})
            .then(response => {
                
                // Add item to cart
                commit('ADD_TO_CART', response.data)

            })
            .catch(error => {
                console.log(error)
            })
    },


    // Get products in cart
    async getItemsInCart({ commit }) {
        await this.$axios
            .get(`cart/options/get`, {withCredentials: true})
            .then(response => {

                // Set products
                const products = response.data.products

                if (Array.isArray(products)) {

                    // Set items in cart
                    const sessions = response.data.itemsInCart

                    // Loop through products
                    for (let index = 0; index < products.length; index++) {

                        const product = products[index];

                        commit('SET_ITEMS_IN_CART', { product, sessions })


                    }

                }

            })
            .catch(error => {
                console.log(error)
            })
    },

    // Delete item from cart
    async deleteItemFromCart({ commit }, product) {

        await this.$axios
            .post(`cart/options/delete`, { productId: product }, {withCredentials: true})
            .then(response => {

                commit('DELETE_FROM_CART', product)

            })
            .catch(error => {
                console.log(error)
            })

    },

    // Update item in cart
    async updateItemInCart({ commit }, item) {

        await this.$axios
            .post(`cart/options/add`, {
                productId: item.productId, quantity: item.quantity, variants: item.variants
            }, {withCredentials: true})
            .then(response => {

                // Add item to cart
                commit('ADD_TO_CART', response.data)

            })
            .catch(error => {
                console.log(error)
            })

    },

    // Increment product quantity
    async IncrementQuantity({ commit, state }, index) {

        await this.$axios
        .post('cart/options/quantity/increment', { productId: state.itemsInCart[index].productId }, {withCredentials: true})
        .then(response => {

            // Update quantity
            commit('INCREMENT_QUANTITY', index)

        })
        .catch(error => {
            console.log(error)
        })

    },

    // decrement product quantity
    async decrementQuantity({ commit, state }, index) {

        await this.$axios
        .post('cart/options/quantity/decrement', { productId: state.itemsInCart[index].productId }, {withCredentials: true})
        .then(response => {

            // Update quantity
            commit('DECREMENT_QUANTITY', index)

        })
        .catch(error => {
            console.log(error)
        })

    },

    // Update product quantity
    async updateQuantity({ commit, state }, { item, value }) {

        await this.$axios
        .post('cart/options/quantity/update', { productId: item.productId, quantity: value }, {withCredentials: true})
        .then(response => {

            // Update quantity
            commit('UPDATE_ITEM_QUANTITY', { item, value })

        })
        .catch(error => {
            console.log(error)
        })

    }

}