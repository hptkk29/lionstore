<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <!-- Coupon dialog -->
        <v-dialog v-model="dialogs.coupon" persistent :max-width="400">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_i_have_promo_code'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.coupon = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Coupon not found -->
                        <v-col cols="12" class="pb-0" v-if="notifications.notFound">
                            <v-alert text dense color="error" icon="mdi-alert-octagon" :border="$vuetify.rtl ? 'right' : 'left'">
                                <span class="fs-12 font-weight-medium">{{ $t('t_coupon_not_found') }}</span>
                            </v-alert>
                        </v-col>

                        <!-- Coupon not yet started -->
                        <v-col cols="12" class="pb-0" v-if="notifications.notStarted">
                            <v-alert text dense color="error" icon="mdi-clock-alert" :border="$vuetify.rtl ? 'right' : 'left'">
                                <span class="fs-12 font-weight-medium">{{ $t('t_coupon_not_yet_started') }}</span>
                            </v-alert>
                        </v-col>

                        <!-- Coupon expired -->
                        <v-col cols="12" class="pb-0" v-if="notifications.expired">
                            <v-alert text dense color="error" icon="mdi-clock-time-two" :border="$vuetify.rtl ? 'right' : 'left'">
                                <span class="fs-12 font-weight-medium">{{ $t('t_coupon_has_expired') }}</span>
                            </v-alert>
                        </v-col>

                        <!-- Coupon exceeded -->
                        <v-col cols="12" class="pb-0" v-if="notifications.exceeded">
                            <v-alert text dense color="error" icon="mdi-alarm-light" :border="$vuetify.rtl ? 'right' : 'left'">
                                <span class="fs-12 font-weight-medium">{{ $t('t_coupon_exceeded_limit') }}</span>
                            </v-alert>
                        </v-col>

                        <!-- Coupon code -->
                        <v-col cols="12">
                            <v-text-field dense outlined hide-details
                                v-model="form.coupon"
                                :placeholder="$t('t_enter_coupon_code')"
                                append-icon="mdi-sale"
                                color="indigo accent-3" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="coupon()" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-t="'t_apply'"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="3"
                                        :size="10"
                                        color="#6c6c6c"
                                        indeterminate />
                                </template>
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-row justify="center" align="center" class="checkout-page">
            <v-col :cols="$device.isMobileOrTablet ? 12 : 8">

                <!-- Steps process -->
                <v-stepper alt-labels class="c-card mb-6" v-if="products.length > 0">
                    <v-stepper-header>

                        <!-- My cart -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-3' : 'blue lighten-5'">
                                <v-icon :size="18" color="indigo accent-3">mdi-cart</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium indigo--text text--accent-3" v-t="'t_my_cart'"></div>
                        </div>

                        <v-divider></v-divider>

                        <!-- My account -->
                        <div v-if="!$auth.loggedIn" class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-4'">
                                <v-icon :size="18" :color="$vuetify.theme.dark ? 'white': 'grey'">mdi-account</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'white--text' : 'grey--text'" v-t="'t_my_account'"></div>
                        </div>

                        <v-divider v-if="!$auth.loggedIn"></v-divider>

                        <!-- Shipping info -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-4'">
                                <v-icon :size="18" :color="$vuetify.theme.dark ? 'white': 'grey'">mdi-truck-fast</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'white--text' : 'grey--text'" v-t="'t_shipping_info'"></div>
                        </div>

                        <v-divider></v-divider>

                        <!-- Payment -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-4'">
                                <v-icon :size="18" :color="$vuetify.theme.dark ? 'white': 'grey'">mdi-credit-card</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'white--text' : 'grey--text'" v-t="'t_payment'"></div>
                        </div>

                        <v-divider></v-divider>

                        <!-- Finish -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-2' : 'grey lighten-4'">
                                <v-icon :size="18" :color="$vuetify.theme.dark ? 'white': 'grey'">mdi-check-underline</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'white--text' : 'grey--text'" v-t="'t_finish'"></div>
                        </div>

                    </v-stepper-header>
                </v-stepper>

                <!-- Content -->
                <div v-if="products.length > 0">
                    
                    <!-- Mobile devices -->
                    <div v-if="$device.isMobileOrTablet">
                        <template v-for="(product, index) in products">
                            <v-card :key="index" class="checkout-products-list pa-4 mb-4 c-card">
                                <v-row class="ma-0">

                                    <!-- Product -->
                                    <v-col cols="12" class="py-0">
                                        <v-list two-line dense class="py-0">
                                            <v-list-item class="pa-0">
                                                <v-list-item-avatar rounded class="my-0">
                                                    <nuxt-link :to="`/product/${product.product.handler}`" class="checkout-product-img-wrap fill-height d-inline-block">
                                                        <v-img :height="50" :width="50" :src="thumbnail(product.product)" />
                                                    </nuxt-link>
                                                </v-list-item-avatar>

                                                <v-list-item-content>

                                                    <!-- Title -->
                                                    <v-list-item-title>
                                                        <nuxt-link :to="`/product/${product.product.handler}`" class="checkout-product-info-title" v-text="title(product.product)"></nuxt-link>
                                                    </v-list-item-title>

                                                    <!-- Variants -->
                                                    <v-list-item-subtitle v-if="Array.isArray(product.variants)">
                                                        <template v-for="(variant, index) in product.variants">
                                                            <!-- Color variant -->
                                                            <span class="fs-9 font-weight-medium grey--text" :class="$vuetify.rtl ? ' ml-2' : ' mr-2'" v-if="variant.variant_type === 'color'" :key="index">{{ variant.variant_name }}
                                                                <v-btn fab depressed :ripple="false" :height="13" :width="13" :color="variant.variant_value"></v-btn>
                                                            </span>

                                                            <!-- Radio variant -->
                                                            <span class="fs-9 font-weight-medium grey--text" :class="$vuetify.rtl ? ' ml-2' : ' mr-2'" v-else :key="index">{{ variant.variant_name }} <strong :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="variant.variant_value"></strong></span>
                                                        </template>
                                                    </v-list-item-subtitle>

                                                </v-list-item-content>

                                                <v-list-item-action>
                                                    <v-btn dark depressed text icon color="red accent-3" @click="deleteItemFromCart(product.productId)" class="mx-auto">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>

                                    <v-col cols="12"><v-divider /></v-col>

                                    <!-- Price -->
                                    <v-col cols="12" class="pt-0 d-flex">
                                        <!-- Price per item -->
                                        <div class="d-inline-block text-center" :class="$vuetify.rtl ? 'pl-4' : 'pr-4'">
                                            <span v-text="price(product)" class="d-block fs-12 font-weight-medium pb-2 mt-2"></span>
                                            <span v-t="'t_price_per_item'" class="grey--text fs-11 text-uppercase d-block"></span>
                                        </div>

                                        <!-- Order Quantity -->
                                        <div class="product-quantity mt-2 mb-1 mx-auto clearfix d-inline-block">
                                            <span class="next-number-picker next-number-picker-inline next-medium zoro-ui-number-picker number-picker product-number-picker mx-0"><span class="next-input-group"><span class="next-input-group-addon next-before">

                                                <!-- Decrement quantity -->
                                                <button @click="decrementQuantity(index)" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-minus next-xs next-btn-icon next-icon-alone">mdi-minus</v-icon></button>

                                                </span>

                                                <!-- Product quantity -->
                                                <span class="next-input next-medium next-input-group-auto-width">
                                                    <input height="100%" autocomplete="off" :value="products[index].quantity" @change="event => updateItemQuantity(event, product)" />
                                                </span>
                                                
                                                <span class="next-input-group-addon next-after">

                                                <!-- Increment quantity -->    
                                                <button @click="incrementQuantity(index)" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-add next-xs next-btn-icon next-icon-alone">mdi-plus</v-icon></button></span></span>
                                            </span>
                                                
                                        </div>

                                        <!-- Total product price -->
                                        <div class="d-inline-block text-center" :class="$vuetify.rtl ? 'pr-4' : 'pl-4'">
                                            <span v-text="`${$formatMoney(price(product, true) * products[index].quantity)}`" class="d-block fs-12 font-weight-medium pb-2 mt-2"></span>
                                            <span v-t="'t_total_item_price'" class="grey--text fs-11 text-uppercase d-block"></span>
                                        </div>
                                    </v-col>

                                </v-row>
                            </v-card>
                        </template>
                    </div>

                    <!-- Desktop -->
                    <div v-else>
                        <template v-for="(product, index) in products">
                            <v-card :key="index" class="checkout-products-list pa-4 mb-4 c-card">
                                <v-row align="center" justify="space-between" class="ma-0">

                                    <!-- Product thumbnail -->
                                    <nuxt-link :to="`/product/${product.product.handler}`" class="checkout-product-img-wrap fill-height d-inline-block">
                                        <v-img :height="50" :width="50" :src="thumbnail(product.product)" />
                                    </nuxt-link>

                                    <!-- Product details -->
                                    <div class="checkout-product-info-main d-inline-block">

                                        <!-- Product title -->
                                        <nuxt-link :to="`/product/${product.product.handler}`" class="checkout-product-info-title" v-text="title(product.product)"></nuxt-link>

                                        <!-- Product variants -->
                                        <div class="checkout-selected-variants" v-if="Array.isArray(product.variants)">
                                            <template v-for="(variant, index) in product.variants">
                                                <!-- Color variant -->
                                                <span class="fs-9 font-weight-medium grey--text" :class="$vuetify.rtl ? ' ml-2' : ' mr-2'" v-if="variant.variant_type === 'color'" :key="index">{{ variant.variant_name }}
                                                    <v-btn fab depressed :ripple="false" :height="13" :width="13" :color="variant.variant_value"></v-btn>
                                                </span>

                                                <!-- Radio variant -->
                                                <span class="fs-9 font-weight-medium grey--text" :class="$vuetify.rtl ? ' ml-2' : ' mr-2'" v-else :key="index">{{ variant.variant_name }} <strong :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="variant.variant_value"></strong></span>
                                            </template>
                                        </div>
                                        
                                    </div>

                                    <!-- Price per item -->
                                    <div class="d-inline-block text-center" :style="$vuetify.theme.dark ? 'border-left: 1px solid #565656; ' : 'border-left: 1px solid #cccccc; '" style="padding-left: 20px;">
                                        <span v-text="price(product)" class="d-block fs-12 font-weight-medium pb-2 mt-2"></span>
                                        <span v-t="'t_price_per_item'" class="grey--text fs-11 text-uppercase d-block"></span>
                                    </div>

                                    <!-- Order Quantity -->
                                    <div class="product-quantity mt-2 mb-1 mx-auto clearfix d-inline-block">
                                        <span class="next-number-picker next-number-picker-inline next-medium zoro-ui-number-picker number-picker product-number-picker"><span class="next-input-group"><span class="next-input-group-addon next-before">

                                            <!-- Decrement quantity -->
                                            <button @click="decrementQuantity(index)" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-minus next-xs next-btn-icon next-icon-alone">mdi-minus</v-icon></button>

                                            </span>

                                            <!-- Product quantity -->
                                            <span class="next-input next-medium next-input-group-auto-width">
                                                <input height="100%" autocomplete="off" :value="products[index].quantity" @change="event => updateItemQuantity(event, product)" />
                                            </span>
                                            
                                            <span class="next-input-group-addon next-after">

                                            <!-- Increment quantity -->    
                                            <button @click="incrementQuantity(index)" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-add next-xs next-btn-icon next-icon-alone">mdi-plus</v-icon></button></span></span>
                                        </span>
                                            
                                    </div>

                                    <!-- Total product price -->
                                    <div class="d-inline-block text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #565656; ' : 'border-right: 1px solid #cccccc; '" style="padding-right: 20px;">
                                        <span v-text="`${$formatMoney(price(product, true) * products[index].quantity)}`" class="d-block fs-12 font-weight-medium pb-2 mt-2"></span>
                                        <span v-t="'t_total_item_price'" class="grey--text fs-11 text-uppercase d-block"></span>
                                    </div>

                                    <!-- Delete -->
                                    <div class="d-inline-block" :class="$vuetify.rtl ? 'mr-4 ml-2' : 'ml-4 mr-2'">
                                        <v-btn dark depressed text icon color="red accent-3" @click="deleteItemFromCart(product.productId)" class="mx-auto">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </div>

                                </v-row>
                            </v-card>
                        </template>
                    </div>

                    <!-- Count total prices -->
                    <v-row no-gutters>
                        <v-col cols="12" md="4" offset-md="8">
                            <v-card class="c-card pa-5">

                                <!-- Subtotal -->
                                <v-row align="center" justify="space-between">
                                    <v-col cols="auto" class="pb-0">
                                        <div class="font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'grey--text', $vuetify.rtl ? 'fs-13' : 'fs-17']" v-t="'t_subtotal'"></div>
                                    </v-col>
                                    <v-col cols="auto" class="pb-0">
                                        <div class="fs-14 font-weight-light" :class="$vuetify.theme.dark ? 'white--text' : 'black-text'" v-text="$formatMoney(subtotal())"></div>
                                    </v-col>
                                </v-row>

                                <!-- Shipping -->
                                <v-row align="center" justify="space-between">
                                    <v-col cols="auto" class="pb-0">
                                        <div class="font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'grey--text', $vuetify.rtl ? 'fs-13' : 'fs-17']" v-t="'t_shipping'"></div>
                                    </v-col>
                                    <v-col cols="auto" class="pb-0">
                                        <div v-if="shipping() > 0" class="fs-14 font-weight-light" :class="$vuetify.theme.dark ? 'white--text' : 'black-text'" v-text="$formatMoney(shipping())"></div>
                                        <div v-else class="fs-14 font-weight-light" :class="$vuetify.theme.dark ? 'white--text' : 'black-text'" v-t="'t_free'"></div>
                                    </v-col>
                                </v-row>

                                <!-- Tax -->
                                <v-row align="center" justify="space-between" v-if="tax() > 0">
                                    <v-col cols="auto" class="pb-0">
                                        <div class="font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'grey--text', $vuetify.rtl ? 'fs-13' : 'fs-17']" v-t="'t_tax'"></div>
                                    </v-col>
                                    <v-col cols="auto" class="pb-0">
                                        <div class="fs-14 font-weight-light" :class="$vuetify.theme.dark ? 'white--text' : 'black-text'" v-text="$formatMoney(tax())"></div>
                                    </v-col>
                                </v-row>

                                <!-- Discount -->
                                <v-row align="center" justify="space-between" v-if="discount() > 0">
                                    <v-col cols="auto" class="pb-0">
                                        <div class="font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'grey--text', $vuetify.rtl ? 'fs-13' : 'fs-17']" v-t="'t_discount'"></div>
                                    </v-col>
                                    <v-col cols="auto" class="pb-0">
                                        <div class="fs-14 font-weight-light error--text" v-text="`- ${ $formatMoney(discount()) }`"></div>
                                    </v-col>
                                </v-row>

                                <!-- I have promo code -->
                                <div class="d-block text-center mb-4 mt-4">

                                    <!-- Success -->
                                    <v-alert v-if="notifications.succeeded" text dense color="success" border="left" :class="$vuetify.rtl ? 'text-right' : 'text-left'" class="mt-8">
                                        <span class="fs-12 font-weight-medium">{{ $t('t_coupon_applied_success') }}</span>
                                    </v-alert>

                                    <!-- Delete coupon -->
                                    <div class="fs-12 font-weight-regular cursor-pointer indigo--text text--accent-3" v-if="promotion.code" @click="deleteCoupon()">
                                        <span v-text="promotion.code"></span>
                                        <v-icon :size="16" style="margin-top: -2px" color="indigo accent-3">mdi-delete</v-icon>
                                    </div>

                                    <!-- Add coupon -->
                                    <span v-else class="fs-12 font-weight-regular cursor-pointer indigo--text text--accent-3" v-t="'t_i_have_promo_code'" @click="dialogs.coupon = true"></span>

                                </div>

                                <!-- Line -->
                                <v-divider class="mb-4"></v-divider>

                                <!-- Total -->
                                <v-row align="center" justify="space-between" class="mb-6">
                                    <v-col cols="auto" class="pb-0">
                                        <div class="font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'grey--text', $vuetify.rtl ? 'fs-13' : 'fs-17']" v-t="'t_total'"></div>
                                    </v-col>
                                    <v-col cols="auto" class="pb-0">
                                        <div class="fs-14 font-weight-light" :class="$vuetify.theme.dark ? 'white--text' : 'black-text'" v-text="$formatMoney(total())"></div>
                                    </v-col>
                                </v-row>

                                <!-- Continue -->
                                <v-btn depressed block dark nuxt :to="$auth.loggedIn ? '/checkout/shipping' : '/checkout/auth'" color="indigo accent-3" class="px-12">
                                    <span v-t="'t_continue'" class="fs-11 font-weight-medium"></span>
                                </v-btn>

                            </v-card>
                        </v-col>
                    </v-row>

                </div>

                <!-- Cart is empty -->
                <v-card  class="c-card py-4 px-10" v-else>
                    <div class="empty-cart">
                        <img src="/images/default/empty-cart.svg" style="width: 200px" />
                        <p v-t="'t_cart_empty'"></p>
                        <span v-t="'t_looks_like_no_item_added'"></span>
                        <v-btn block depressed rounded dark color="indigo accent-3" class="mt-7" @click="$router.push('/')">
                            <span class="fs-11 font-weight-medium white--text" v-t="'t_continue_shopping'"></span>
                        </v-btn>
                    </div>
                </v-card>

            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import fromEntries from 'object.fromentries'

    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        data() {
            return {
                loading: false,
                form: {
                    coupon: ''
                },
                dialogs: {
                    coupon: false
                },
                notifications: {
                    notFound  : false,
                    expired   : false,
                    succeeded : false,
                    notStarted: false,
                    exceeded  : false
                },
                promotion: {
                    code : null,
                    type : null,
                    value: null
                }
            }
        },

        jsonld() {
            const items = this.breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': item.url,
                    name: item.text,
                },
            }));
            return {
                '@context'     : 'https://schema.org',
                '@type'        : 'BreadcrumbList',
                itemListElement: items,
            };
        },

        head() {
            return {

                // Title
                title: this.$t('t_my_cart'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_my_cart') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('checkout/cart') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_my_cart') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('checkout/cart') }  ]
            }
        },

        computed: {

            // List of products in cart
            products() {
                return this.$store.state.cart.itemsInCart
            },

            // JSON LD
            breadcrumbs(){
                return [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('checkout/cart'),
                        text: this.$t('t_my_cart'),
                    }
                ]
            }

        },

        methods: {

            // Get subtotal price
            subtotal() {

                // Set empty var
                var subtotal = 0

                // Loop through cart
                for (let index = 0; index < this.products.length; index++) {

                    const item = this.products[index]
                    
                    // Check if product has discount
                    if (item.product.discount_type && item.product.discount_value) {

                        // Money discount
                        if (item.product.discount_type === 'money') {
                            
                            // Calculate total price 
                            const total  = Number(item.product.price) - Number(item.product.discount_value)

                            // Calculate subtotal
                            subtotal += Number(total) * Number(item.quantity)

                        } else if (item.product.discount_type === 'percentage') {

                            // Calculate total price 
                            const total  = Number(item.product.price) - Number( Number(item.product.price) * Number(item.product.discount_value) / 100 )

                            // Calculate subtotal
                            subtotal += Number(total) * Number(item.quantity)

                        }

                    } else {

                        // Calculate subtotal
                        subtotal += Number(item.price) * Number(item.quantity)

                    }
                    
                }

                // Return subtotal
                return Number(subtotal)

            },

            // Calculate shipping price
            shipping() {

                // Set empty total variable
                var total = 0

                // Loop through product
                for (let index = 0; index < this.products.length; index++) {

                    // Get product
                    const product = this.products[index].product;

                    // Check if product has shipping price
                    if (product.shipping_cost) {
                        
                        // Add shipping cost
                        total += Number(product.shipping_cost)

                    }
                    
                }

                // Return total shipping cost
                return total

            },

            // Calculate taxes
            tax() {

                // Set empty total variable
                var total = 0

                // Loop through product
                for (let index = 0; index < this.products.length; index++) {

                    // Get product
                    const product = this.products[index].product;

                    // Check if product has tax
                    if (product.tax_value) {
                        
                        // Add tax cost
                        total += Number(product.tax_value)

                    }
                    
                }

                // Return total taxes cost
                return total

            },

            // Get cart discount
            discount() {

                // Check if customer has a valid coupon code
                if (this.promotion.code && this.promotion.value && this.promotion.type) {
                    
                    // Check type of this promotion code
                    if (this.promotion.type === 'money') {
                        
                        // Return how much money will be discount from total
                        return Number(this.promotion.value)

                    }

                    // Check if type of promotion is a percentage of total price
                    if (this.promotion.type === 'percentage') {
                        
                        // Get total price
                        const total  = Number(this.subtotal()) + Number(this.shipping()) + Number(this.tax())

                        // Get percentage of total
                        const result = total * Number(this.promotion.value) / 100

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

            // Get total price
            total() {

                // Calculate total price
                const total = Number(this.subtotal()) + Number(this.shipping()) + Number(this.tax())

                // Check if cart has a promotion code
                if (this.discount() > 0) {
                    
                    return Number(total) - Number(this.discount())

                }
                
                // Cart has no promotion code
                return total

            },

            // Apply coupon
            async coupon() {

                // Check if customer put a valid coupon code
                if (!this.form.coupon) {
                    return
                }

                // Start loading
                this.loading = true

                // Send request to server
                await this.$axios
                            .post('coupon/apply', { coupon: this.form.coupon }, { withCredentials: true })
                            .then(response => {

                                // Check if failed to apply coupon
                                if (!response.data.success) {
                                    
                                    // Check if coupon expired
                                    if (response.data.message === 'COUPON_EXPIRED') {
                                        this.notifications.notFound   = false
                                        this.notifications.notStarted = false
                                        this.notifications.exceeded   = false
                                        this.notifications.succeeded  = false
                                        this.notifications.expired    = true
                                    }

                                    // Check if coupon not yet started
                                    if (response.data.message === 'COUPON_SOON') {
                                        this.notifications.notFound   = false
                                        this.notifications.expired    = false
                                        this.notifications.exceeded   = false
                                        this.notifications.succeeded  = false
                                        this.notifications.notStarted = true
                                    }

                                    // Check if coupon usage exceeded limit
                                    if (response.data.message === 'USAGE_EXCEEDED') {
                                        this.notifications.notFound   = false
                                        this.notifications.expired    = false
                                        this.notifications.notStarted = false
                                        this.notifications.succeeded  = false
                                        this.notifications.exceeded   = true
                                    }

                                    // Reset old promotion
                                    this.promotion.code  = null
                                    this.promotion.type  = null
                                    this.promotion.value = null

                                    // Delete old cookie
                                    this.$cookies.remove('coupon', this.$cookiesOptions())

                                } else {

                                    // Set promotion code in a cookie in case customer refreshed the page
                                    this.$cookies.set('coupon', response.data.code, this.$cookiesOptions())

                                    // Set cart coupon
                                    this.promotion.code           = response.data.code
                                    this.promotion.type           = response.data.type
                                    this.promotion.value          = response.data.value

                                    // Coupon valid
                                    this.notifications.succeeded  = true

                                    // Close dialog
                                    this.dialogs.coupon           = false

                                    // Reset all notification
                                    this.notifications.notFound   = false
                                    this.notifications.expired    = false
                                    this.notifications.notStarted = false

                                }

                            })
                            .catch(error => {
                                
                                // Coupon not found
                                if (error.response && error.response.status === 404) {
                                    this.notifications.expired    = false
                                    this.notifications.notStarted = false
                                    this.notifications.succeeded  = false
                                    this.notifications.exceeded   = false
                                    this.notifications.notFound   = true
                                } else {
                                    // Show error toast
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                }

                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

            },

            // Delete coupon
            async deleteCoupon() {

                // Check if customer set a coupon or not
                if (this.promotion.code) {
                    
                    // Start loading
                    this.loading = true

                    await this.$axios
                            .post('coupon/remove', {}, { withCredentials: true })
                            .then(response => {

                                // Delete coupon in cookies
                                this.$cookies.remove('coupon', this.$cookiesOptions())

                                // Reset promotion code
                                this.promotion.code          = null
                                this.promotion.type          = null
                                this.promotion.value         = null

                                // Reset form
                                this.form.coupon             = null

                                // Reset notifiction
                                this.notifications.succeeded = false

                            })
                            .catch(error => {
                                
                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

                }

                // No promotion code available
                return

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

            // Product title
            title(product) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]
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

            // Increment order quantity
            async incrementQuantity(index) {

                // Update product quantity
                await this.$store.dispatch('cart/IncrementQuantity', index)

            },

            // Decrement order quantity
            async decrementQuantity(index) {

                // Update product quantity
                await this.$store.dispatch('cart/decrementQuantity', index)

            },

            // Update item quantity
            async updateItemQuantity(event, item) {

                // Set new value
                let value = event.target.value

                // Update product quantity
                await this.$store.dispatch('cart/updateQuantity', { item, value })

            }

        },

        async mounted() {
            
            // Get coupon code in cookie
            const coupon = this.$cookies.get('coupon', this.$cookiesOptions())

            // Check if customer already a coupon code
            if (coupon && typeof coupon === 'string' && coupon.length > 0) {
                
                // Set form coupon
                this.form.coupon = coupon

                // Fetch this coupon
                await this.coupon()

            }

            // Run analytics tools
            if (process.client) {
                
                // Snapchat Pixel
                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                    window.snaptr('track', 'START_CHECKOUT');
                }

                // Facebook Pixel
                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                    window._fbq('track', 'InitiateCheckout')
                }

            }


        }

    }
</script>