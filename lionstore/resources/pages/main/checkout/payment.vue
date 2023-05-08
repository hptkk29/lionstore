<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" :text="loadingText ? loadingText : $t('t_loading')" />

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
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-3' : 'blue lighten-5'">
                                <v-icon :size="18" color="indigo accent-3">mdi-account</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium indigo--text text--accent-3" v-t="'t_my_account'"></div>
                        </div>

                        <v-divider v-if="!$auth.loggedIn"></v-divider>

                        <!-- Shipping info -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-3' : 'blue lighten-5'">
                                <v-icon :size="18" color="indigo accent-3">mdi-truck-fast</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium indigo--text text--accent-3" v-t="'t_shipping_info'"></div>
                        </div>

                        <v-divider></v-divider>

                        <!-- Payment -->
                        <div class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete">
                            <span class="v-stepper__step__step" :class="$vuetify.theme.dark ? 'grey darken-3' : 'blue lighten-5'">
                                <v-icon :size="18" color="indigo accent-3">mdi-credit-card</v-icon>
                            </span>
                            <div class="v-stepper__label fs-11 font-weight-medium indigo--text text--accent-3" v-t="'t_payment'"></div>
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

                    <!-- Mobile -->
                    <template v-if="$device.isMobileOrTablet">

                        <!-- Total amount -->
                        <v-card class="c-card mb-4 py-4 px-6">
                            <div class="row spacer no-gutters align-center">
                                <v-col cols="5" class="text-no-wrap">
                                    <span class="font-weight-regular fs-13 d-block" v-t="'t_total_amount'"></span>
                                </v-col>
                                <div class=" col fs-13" :class="$vuetify.rtl ? 'text-left' : 'text-right'" v-text="$formatMoney(total())"></div>
                            </div>
                        </v-card>

                        <!-- Available payment methods -->
                        <v-card class="c-card mb-4 py-4 px-6">
                            <v-radio-group v-model="form.method">
                                <template v-slot:label>
                                    <div class="pb-2" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-t="'t_select_payment_gateway'"></div>
                                </template>

                                <!-- Paypal -->
                                <v-radio color="indigo accent-3" :ripple="false" value="paypal" v-if="paypal">
                                    <template v-slot:label>
                                        <div :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <div :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-12 font-weight-medium d-block" v-text="paypal.title"></div>
                                            <div class="fs-10 font-weight-regular d-block" v-text="paypal.description"></div>
                                        </div>
                                    </template>
                                </v-radio>

                                <!-- Stripe -->
                                <v-radio color="indigo accent-3" :ripple="false" value="stripe" v-if="stripe">
                                    <template v-slot:label>
                                        <div :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <div :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-12 font-weight-medium d-block" v-text="stripe.title"></div>
                                            <div class="fs-10 font-weight-regular d-block" v-text="stripe.description"></div>
                                        </div>
                                    </template>
                                </v-radio>

                                <!-- Offline -->
                                <v-radio color="indigo accent-3" :ripple="false" value="offline" v-if="offline">
                                    <template v-slot:label>
                                        <div :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <div :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-12 font-weight-medium d-block" v-text="offline.title"></div>
                                            <div class="fs-10 font-weight-regular d-block" v-text="offline.description"></div>
                                        </div>
                                    </template>
                                </v-radio>

                                <!-- Cod -->
                                <v-radio color="indigo accent-3" :ripple="false" value="cod" v-if="cod">
                                    <template v-slot:label>
                                        <div :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <div :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-12 font-weight-medium d-block" v-text="cod.title"></div>
                                            <div class="fs-10 font-weight-regular d-block" v-text="cod.description"></div>
                                        </div>
                                    </template>
                                </v-radio>
                                
                            </v-radio-group>
                        </v-card>

                        <!-- Payment action -->
                        <v-card class="c-card py-4 px-6" id="mobile-payment-action-scroll" v-show="form.method">
                            <!-- Cash on delivery -->
                            <div class="payment-gateway-details-cod-offline" v-if="form.method === 'cod'">
                                <div class="empty-state">
                                    <div class="empty-state-container">
                                        <v-icon class="empty-state-icon">mdi-truck-fast</v-icon>
                                        <strong class="empty-state-label" v-t="'t_pay_upon_delivery'"></strong> 
                                        <p class="empty-state-description" v-t="'t_pay_upon_delivery_desc'"></p>
                                        <v-btn depressed dark @click="checkout()" color="indigo accent-3" class="mt-3 px-12 tiktok-place-order-event">
                                            <span v-t="'t_place_your_order'" class="fs-10 font-weight-medium"></span>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>

                            <!-- Offline -->
                            <div class="payment-gateway-details-cod-offline" v-show="form.method === 'offline'">
                                <div class="empty-state">
                                    <div class="empty-state-container">
                                        <v-icon class="empty-state-icon">mdi-bank</v-icon>
                                        <strong class="empty-state-label">{{ offline.title }}</strong> 
                                        <p class="empty-state-description" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-html="offline.details.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                                        <v-btn depressed dark @click="checkout()" color="indigo accent-3" class="mt-3 px-12 tiktok-place-order-event">
                                            <span v-t="'t_place_your_order'" class="fs-10 font-weight-medium"></span>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>

                            <!-- Stripe -->
                            <div class="fill-width mt-12" v-show="form.method === 'stripe'">
                                <v-row>

                                    <!-- Card number -->
                                    <v-col cols="12">
                                        <v-text-field dense outlined
                                            v-model="form.stripe_card_number"
                                            :hide-details="!errors.stripe_card_number"
                                            placeholder="#### #### #### ####"
                                            v-mask="'#### #### #### ####'"
                                            append-icon="mdi-credit-card"
                                            color="indigo accent-3" 
                                            :rules="errors.stripe_card_number"
                                            :error="errors.stripe_card_number ? true : false" />
                                    </v-col>

                                    <!-- Card Expiry year -->
                                    <v-col cols="6">
                                        <v-autocomplete dense outlined
                                            v-model="form.stripe_exp_year"
                                            :hide-details="!errors.stripe_exp_year"
                                            :placeholder="$t('t_enter_expiry_year')"
                                            :items="years"
                                            color="indigo accent-3" 
                                            :rules="errors.stripe_exp_year"
                                            :error="errors.stripe_exp_year ? true : false" />
                                    </v-col>

                                    <!-- Card Expiry Month -->
                                    <v-col cols="6">
                                        <v-autocomplete dense outlined
                                            v-model="form.stripe_exp_month"
                                            :hide-details="!errors.stripe_exp_month"
                                            :placeholder="$t('t_enter_expiry_month')"
                                            :items="months"
                                            item-text="text"
                                            item-value="value"
                                            color="indigo accent-3" 
                                            :rules="errors.stripe_exp_month"
                                            :error="errors.stripe_exp_month ? true : false" />
                                    </v-col>

                                    <!-- Card cvc -->
                                    <v-col cols="12">
                                        <v-text-field dense outlined
                                            v-model="form.stripe_cvc"
                                            :hide-details="!errors.stripe_cvc"
                                            :placeholder="$t('t_enter_security_code')"
                                            append-icon="mdi-credit-card-settings"
                                            color="indigo accent-3" 
                                            :rules="errors.stripe_cvc"
                                            :error="errors.stripe_cvc ? true : false" />
                                    </v-col>

                                    <!-- Submit -->
                                    <v-col cols="12">
                                        <v-btn rounded color="indigo accent-3" depressed block @click="checkout()" :loading="loading" :disabled="loading" :dark="!loading" class="tiktok-place-order-event">
                                            <span class="fs-10 font-weight-medium" v-t="'t_place_your_order_now'" v-if="!loading"></span>
                                            <template v-slot:loader>
                                                <v-progress-circular
                                                    :width="1"
                                                    :size="20"
                                                    color="#6c6c6c"
                                                    indeterminate />
                                            </template>
                                        </v-btn>
                                    </v-col>

                                    <!-- Secure payment -->
                                    <v-col>
                                        <div class="secure-payment">
                                            <v-icon>mdi-lock</v-icon>
                                            <span v-t="'t_secure_payment'"></span>
                                        </div>
                                    </v-col>

                                </v-row>
                            </div>

                            <!-- PayPal -->
                            <div class="fill-width mt-12" v-show="form.method === 'paypal'">
                                <div id="paypal-button"></div>
                            </div>
                        </v-card>

                    </template>

                    <!-- Desktop -->
                    <template v-else>
                        <v-card class="c-card">
                            <div class="d-flex">
                                <!--Wallet-->
                                <aside class="wallet">
                                    <h2 v-t="'t_payment'"></h2>
                                    <div class="cards">

                                        <!-- PayPal -->
                                        <div class="pg-card" @click="form.method = 'paypal'" :class="form.method === 'paypal' ? 'pg-card-selected' : ''" v-if="paypal">
                                            <div class="pg-image" v-if="paypal.logo">
                                                <img :src="$clientIndex(`uploads/${ paypal.logo.file_folder }/${ paypal.logo.uid }.webp`)" :alt="paypal.title">
                                            </div>
                                            <div class="pg-details">
                                                <div class="pg-details-name" v-text="paypal.title"></div>
                                                <div class="pg-details-desc" v-text="paypal.description"></div>
                                            </div>
                                            <div class="pg-card-icon">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </div>
                                        </div>

                                        <!-- Stripe -->
                                        <div class="pg-card" @click="form.method = 'stripe'" :class="form.method === 'stripe' ? 'pg-card-selected' : ''" v-if="stripe">
                                            <div class="pg-image" v-if="stripe.logo">
                                                <img :src="$clientIndex(`uploads/${ stripe.logo.file_folder }/${ stripe.logo.uid }.webp`)" :alt="stripe.title">
                                            </div>
                                            <div class="pg-details">
                                                <div class="pg-details-name" v-text="stripe.title"></div>
                                                <div class="pg-details-desc" v-text="stripe.description"></div>
                                            </div>
                                            <div class="pg-card-icon">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </div>
                                        </div>

                                        <!-- Offline -->
                                        <div class="pg-card" @click="form.method = 'offline'" :class="form.method === 'offline' ? 'pg-card-selected' : ''" v-if="offline">
                                            <div class="pg-image" v-if="offline.logo">
                                                <img :src="$clientIndex(`uploads/${ offline.logo.file_folder }/${ offline.logo.uid }.webp`)" :alt="offline.title">
                                            </div>
                                            <div class="pg-details">
                                                <div class="pg-details-name" v-text="offline.title"></div>
                                                <div class="pg-details-desc" v-text="offline.description"></div>
                                            </div>
                                            <div class="pg-card-icon">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </div>
                                        </div>

                                        <!-- Cod -->
                                        <div class="pg-card" @click="form.method = 'cod'" :class="form.method === 'cod' ? 'pg-card-selected' : ''" v-if="cod">
                                            <div class="pg-image" v-if="cod.logo">
                                                <img :src="$clientIndex(`uploads/${ cod.logo.file_folder }/${ cod.logo.uid }.webp`)" :alt="cod.title">
                                            </div>
                                            <div class="pg-details">
                                                <div class="pg-details-name" v-text="cod.title"></div>
                                                <div class="pg-details-desc" v-text="cod.description"></div>
                                            </div>
                                            <div class="pg-card-icon">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </aside>
                                <content class="transactions-wrapper">

                                    <h2>
                                        {{ $t('t_total_amount') }}
                                        <span class="total-balance" v-text="$formatMoney(total())"></span>
                                    </h2>

                                    <!-- No payment gateway selected -->
                                    <div class="payment-gateway-no-selection" v-if="!form.method" v-t="'t_select_payment_gateway'"></div>

                                    <!-- Cash on delivery -->
                                    <div class="payment-gateway-details-cod-offline" v-if="form.method === 'cod'">
                                        <div class="empty-state">
                                            <div class="empty-state-container">
                                                <v-icon class="empty-state-icon">mdi-truck-fast</v-icon>
                                                <strong class="empty-state-label" v-t="'t_pay_upon_delivery'"></strong> 
                                                <p class="empty-state-description" v-t="'t_pay_upon_delivery_desc'"></p>
                                                <v-btn depressed dark @click="checkout()" color="indigo accent-3" class="mt-3 px-12 tiktok-place-order-event">
                                                    <span v-t="'t_place_your_order'" class="fs-10 font-weight-medium"></span>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Offline -->
                                    <div class="payment-gateway-details-cod-offline" v-show="form.method === 'offline'">
                                        <div class="empty-state">
                                            <div class="empty-state-container">
                                                <v-icon class="empty-state-icon">mdi-bank</v-icon>
                                                <strong class="empty-state-label">{{ offline.title }}</strong> 
                                                <p class="empty-state-description" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-html="offline.details.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                                                <v-btn depressed dark @click="checkout()" color="indigo accent-3" class="mt-3 px-12 tiktok-place-order-event">
                                                    <span v-t="'t_place_your_order'" class="fs-10 font-weight-medium"></span>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Stripe -->
                                    <div class="fill-width mt-12" v-show="form.method === 'stripe'">
                                        <v-row>

                                            <!-- Card number -->
                                            <v-col cols="12">
                                                <v-text-field dense outlined
                                                    v-model="form.stripe_card_number"
                                                    :hide-details="!errors.stripe_card_number"
                                                    placeholder="#### #### #### ####"
                                                    v-mask="'#### #### #### ####'"
                                                    append-icon="mdi-credit-card"
                                                    color="indigo accent-3" 
                                                    :rules="errors.stripe_card_number"
                                                    :error="errors.stripe_card_number ? true : false" />
                                            </v-col>

                                            <!-- Card Expiry year -->
                                            <v-col cols="6">
                                                <v-autocomplete dense outlined
                                                    v-model="form.stripe_exp_year"
                                                    :hide-details="!errors.stripe_exp_year"
                                                    :placeholder="$t('t_enter_expiry_year')"
                                                    :items="years"
                                                    color="indigo accent-3" 
                                                    :rules="errors.stripe_exp_year"
                                                    :error="errors.stripe_exp_year ? true : false" />
                                            </v-col>

                                            <!-- Card Expiry Month -->
                                            <v-col cols="6">
                                                <v-autocomplete dense outlined
                                                    v-model="form.stripe_exp_month"
                                                    :hide-details="!errors.stripe_exp_month"
                                                    :placeholder="$t('t_enter_expiry_month')"
                                                    :items="months"
                                                    item-text="text"
                                                    item-value="value"
                                                    color="indigo accent-3" 
                                                    :rules="errors.stripe_exp_month"
                                                    :error="errors.stripe_exp_month ? true : false" />
                                            </v-col>

                                            <!-- Card cvc -->
                                            <v-col cols="12">
                                                <v-text-field dense outlined
                                                    v-model="form.stripe_cvc"
                                                    :hide-details="!errors.stripe_cvc"
                                                    :placeholder="$t('t_enter_security_code')"
                                                    append-icon="mdi-credit-card-settings"
                                                    color="indigo accent-3" 
                                                    :rules="errors.stripe_cvc"
                                                    :error="errors.stripe_cvc ? true : false" />
                                            </v-col>

                                            <!-- Submit -->
                                            <v-col cols="12">
                                                <v-btn rounded color="indigo accent-3" depressed block @click="checkout()" :loading="loading" :disabled="loading" :dark="!loading" class="tiktok-place-order-event">
                                                    <span class="fs-10 font-weight-medium" v-t="'t_place_your_order_now'" v-if="!loading"></span>
                                                    <template v-slot:loader>
                                                        <v-progress-circular
                                                            :width="1"
                                                            :size="20"
                                                            color="#6c6c6c"
                                                            indeterminate />
                                                    </template>
                                                </v-btn>
                                            </v-col>

                                            <!-- Secure payment -->
                                            <v-col>
                                                <div class="secure-payment">
                                                    <v-icon>mdi-lock</v-icon>
                                                    <span v-t="'t_secure_payment'"></span>
                                                </div>
                                            </v-col>

                                        </v-row>
                                    </div>

                                    <!-- PayPal -->
                                    <div class="fill-width mt-12" v-show="form.method === 'paypal'">
                                        <div id="paypal-button"></div>
                                    </div>

                                </content>
                            </div>
                        </v-card>
                    </template>
                    
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

        async asyncData({ $axios, app, redirect }) {
            // Send request to server
            let response = await $axios.post('checkout/payment/gateways')

            return {
                paypal    : response.data.paypal,
                stripe    : response.data.stripe,
                offline   : response.data.offline,
                cod       : response.data.cod,
                promotion : response.data.coupon
            }
        },

        data() {
            return {
                form: {
                    method            : null,
                    stripe_card_number: '',
                    stripe_exp_year   : '',
                    stripe_exp_month  : '',
                    stripe_exp_month  : '',
                    stripe_cvc        : '',
                    addressId         : this.$cookies.get('order_address_uid', { expiry: 7, path: '/' }),
                    name              : this.$cookies.get('order_address_name', { expiry: 7, path: '/' }),
                    phone             : this.$cookies.get('order_address_phone', { expiry: 7, path: '/' }),
                    country_id        : this.$cookies.get('order_address_country_id', { expiry: 7, path: '/' }),
                    state             : this.$cookies.get('order_address_state', { expiry: 7, path: '/' }),
                    city              : this.$cookies.get('order_address_city', { expiry: 7, path: '/' }),
                    zipcode           : this.$cookies.get('order_address_zipcode', { expiry: 7, path: '/' }),
                    address           : this.$cookies.get('order_address_address', { expiry: 7, path: '/' })
                },
                promotion     : null,
                isPaypalLoaded: false,
                loadingText   : null,
                errors        : [],
                loading       : false
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
                title: this.$t('t_payment'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_payment') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('checkout/payment') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_payment') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],

                link: [ { rel: 'canonical', href: this.$clientIndex('checkout/payment') }  ],

                script: [
                    { src: `https://www.paypal.com/sdk/js?client-id=${ this.paypal.public_key }`, async: true, defer: true }
                ]

            }
        },

        watch: {
            'form.method': {
                handler: function (val, oldVal) {

                    // Check if on client side not server
                    if (process.client) {
                        
                        // Check if mobile or tablet device
                        if (this.$device.isMobileOrTablet) {
                            
                            this.$scrollTo('#mobile-payment-action-scroll', 300, {})
    
                        }

                    }
                    
                },
                deep: true
            }
        },

        computed: {

            // List of products in cart
            products() {
                return this.$store.state.cart.itemsInCart
            },

            // Credit card years
            years() {

                // Set empty array
                var years = []

                // Loop throug all years from current year to 2040 :)
                for(let current = new Date().getFullYear(); current <= 2040; current++){
                    years.push(current)
                }

                // Return years array
                return years
            },

            // Credit card months
            months() {
                return [
                    { text: this.$t('t_january'), value: 1 },
                    { text: this.$t('t_february'), value: 2 },
                    { text: this.$t('t_march'), value: 3 },
                    { text: this.$t('t_april'), value: 4 },
                    { text: this.$t('t_may'), value: 5 },
                    { text: this.$t('t_june'), value: 6 },
                    { text: this.$t('t_july'), value: 7 },
                    { text: this.$t('t_august'), value: 8 },
                    { text: this.$t('t_september'), value: 9 },
                    { text: this.$t('t_october'), value: 10 },
                    { text: this.$t('t_november'), value: 11 },
                    { text: this.$t('t_december'), value: 12 },
                ]
            },

            // Get paypal locale
            locale(gateway = 'paypal') {

                // Get current locale
                const locale = this.$i18n.locale

                // Check if gateway paypal
                if (gateway === 'paypal') {
                    
                    // Check current locale
                    switch (locale) {
                        case 'ar':
                            return 'ar_SA'
                            break;
                        case 'az':
                            return 'en_AZ'
                            break;
                        case 'cn':
                            return 'zh_CN'
                            break;
                        case 'de':
                            return 'de_DE'
                            break;
                        case 'en':
                            return 'en_US'
                            break;
                        case 'es':
                            return 'es_ES'
                            break;
                        case 'fr':
                            return 'fr_FR'
                            break;
                        case 'hi':
                            return 'en_IN'
                            break;
                        case 'hu':
                            return 'hu_HU'
                            break;
                        case 'jp':
                            return 'ja_JP'
                            break;
                        case 'nl':
                            return 'nl_NL'
                            break;
                        case 'po':
                            return 'pl_PL'
                            break;
                        case 'pt':
                            return 'pt_BR'
                            break;
                        case 'ro':
                            return 'en_RO'
                            break;
                        case 'ru':
                            return 'ru_RU'
                            break;
                        case 'th':
                            return 'th_TH'
                            break;
                        case 'tr':
                            return 'tr_TR'
                            break;
                        case 'ua':
                            return 'ru_UA'
                            break;
                    
                        default:
                            return 'en_US'
                            break;
                    }

                }

                // Return english by default
                return 'en_US'

            },

            // JSON LD
            breadcrumbs(){
                return [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('checkout/payment'),
                        text: this.$t('t_payment'),
                    }
                ]
            }

        },

        methods: {
            
            // Checkout
            async checkout() {

                if (this.form.method === 'cod') {
                    
                    // Start loading
                    this.loading = true

                    // Set data
                    const data = {
                        products      : this.products,
                        source        : this.$device.isMobileOrTablet ? 'mobile': 'desktop',
                        addressId     : this.form.addressId,
                        name          : this.form.name,
                        phone         : this.form.phone,
                        country_id    : this.form.country_id,
                        state         : this.form.state,
                        city          : this.form.city,
                        zipcode       : this.form.zipcode,
                        address       : this.form.address,
                        payment_method: this.form.method
                    }

                    // Send request to server
                    await this.$axios
                                .post('checkout/done', data, { withCredentials: true })
                                .then(response => {

                                    // Set order details
                                    this.$store.dispatch("order/setOrder", response.data)

                                    // Empty cart
                                    this.$store.commit('cart/CLEAR_CART')

                                    // Redirect to success page
                                    this.$router.push('/checkout/done')

                                })
                                .catch(error => {
                                    // Form errors
                                    if (error.response.status === 422) {
                                        this.errors  = this.$errors(error.response.data.errors)
                                    }

                                    // Show error toast
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                })
                                .finally(() => {
                                    // Stop loading
                                    this.loading = false
                                })

                } else if (this.form.method === 'offline') {
                    
                    // Start loading
                    this.loading = true

                    // Set data
                    const data = {
                        products      : this.products,
                        source        : this.$device.isMobileOrTablet ? 'mobile': 'desktop',
                        addressId     : this.form.addressId,
                        name          : this.form.name,
                        phone         : this.form.phone,
                        country_id    : this.form.country_id,
                        state         : this.form.state,
                        city          : this.form.city,
                        zipcode       : this.form.zipcode,
                        address       : this.form.address,
                        payment_method: this.form.method
                    }

                    // Send request to server
                    await this.$axios
                                .post('checkout/done', data, { withCredentials: true })
                                .then(response => {

                                    // Set order details
                                    this.$store.dispatch("order/setOrder", response.data)

                                    // Empty cart
                                    this.$store.commit('cart/CLEAR_CART')

                                    // Redirect to success page
                                    this.$router.push('/checkout/done')

                                })
                                .catch(error => {
                                    // Form errors
                                    if (error.response.status === 422) {
                                        this.errors  = this.$errors(error.response.data.errors)
                                    }

                                    // Show error toast
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                })
                                .finally(() => {
                                    // Stop loading
                                    this.loading = false
                                })

                } else if (this.form.method === 'stripe') {
                    
                    // Start loading
                    this.loading = true

                    // Set data
                    const data = {
                        products          : this.products,
                        source            : this.$device.isMobileOrTablet ? 'mobile' : 'desktop',
                        addressId         : this.form.addressId,
                        name              : this.form.name,
                        phone             : this.form.phone,
                        country_id        : this.form.country_id,
                        state             : this.form.state,
                        city              : this.form.city,
                        zipcode           : this.form.zipcode,
                        address           : this.form.address,
                        payment_method    : this.form.method,
                        stripe_card_number: this.form.stripe_card_number,
                        stripe_exp_year   : this.form.stripe_exp_year,
                        stripe_exp_month  : this.form.stripe_exp_month,
                        stripe_exp_month  : this.form.stripe_exp_month,
                        stripe_cvc        : this.form.stripe_cvc
                    }

                    // Send request to server
                    await this.$axios
                                .post('checkout/done', data, { withCredentials: true })
                                .then(response => {

                                    // Set order details
                                    this.$store.dispatch("order/setOrder", response.data)

                                    // Empty cart
                                    this.$store.commit('cart/CLEAR_CART')

                                    // Redirect to success page
                                    this.$router.push('/checkout/done')

                                })
                                .catch(error => {
                                    // Form errors
                                    if (error.response.status === 422) {
                                        this.errors  = this.$errors(error.response.data.errors)
                                    }

                                    // Show error toast
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                })
                                .finally(() => {
                                    // Stop loading
                                    this.loading = false
                                })

                }

            },

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
                if (this.promotion && (this.promotion.code && this.promotion.value && this.promotion.type)) {
                    
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

            // Init paypal SDK
            async initPayPal() {
                // Run this function only on client side, not server side
                if (process.client) {

                    let vm = this
                    
                    window.paypal.Buttons({

                        // Configure environment
                        env: vm.paypal.env,
                        client: {
                            sandbox   : vm.paypal.public_key,
                            production: vm.paypal.public_key
                        },
                        locale: vm.locale,
                        style: {
                            layout:  'vertical',
                            color:   'blue',
                            shape:   'rect',
                            label:   'paypal'
                        },
                        commit: true,

                        // Config payment
                        payment: function(data, actions) {

                            return actions.payment.create({
                                transactions: [{
                                    amount: {
                                        total   : vm.total(),
                                        currency: vm.$store.state.settings.currency.code
                                    }
                                }]
                            });

                        },

                        // Execute the payment
                        onAuthorize: async function(data, actions) {

                            return actions.payment.execute().then(async function() {
            
                                // Set loading text
                                vm.loadingText = vm.$t('t_your_payment_is_being_processed')

                                // Start loading
                                vm.loading     = true
            
                                // Set data
                                const request       = {
                                    products      : vm.products,
                                    source        : vm.$device.isMobileOrTablet ? 'mobile': 'desktop',
                                    uid           : vm.form.uid,
                                    name          : vm.form.name,
                                    country_id    : vm.form.country,
                                    state         : vm.form.state,
                                    city          : vm.form.city,
                                    zipcode       : vm.form.zipcode,
                                    phone         : vm.form.phone,
                                    address       : vm.form.address,
                                    payment_method: vm.form.method,
                                    payment_token : data.orderID,
                                    payer_id      : data.payerID
                                }
            
                                // Send request to server
                                await vm.$axios
                                            .post('checkout/done', request)
                                            .then(response => {
            
                                                // Set order details
                                                vm.$store.dispatch("order/setOrder", response.data)
            
                                                // Empty cart
                                                vm.$store.commit('cart/CLEAR_CART')
            
                                                // Redirect to success page
                                                vm.$router.push('/checkout/done')
            
                                            })
                                            .catch(error => {
                                                // Form errors
                                                if (error.response.status === 422) {
                                                    vm.errors  = vm.$errors(error.response.data)
                                                }
            
                                                // Show error toast
                                                vm.$message(vm.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                            })
                                            .finally(() => {
                                                // Stop loading
                                                vm.loading     = false
            
                                                // Reset loading text
                                                vm.loadingText = null
                                            })

                            });

                        },

                        // Payment canceled
                        onCancel: function (data, actions) {
                            vm.$message(vm.$t('t_we_couldnt_process_ur_payment'), 'emoticon-sad', 'error')
                        },

                        // Error
                        onError: function (err) {
                            vm.$message(err, 'alert', 'error')
                        }

                    }).render('#paypal-button').then(() => {
                        this.isPaypalLoaded = true
                    });
                }
            }

        },

        mounted() {
            
            // Check if PayPal gateway enabled
            if (this.paypal && this.products.length > 0) {
                
                // Check if page totaly loaded
                document.onreadystatechange = () => {
                    if (document.readyState == "complete") {
                        
                        // Init paypal
                        this.initPayPal()

                        // In case of error we need to reset paypal sdk
                        this.isPaypalLoaded = true
                    }
                }

            }

            // Run analytics tools
            if (process.client) {

                // Facebook Pixel
                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                    window._fbq('track', 'AddPaymentInfo')
                }

            }

        }

    }
</script>