<template>
    <v-navigation-drawer v-model="drawer" app bottom temporary :right="!$vuetify.rtl" :width="380">
        <v-card flat tile v-if="cartHasProducts" color="transparent">

            <!-- Header -->
            <v-list class="basket-menu">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="pt-1 font-weight-light fs-14" v-t="'t_shopping_cart'"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <span class="fs-18 font-weight-light" v-text="cartTotalPrice"></span>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <!-- Products -->
            <v-list dense>

                <template v-for="(product, index) in products">
                    <v-list-item :key="index" class="mb-4">
                        <v-list-item-avatar rounded :size="45">
                            <img :src="thumbnail(product.product)" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="pb-1" v-text="title(product.product)"></v-list-item-title>
                            <v-list-item-subtitle class="fs-12 font-weight-regular pt-2" v-text="`${ product.quantity } × ${ price(product) }`"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn fab small depressed>
                                <v-icon :size="20" @click="deleteItemFromCart(product.productId)">mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </template>

            </v-list>

            <!-- Checkout -->
            <v-card-actions class="px-4 py-6">
                <v-btn rounded block depressed dark nuxt to="/checkout/cart" color="indigo accent-3" @click="basket = false">
                    <span class="fs-11 fw-600" v-t="'t_checkout'"></span>
                </v-btn>
            </v-card-actions>

        </v-card>

        <!-- Empty cart -->
        <v-card flat tile color="transparent" class="py-12 px-10" v-else>
            <div class="empty-cart">
                <img src="/images/default/empty-cart.svg" />
                <p v-t="'t_cart_empty'"></p>
                <span v-t="'t_looks_like_no_item_added'"></span>
                <v-btn block depressed rounded dark color="indigo accent-3" class="mt-7" @click="goToHome()">
                    <span class="ff-open fs-11 font-weight-bold white--text" v-t="'t_continue_shopping'"></span>
                </v-btn>
            </div>
        </v-card>

    </v-navigation-drawer>
</template>

<script>
import fromEntries from 'object.fromentries'

    export default {

        data() {
            return {
                drawer: false
            }
        },
        
        computed: {
            
            // Get products
            products() {
                return this.$store.state.cart.itemsInCart
            },

            // Check if cart empty
            cartHasProducts() {
                return this.$store.state.cart.itemsInCart.length
            },

            // Get total cart price
            cartTotalPrice() {

                // Count total price
                var total    = 0

                for (let index = 0; index < this.$store.state.cart.itemsInCart.length; index++) {

                    const element = this.$store.state.cart.itemsInCart[index];

                    total = total + (this.price(element, true) * element.quantity)
                    
                }

                return this.$formatMoney(total)

            }

        },

        methods: {

            // Product title
            title(product) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]
            },
            
            // Product thumbnail
            thumbnail(product) {
                
                // Check if product has a thumbnail
                if (product.thumbnail) {
                    
                    // Return thumbnail
                    return this.$clientIndex(`uploads/${ product.thumbnail.file_folder }/${ product.thumbnail.uid }.webp`)

                } else {

                    // Product has no thumbnail
                    // Return default image
                    if (this.$vuetify.theme.dark) {
                        return this.$clientIndex('images/default/thumbnail-dark.svg')
                    } else {
                        return this.$clientIndex('images/default/thumbnail.svg')
                    }

                }

            },

            // Price
            price(item, unformatted = false) {

                // Get product attributes
                var attributes = this.attributes(item)

                // Check if product has variants
                if (Array.isArray(item.variants) && Array.isArray(item.product.variants)) {
                    
                    // Check if selected form variants length = product variants length
                    if (item.variants.length > 0 && item.product.variants.length > 0 && (item.variants.length === item.product.variants.length)) {

                        // Set current values
                        var values = []

                        // Loop through form variants
                        for (let v = 0; v < item.variants.length; v++) {

                            const element = item.variants[v];

                            // Add form value to list
                            values.push(element.variant_value)
                            
                        }

                        for (let a = 0; a < attributes.length; a++) {
                            const attribute = attributes[a];
                            
                            if (attribute.value.every(v => values.includes(v))) {

                                // Check if request unformatted price
                                if (unformatted) {
                                    return attribute.price[0]
                                }

                                // We found the value return price
                                return this.$formatMoney(attribute.price[0])

                                break

                            }
                            
                        }


                    }else{

                        // Check if product has discount
                        if (item.product.discount_type && item.product.discount_value) {
                            // Money discount
                            if (item.product.discount_type === 'money') {
                                
                                // Calculate total price 
                                const total  = Number(item.product.price) - Number(item.product.discount_value)

                                if (unformatted) {
                                    return total
                                }

                                return this.$formatMoney(total)

                            } else if (item.product.discount_type === 'percentage') {

                                // Calculate total price 
                                const total  = Number(item.product.price) - Number( Number(item.product.price) * Number(item.product.discount_value) / 100 )

                                if (unformatted) {
                                    return total
                                }

                                return this.$formatMoney(total)

                            }

                        }
                        
                        // Check if request unformatted price
                        if (unformatted) {
                            return item.product.price
                        }

                        // Return currency 
                        return this.$formatMoney(item.product.price)

                    }

                } else {

                    // Check if product has discount
                    if (item.product.discount_type && item.product.discount_value) {
                        // Money discount
                        if (item.product.discount_type === 'money') {
                            
                            // Calculate total price 
                            const total  = Number(item.product.price) - Number(item.product.discount_value)

                            if (unformatted) {
                                return total
                            }

                            return this.$formatMoney(total)

                        } else if (item.product.discount_type === 'percentage') {

                            // Calculate total price 
                            const total  = Number(item.product.price) - Number( Number(item.product.price) * Number(item.product.discount_value) / 100 )

                            if (unformatted) {
                                return total
                            }

                            return this.$formatMoney(total)

                        }

                    }

                    // Check if request unformatted price
                    if (unformatted) {
                        return item.product.price
                    }

                    // Return currency format
                    return this.$formatMoney(item.product.price)

                }
            },

            // Get product attributes
            attributes(product) {
                
                // Set an empty array
                var attributes          = []
            
                // Set empty array for variants attributes
                var variants_attributes = []
                        
                // Loop through product variants attributes
                for (let a = 0; a < product.product.variants_attributes.length; a++) {

                    const element = product.product.variants_attributes[a];
                    
                    const item    = Object.entries(JSON.parse(element.attributes))
                    
                    variants_attributes.push(fromEntries(item))
                    
                }

                // Set an empty array
                var list                 = []

                // Loop through variants attributes array
                for (let b = 0; b < variants_attributes.length; b++) {
                    const element = variants_attributes[b];

                    let t         = Object.assign({}, element)

                    let s         = Object.values(t)

                    let result    = {}

                    s.forEach(item => {
                        Object.keys(item).forEach(key => {
                            if (!result[key]) {
                                result[key] = [];
                            }
                            result[key].push(item[key]);
                        })
                    })

                    list.push(result)
                    
                }

                // Add attributes group
                for (let c = 0; c < list.length; c++) {

                    const element = list[c];

                    attributes.push(element)
                    
                }

                // Return attributes
                return attributes

            },

            // Delete item from cart
            async deleteItemFromCart(product) {

                await this.$store.dispatch('cart/deleteItemFromCart', product)

            },

            // Go to home page
            goToHome() {
                this.$router.push('/')
                this.basket = false
            }

        },

        created() {
            this.$nuxt.$on('open_shopping_cart', () => {
                this.drawer = !this.drawer
            })
        }

    }
</script>