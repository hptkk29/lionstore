<template>
    <v-container fluid grid-list-xl ref="orderToPrint">

        <!-- Loading -->
        <loading :value="loading" />

        <v-row justify="center" align="center" class="checkout-page">
            <v-col :cols="$device.isMobileOrTablet ? 12 : 8">

                <!-- Content -->
                <div v-if="$store.state.order.success">

                    <v-card class="c-card checkout-done">
                        <v-card-text class="px-6">
                            <div class="text-center py-4 mb-4">
                                <v-icon :size="70" class="indigo--text text--accent-3 mb-4">mdi-check-underline</v-icon>
                                <h1 class="fs-14 mb-4 font-weight-medium" v-t="'t_thank_you_for_order'"></h1>
                                <span class="font-weight-bold fs-18 mb-3 d-block" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="$store.state.order.orderNumber"></span>
                                <p class="grey--text fs-10 font-italic" v-if="$store.state.order.email">{{ $t('t_copy_of_order_sent_email', { email: $store.state.order.email }) }}</p>
                            </div>
                            <div class="mb-4">
                                <h5 class="font-weight-medium mb-3 fs-13 pb-2" v-t="'t_order_summary'"></h5>
                                <v-row>
                                    <v-col cols="12" md="6" :class="!$device.isMobileOrTablet ? $vuetify.rtl ? 'pl-8' : 'pr-8' : ''">
                                        <table class="table fill-width">
                                            <tbody>

                                            <!-- Order number -->    
                                            <tr>
                                                <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_order_code') }}:</td>
                                                <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="$store.state.order.orderNumber"></td>
                                            </tr>

                                            <!-- Customer name -->
                                            <tr>
                                                <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_name') }}:</td>
                                                <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="`${$store.state.order.address_name}`"></td>
                                            </tr>

                                            <!-- Customer email -->
                                            <tr v-if="$store.state.order.email">
                                                <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_email_address') }}:</td>
                                                <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="$store.state.order.email"></td>
                                            </tr>

                                            <!-- Customer phone number -->
                                            <tr v-if="$store.state.order.address_phone">
                                                <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_phone_number') }}:</td>
                                                <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="$store.state.order.address_phone"></td>
                                            </tr>

                                            <!-- Customer address -->
                                            <tr>
                                                <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_shipping_address') }}:</td>
                                                <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="`${$store.state.order.address_content} - ${$store.state.order.address_city}`"></td>
                                            </tr>

                                        </tbody></table>
                                    </v-col>
                                    <v-col cols="12" md="6" :class="!$device.isMobileOrTablet ? $vuetify.rtl ? 'pr-8' : 'pl-8' : ''">
                                        <table class="table fill-width">
                                            <tbody>
                                            
                                                <!-- Order date -->
                                                <tr>
                                                    <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_order_date') }}:</td>
                                                    <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-text="$fulltime($store.state.order.date)"></td>
                                                </tr>

                                                <!-- Order status -->
                                                <tr>
                                                    <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_order_status') }}:</td>
                                                    <td class="fs-12 font-weight-medium text-uppercase warning--text" :class="$vuetify.rtl ? 'text-left pl-0' : 'text-right pr-0'" v-t="'t_pending'"></td>
                                                </tr>

                                                <!-- Order total price -->
                                                <tr>
                                                    <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_total') }}:</td>
                                                    <td class="fs-14 font-weight-bold" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-left pl-0' : 'text-right pr-0']" v-text="$formatMoney($store.state.order.total)"></td>
                                                </tr>
                                                
                                                <!-- Shipping -->
                                                <tr v-if="Number($store.state.order.shipping) === 0">
                                                    <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_shipping') }}:</td>
                                                    <td class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-t="'t_free_shipping'"></td>
                                                </tr>

                                                <!-- Payment method -->
                                                <tr>
                                                    <td class="fs-12 font-weight-medium" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'pr-0' : 'pl-0']">{{ $t('t_payment_method') }}:</td>

                                                    <!-- PayPal -->
                                                    <td v-if="$store.state.order.payment === 'paypal'" class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-t="'t_paypal'"></td>

                                                    <!-- Stripe -->
                                                    <td v-if="$store.state.order.payment === 'stripe'" class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-t="'t_credit_card'"></td>

                                                    <!-- Offline -->
                                                    <td v-if="$store.state.order.payment === 'offline'" class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-t="'t_bank_transfer'"></td>

                                                    <!-- Cod -->
                                                    <td v-if="$store.state.order.payment === 'cod'" class="fs-12" :class="[$vuetify.theme.dark ? 'white--text' : '', $vuetify.rtl ? 'pl-0 text-left' : 'pr-0 text-right']" v-t="'t_cash_on_delivery'"></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="mt-10">
                                <h5 class="font-weight-medium mb-3 fs-13 pb-2" v-t="'t_order_details'"></h5>
                                <div>
                                    <table class="table table-responsive-md fill-width table-mobile-checkout">
                                        <thead>
                                            <tr>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase;text-align: center;">#</th>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase" :class="$vuetify.rtl ? 'text-right' : 'text-left'" width="30%" v-t="'t_product'"></th>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-t="'t_variants'"></th>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase;text-align: center" v-t="'t_quantity'"></th>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase;text-align: center" v-t="'t_delivery_type'"></th>
                                                <th :style="$vuetify.theme.dark ? 'background-color: #4d4d4d' : 'background-color: #f3f3f3'" style="border-bottom: 0px !important; padding: 10px;font-size: 11px;font-weight: 600; text-transform: uppercase;" class="text-center" v-t="'t_price'"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(product, index) in products">
                                            <tr :key="`product-in-cart-${index}`">

                                                <!-- Produt id -->
                                                <td class="text-center fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'text--text' : 'black--text'" v-text="product.productId"></td>

                                                <!-- Product -->
                                                <td :class="$vuetify.rtl ? 'text-right' : 'text-left'">    
                                                    <nuxt-link  :to="`/product/${product.product.handler}`" target="_blank" class="fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'text--text' : 'black--text'">
                                                        {{ title(product.product) }}
                                                    </nuxt-link>
                                                </td>

                                                <!-- Variants -->
                                                <td>
                                                    <div v-if="Array.isArray(product.variants) && product.variants.length > 0">
                                                        <template v-for="(variant, index) in product.variants">
                                                            <!-- Color variant -->
                                                            <span class="fs-11 font-weight-medium grey--text" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'" v-if="variant.variant_type === 'color'" :key="index">
                                                                <span class="fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">{{ variant.variant_name }}</span> 
                                                                <v-btn fab depressed :ripple="false" :height="13" :width="13" :color="variant.variant_value" style="margin-top: -2px"></v-btn>
                                                            </span>

                                                            <!-- Radio variant -->
                                                            <span class="fs-11 font-weight-medium grey--text" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'" v-else :key="index">{{ variant.variant_name }} <strong :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="variant.variant_value"></strong></span>
                                                        </template>
                                                    </div>
                                                    <div v-else>
                                                        <span class="font-weight-bold fs-14">⚊</span>
                                                    </div>
                                                </td>

                                                <!-- Quantity -->
                                                <td class="text-center fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'text--text' : 'black--text'">
                                                    {{ product.quantity }}
                                                </td>

                                                <!-- Shipping type -->
                                                <td v-t="'t_delivery_at_home'" class="text-center fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'text--text' : 'black--text'"></td>

                                                <!-- Price -->
                                                <td class="text-center fs-11 font-weight-medium" :class="$vuetify.theme.dark ? 'text--text' : 'black--text'" v-text="`${$formatMoney(product.total)}`"></td>
                                            </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <v-row>
                                    <v-col cols="12" md="5" class="ml-auto mr-0 mt-8">
                                        <table class="table fill-width mt-8">
                                            <tbody>

                                                <!-- Subtotal -->
                                                <tr>
                                                    <th class="fs-14 font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-right' : 'text-left']" v-t="'t_subtotal'"></th>
                                                    <td :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                                        <span class="font-weight-light fs-14" v-text="$formatMoney($store.state.order.subtotal)"></span>
                                                    </td>
                                                </tr>

                                                <!-- Shipping -->
                                                <tr>
                                                    <th class="fs-14 font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-right' : 'text-left']" v-t="'t_shipping'"></th>
                                                    <td :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                                        <span class="font-italic font-weight-light fs-14" v-text="$formatMoney($store.state.order.shipping)"></span>
                                                    </td>
                                                </tr>

                                                <!-- Tax -->
                                                <tr>
                                                    <th class="fs-14 font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-right' : 'text-left']" v-t="'t_tax'"></th>
                                                    <td :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                                        <span class="font-italic font-weight-light fs-14" v-text="$formatMoney($store.state.order.tax)"></span>
                                                    </td>
                                                </tr>

                                                <!-- Discount -->
                                                <tr>
                                                    <th class="fs-14 font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-right' : 'text-left']" v-t="'t_discount'"></th>
                                                    <td :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                                        <span class="font-italic fs-14 font-weight-light error--text">
                                                            - {{ $formatMoney(discount()) }}
                                                        </span>
                                                    </td>
                                                </tr>

                                                <!-- Total -->
                                                <tr>
                                                    <th class="fs-14 font-weight-light" :class="[$vuetify.theme.dark ? 'white--text' : 'black--text', $vuetify.rtl ? 'text-right' : 'text-left']">
                                                        <span v-t="'t_total'"></span>
                                                    </th>
                                                    <td :class="$vuetify.rtl ? 'text-left' : 'text-right'" class="fs-14">
                                                        <span v-text="$formatMoney($store.state.order.total)"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                    </v-card>

                    <!-- Go home -->
                    <v-btn depressed dark nuxt to="/" color="indigo accent-3" class="px-12 mt-6" :class="$vuetify.rtl ? 'float-left' : 'float-right'">
                        <span v-t="'t_return_to_home'" class="fs-10 font-weight-medium"></span>
                    </v-btn>
                    

                    <!-- Print -->
                    <v-btn depressed dark text color="indigo accent-3" class="px-12 mt-6" :class="[$vuetify.rtl ? 'float-left' : 'float-right', $vuetify.rtl ? 'ml-3' : 'mr-3']" @click="print()">
                        <span v-t="'t_print'" class="fs-10 font-weight-medium"></span>
                    </v-btn>

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
    import html2canvas from 'html2canvas'

    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        data() {
            return {
                loading: false
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
                title: this.$t('t_order_succeeded'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_order_succeeded') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('checkout/done') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_order_succeeded') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('checkout/done') }  ]
            }
        },

        computed: {

            // List of products in cart
            products() {
                return this.$store.state.order.products
            },

            // JSON LD
            breadcrumbs(){
                return [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('checkout/done'),
                        text: this.$t('t_order_succeeded'),
                    }
                ]
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

            // Get cart discount
            discount() {

                // Get order
                const order = this.$store.state.order
                
                
                // Check if customer has a valid coupon code
                if (order.coupon_code && order.coupon_value && order.coupon_type) {
                    
                    // Check type of this promotion code
                    if (order.coupon_type === 'money') {
                        
                        // Return how much money will be discount from total
                        return Number(order.coupon_value)

                    }

                    // Check if type of promotion is a percentage of total price
                    if (order.coupon_type === 'percentage') {
                        
                        // Get total price
                        const total  = Number(this.$store.state.order.subtotal) + Number(this.$store.state.order.shipping) + Number(this.$store.state.order.tax)

                        // Get percentage of total
                        const result = total * Number(order.coupon_value) / 100

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

            // Print order
            print() {

                // Run this code only on client side
                if (process.client) {
                    
                    html2canvas(document.body, {
                        useCORS: true
                    }).then((canvas) => {
                        if (navigator.msSaveBlob) { // IE10+ 
                            let blob = canvas.msToBlob(); 
                            return navigator.msSaveBlob(blob, name); 
                        } else {
                            let imageurl  = canvas.toDataURL('image/png')
                            let imagename = this.$store.state.order.orderNumber
                            this.fileDownload(imageurl, imagename)
                        }
                    })

                }

            },

            // Download invoice
            fileDownload(downloadUrl, downloadName) {
                if (process.client) {
                    
                    let aLink           = document.createElement("a");
                    aLink.style.display = "none";
                    aLink.href          = downloadUrl;
                    aLink.download      = `${downloadName}.jpg`;
                    // Trigger click-then remove
                    document.body.appendChild(aLink);
                    aLink.click();
                    document.body.removeChild(aLink);

                }
            }

        },

        mounted() {

            // Clear saved address
            this.$store.commit('address/CLEAR_ADDRESS')

            // Clear saved coupon
            this.$cookies.remove('coupon', this.$cookiesOptions())

            // Run analytics tools
            if (process.client) {
                
                // Snapchat Pixel
                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                    window.snaptr('track', 'PURCHASE',  { 
                        'price'   : this.$store.state.order.total,
                        'currency': this.$store.state.settings.currency.code,
                        'item_ids': [this.$store.state.order.orderNumber],

                    });
                }

                // Facebook Pixel
                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                    window._fbq('track', 'Purchase', {
                        'value'   : this.$store.state.order.total,
                        'currency': this.$store.state.settings.currency.code,
                        'content_ids': [this.$store.state.order.orderNumber],
                    })
                }

            }

        }

    }
</script>