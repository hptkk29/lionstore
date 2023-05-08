<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row>

            <!-- Main details -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_main_details')"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="py-8 px-8">
                        
                        <!-- Order number -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_order_number'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.order_number"></div>
                        </div>

                        <!-- Order status -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_order_status'"></span>
                            </v-col>

                            <!-- New -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#ffa51f" v-t="'t_new_order'" v-if="order.order_status === 'new'"></div>

                            <!-- Confirmed -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#7467ff" v-t="'t_confirmed'" v-if="order.order_status === 'confirmed'"></div>

                            <!-- Shipped -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#5faeff" v-t="'t_shipped'" v-if="order.order_status === 'shipped'"></div>

                            <!-- Delivered -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#1dc790" v-t="'t_delivered'" v-if="order.order_status === 'delivered'"></div>

                            <!-- Canceled -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#c3c3c3" v-t="'t_canceled'" v-if="order.order_status === 'canceled'"></div>

                            <!-- Refunded -->
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#ff7b7b" v-t="'t_refunded'" v-if="order.order_status === 'refunded'"></div>

                        </div>

                        <!-- Cancel reason -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.cancel_reason">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_cancel_reason'"></span>
                            </v-col>
                            <div class=" fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.cancel_reason"></div>
                        </div>

                        <!-- Order source -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_order_source'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-t="'t_mobile'" v-if="order.order_source_name === 'mobile'"></div>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-t="'t_desktop'" v-else></div>
                        </div>

                        <!-- Order placed at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.placed_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_placed'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.placed_at)"></div>
                        </div>

                        <!-- Order processed at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.processed_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_processed_at'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.processed_at)"></div>
                        </div>

                        <!-- Order shipped at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.shipped_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_shipped_at'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.shipped_at)"></div>
                        </div>

                        <!-- Order canceled at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.cancelled_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_canceled_at'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.cancelled_at)"></div>
                        </div>

                        <!-- Order delivered at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.delivered_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_delivered_at'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.delivered_at)"></div>
                        </div>

                        <!-- Order refunded at -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.refunded_at">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_refunded_at'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$ago(order.refunded_at)"></div>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Invoice -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_invoice')"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="py-8 px-8">
                        
                        <!-- Invoice status -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_invoice_status'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#ffbb3e" v-if="order.invoice && order.invoice.invoice_status === 'pending'" v-t="'t_pending'"></div>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" style="color:#1bba87" v-else-if="order.invoice && order.invoice.invoice_status === 'paid'" v-t="'t_paid'"></div>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-else v-t="'t_not_found'"></div>
                        </div>

                        <!-- Order subtotal amount -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_subtotal_amount'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(order.subtotal_price, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                        </div>

                        <!-- Order shipping cost -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_shipping_cost'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(order.shipping_cost, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                        </div>

                        <!-- Order taxes cost -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_taxes_cost'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(order.taxes_cost, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                        </div>

                        <!-- Order discount -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_discount'"></span>
                            </v-col>
                            <div class=" col fs-13 error--text" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="`- ${ $formatMoney(discount(), order.payment.payment_currency_locale, order.payment.payment_currency) }`"></div>
                        </div>

                        <!-- Order total amount -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_total_amount'"></span>
                            </v-col>
                            <div class=" col fs-13 font-weight-medium" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(order.total_price, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                        </div>

                        <!-- Coupon code -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="order.discount_code">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_coupon_code'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.discount_code"></div>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Shipping address -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_shipping_address')"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="py-8 px-8">
                        
                        <!-- Fullname -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_name">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_fullname'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.name"></div>
                        </div>

                        <!-- Phone -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_phone">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_phone'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.phone"></div>
                        </div>

                        <!-- Country -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.is_global && order.address.country">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_country'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.country.name"></div>
                        </div>

                        <!-- State -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_state">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_state'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.state"></div>
                        </div>

                        <!-- City -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_city">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_city'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.city"></div>
                        </div>

                        <!-- Postal code -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_zipcode">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_postal_code'"></span>
                            </v-col>
                            <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.zipcode"></div>
                        </div>

                        <!-- Address -->
                        <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_address">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-regular fs-13" v-t="'t_address'"></span>
                            </v-col>
                            <div class="" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="order.address.address"></div>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>

        <!-- Products -->
        <v-row>

            <v-col cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4" style="border-bottom: unset !important;">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_order_products')"></v-toolbar-title>
                    </v-toolbar>
                </v-card>
            </v-col>

            <template v-for="(product, index) in order.products">
                <v-col md="6" cols="12" :key="`orders-products-${ index }`">

                    

                    <v-card class="c-card mb-4" :href="$clientIndex(`product/${ product.product.handler }`)" target="_blank">
                        <div class="d-flex flex-no-wrap">

                            <v-avatar class="ma-4" size="125" style="border-radius:20px">
                                <v-img :src="thumbnail(product.product)"></v-img>
                            </v-avatar>

                            <div class="fill-width">

                                <v-card-title class="fs-16 font-weight-regular mb-2" v-text="title(product.product)"></v-card-title>

                                <v-card-subtitle>
                                    <!-- Quantity -->
                                    <div class="row spacer no-gutters align-center mb-2">
                                        <v-col cols="5" class="text-no-wrap">
                                            <span class="font-weight-regular fs-13" v-t="'t_quantity'"></span>
                                        </v-col>
                                        <div class="font-weight-medium  col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="product.quantity"></div>
                                    </div>

                                    <!-- Single price -->
                                    <div class="row spacer no-gutters align-center mb-2">
                                        <v-col cols="5" class="text-no-wrap">
                                            <span class="font-weight-regular fs-13" v-t="'t_price_per_item'"></span>
                                        </v-col>
                                        <div class="font-weight-medium  col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(product.single_price, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                                    </div>

                                    <!-- total price -->
                                    <div class="row spacer no-gutters align-center mb-2">
                                        <v-col cols="5" class="text-no-wrap">
                                            <span class="font-weight-regular fs-13" v-t="'t_total_amount'"></span>
                                        </v-col>
                                        <div class="font-weight-medium  col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(product.total_price, order.payment.payment_currency_locale, order.payment.payment_currency)"></div>
                                    </div>
                                </v-card-subtitle>

                            </div>

                        </div>

                        <v-divider class="mb-4" v-if="Array.isArray(productVariants(order, product)) && productVariants(order, product).length > 0" />

                        <div class="px-6 pb-4" v-if="Array.isArray(productVariants(order, product)) && productVariants(order, product).length > 0">
                            <template v-for="(variant, index) in productVariants(order, product)">
                                <!-- Color variant -->
                                <span class="fs-13 font-weight-regular" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'" :key="index" v-if="variant.variant_type === 'color'">
                                    {{ variant.variant_name }}
                                    <v-btn fab depressed :ripple="false" :height="13" :width="13" :color="variant.variant_value"></v-btn>
                                </span>

                                <!-- Radio variant -->
                                <span class="fs-13 font-weight-regular" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'" :key="index" v-else>{{ variant.variant_name }} <strong :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="variant.variant_value"></strong></span>
                            </template>
                        </div>

                    </v-card>
                    
                </v-col>
            </template>

        </v-row>

    </v-container>
</template>

<script>
export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, params }) {
			// Send request to server
            let response = await $axios.post('dashboard/orders/options/details', { id: params.id })

			return {
                order: response.data
            }
        },

        data() {
            return {
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_order_details')
			}
		},

        methods: {

            // Get order discount
            discount() {

                // Check if customer has a valid coupon code
                if (this.order.discount_code && this.order.discount_value && this.order.discount_type) {
                    
                    // Check type of this promotion code
                    if (this.order.discount_type === 'money') {
                        
                        // Return how much money will be discount from total
                        return Number(this.order.discount_value)

                    }

                    // Check if type of promotion is a percentage of total price
                    if (this.order.discount_type === 'percentage') {
                        
                        // Get total price
                        const total  = Number(this.order.subtotal_price) + Number(this.order.shipping_cost) + Number(this.order.taxes_cost)

                        // Get percentage of total
                        const result = total * Number(this.order.discount_value) / 100

                        // Now return discount value
                        return Number(result)

                    }

                    // Not a valid promotion code
                    return 0

                } else {

                    // Customer does not have any coupon
                    return 0

                }

            },

            // Get product thumbnail
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

            // Product title
            title(product) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]
            },

            // Get product variant
            productVariants(order, product) {

                // Check if order has variants
                if (order.variants && Array.isArray(order.variants)) {

                    // Find product variants
                    const variants = order.variants.find(item => {
                        return item.product_id === product.product_id
                    })
                    
                    // Check if variants exists
                    if (variants) {
                        return JSON.parse(variants.variants)
                    }

                }

            },

        }

}
</script>