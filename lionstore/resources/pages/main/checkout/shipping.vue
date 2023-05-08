<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <!-- Create new address -->
        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_create_address'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Name -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_name">
                            <v-text-field dense outlined
                                v-model="form.name"
                                :hide-details="!errors.name"
                                :placeholder="$t('t_enter_your_name')"
                                append-icon="mdi-account"
                                color="indigo accent-3" 
                                :rules="errors.name"
                                :error="errors.name ? true : false" />
                        </v-col>

                        <!-- Phone -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_phone">
                            <v-text-field dense outlined
                                v-model="form.phone"
                                :hide-details="!errors.phone"
                                :placeholder="$t('t_enter_phone')"
                                append-icon="mdi-phone"
                                color="indigo accent-3" 
                                :rules="errors.phone"
                                :error="errors.phone ? true : false" />
                        </v-col>

                        <!-- Countries -->
                        <v-col cols="12" v-if="$store.state.settings.is_global">
                            <v-autocomplete dense outlined
                                v-model="form.country_id"
                                :hide-details="!errors.country_id"
                                :placeholder="$t('t_choose_country')"
                                :items="countries"
                                item-text="name"
                                item-value="id"
                                color="indigo accent-3" 
                                :rules="errors.country_id"
                                :error="errors.country_id ? true : false" />
                        </v-col>

                        <!-- State -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_state">
                            <v-text-field dense outlined
                                v-model="form.state"
                                :hide-details="!errors.state"
                                :placeholder="$t('t_enter_state')"
                                append-icon="mdi-flag"
                                color="indigo accent-3" 
                                :rules="errors.state"
                                :error="errors.state ? true : false" />
                        </v-col>

                        <!-- City -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_city">
                            <v-text-field dense outlined
                                v-model="form.city"
                                :hide-details="!errors.city"
                                :placeholder="$t('t_enter_city')"
                                append-icon="mdi-city"
                                color="indigo accent-3" 
                                :rules="errors.city"
                                :error="errors.city ? true : false" />
                        </v-col>

                        <!-- Zipcode -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_zipcode">
                            <v-text-field dense outlined
                                v-model="form.zipcode"
                                :hide-details="!errors.zipcode"
                                :placeholder="$t('t_enter_zipcode')"
                                append-icon="mdi-numeric"
                                color="indigo accent-3" 
                                :rules="errors.zipcode"
                                :error="errors.zipcode ? true : false" />
                        </v-col>

                        <!-- Address -->
                        <v-col cols="12" v-if="$store.state.settings.checkout.field_address">
                            <v-textarea dense outlined :height="160"
                                v-model="form.address"
                                :hide-details="!errors.address"
                                :placeholder="$t('t_enter_address')"
                                append-icon="mdi-map-marker"
                                color="indigo accent-3" 
                                :rules="errors.address"
                                :error="errors.address ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="create" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 font-weight-medium" v-t="'t_create'" v-if="!loading"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="1"
                                        :size="20"
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

                    <!-- Addresses -->
                    <v-row class="my-6">

                        <!-- List -->
                        <template v-for="(a, index) in addresses">
                            <v-col cols="12" md="4" :key="index">
                                <v-card @click="setShippingAddress(a)" class="c-card px-2 py-3" :class="[$vuetify.rtl ? 'text-right' : 'text-left', selected === a.uid ? 'selected-shipping-address' : '']">
                                    <v-row align="center" class="mx-0" style="min-height: 152px">

                                        <v-list-item two-line>
                                            <v-list-item-content>

                                                <!-- Name -->
                                                <v-list-item-title v-if="$store.state.settings.checkout.field_name" class="fs-12 font-weight-bold d-inline-block text-truncate pb-1" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="a.name"></v-list-item-title>

                                                <!-- Address -->
                                                <v-list-item-subtitle v-if="$store.state.settings.checkout.field_address" class="fs-11 pt-1 d-inline-block text-truncate" :class="$vuetify.theme.dark ? 'font-weight-light' : 'font-weight-regular font-italic'" v-text="a.address"></v-list-item-subtitle>

                                                <!-- Country / State / City / Zipcode -->
                                                <v-list-item-subtitle class="fs-10 pt-2 d-inline-block text-truncate" :class="$vuetify.theme.dark ? 'white--text font-weight-light' : 'font-weight-regular black--text'">
                                                    {{ a.state ? a.state : '' }}
                                                    {{ a.state && a.city ? '⚊' : '' }}
                                                    {{ a.city ? a.city : '' }}
                                                    {{ a.city && a.zipcode ? '⚊' : '' }}
                                                    {{ a.zipcode ? a.zipcode : '' }}
                                                </v-list-item-subtitle>
                                                
                                            </v-list-item-content>
                                        </v-list-item>

                                        <span v-if="$store.state.settings.checkout.field_phone" class="default-address-badge text-uppercase font-weight-medium">
                                            <v-icon :size="12">mdi-phone</v-icon>
                                            <span v-text="a.phone"></span>
                                        </span>

                                    </v-row>
                                </v-card>
                            </v-col>
                        </template>

                        <!-- Get address in vuex -->
                        <v-col cols="12" md="4" style="position:relative" v-if="guestAddress.uid && addresses.length === 0">
                            <v-card class="c-card px-2 py-3 cursor-pointer" :class="[$vuetify.rtl ? 'text-right' : 'text-left', selected === guestAddress.uid ? 'selected-shipping-address' : '']">

                                <v-row align="center" class="mx-0" style="min-height: 152px">
                                        
                                    <v-list-item two-line>
                                        <v-list-item-content>

                                            <!-- Name -->
                                            <v-list-item-title v-if="$store.state.settings.checkout.field_name" class="fs-12 font-weight-bold d-inline-block text-truncate pb-1" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="guestAddress.name"></v-list-item-title>

                                            <!-- Address -->
                                            <v-list-item-subtitle v-if="$store.state.settings.checkout.field_address" class="fs-11 pt-1 d-inline-block text-truncate" :class="$vuetify.theme.dark ? 'font-weight-light' : 'font-weight-regular font-italic'" v-text="guestAddress.address"></v-list-item-subtitle>

                                            <!-- Country / State / City / Zipcode -->
                                            <v-list-item-subtitle class="fs-10 pt-2 d-inline-block text-truncate" :class="$vuetify.theme.dark ? 'white--text font-weight-light' : 'font-weight-regular black--text'">
                                                {{ guestAddress.state ? guestAddress.state : '' }}
                                                {{ guestAddress.state && guestAddress.city ? '⚊' : '' }}
                                                {{ guestAddress.city ? guestAddress.city : '' }}
                                                {{ guestAddress.city && guestAddress.zipcode ? '⚊' : '' }}
                                                {{ guestAddress.zipcode ? guestAddress.zipcode : '' }}
                                            </v-list-item-subtitle>
                                            
                                        </v-list-item-content>
                                    </v-list-item>

                                    <span v-if="$store.state.settings.checkout.field_phone" class="default-address-badge text-uppercase font-weight-medium">
                                        <v-icon :size="12">mdi-phone</v-icon>
                                        <span v-text="guestAddress.phone"></span>
                                    </span>

                                </v-row>

                            </v-card>
                        </v-col>

                        <!-- Create address -->
                        <v-col cols="12" md="4">
                            <v-card flat class="c-card px-2 py-3 cursor-pointer" :min-height="154" @click="dialog = true">
                                <v-row justify="center" align="center" class="mx-0" style="height: 152px;">
                                    <div class="text-center">
                                        <v-icon :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'" style="padding: 12px; border-radius: 50%; font-size: 25px; margin-bottom: 12px;" :style="$vuetify.theme.dark ? 'background-color: #4f4f4f; ' : 'background-color: #ebebeb;'">mdi-plus</v-icon>
                                        <span class="fs-11 font-weight-medium d-block" :class="$vuetify.theme.dark ? 'grey--text text--lighten-3' : 'grey--text text--darken-3'" v-t="'t_create_address'"></span>
                                        <span class="font-italic fs-9" v-t="'t_set_your_shipping_address'"></span>
                                    </div>
                                </v-row>
                            </v-card>
                        </v-col>

                    </v-row>

                    <!-- Continue -->
                    <v-btn depressed dark @click="nextStep()" color="indigo accent-3" class="mt-3 px-12" :class="$vuetify.rtl ? 'float-left' : 'float-right'">
                        <span v-t="'t_continue'" class="fs-11 font-weight-medium"></span>
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
    import randomstring from 'randomstring'

    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        async asyncData({ $axios, app, redirect, store }) {
            // Send request to server
            let response = await $axios.post('checkout/shipping/addresses')

            // Check if customer authenticated
            let isLoggedIn = app.$auth.loggedIn

            // Check if guest mode enabled
            if (!isLoggedIn && !store.state.settings.checkout.is_guest_checkout) {
                
                // You must login before you continue
                redirect('/checkout/auth')

            } else {

                return {
                    addresses: response.data.addresses,
                    countries: response.data.countries
                }

            }
        },

        data() {
            return {
                form: {
                    uid       : '',
                    name      : '',
                    phone     : '',
                    country_id: this.$store.state.settings.default_country,
                    state     : '',
                    city      : '',
                    zipcode   : '',
                    address   : ''
                },
                dialog   : this.$store.state.settings.checkout.is_guest_checkout && !this.$auth.loggedIn ? true : false,
                selected: null,
                errors  : [],
                loading : false
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
                title: this.$t('t_shipping_info'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_shipping_info') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('checkout/shipping') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_shipping_info') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('checkout/shipping') }  ]
            }
        },

        computed: {

            // List of products in cart
            products() {
                return this.$store.state.cart.itemsInCart
            },

            // Get guest address
            guestAddress() {
                return this.$store.state.address.address
            },

            // JSON LD
            breadcrumbs(){
                return [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('checkout/shipping'),
                        text: this.$t('t_shipping_info'),
                    }
                ]
            }

        },

        methods: {

            // Create address
            async create() {

                // Check if customer online
                if (this.$auth.loggedIn) {
                    
                    // Start loading
                    this.loading = true

                    // Set data
                    const data = {
                        name      : this.form.name,
                        phone     : this.form.phone,
                        country_id: this.form.country_id,
                        state     : this.form.state,
                        city      : this.form.city,
                        zipcode   : this.form.zipcode,
                        address   : this.form.address
                    }

                    // Send request to server
                    await this.$axios
                                .post('checkout/shipping/addresses/create', data)
                                .then(response => {

                                    // Set address
                                    this.$store.dispatch("address/setAddress", {
                                        uid       : response.data.uid,
                                        name      : response.data.name,
                                        country_id: response.data.country_id,
                                        state     : response.data.state,
                                        city      : response.data.city,
                                        zipcode   : response.data.zipcode,
                                        phone     : response.data.phone,
                                        address   : response.data.address
                                    })

                                    // Add address to list
                                    this.addresses.unshift({
                                        uid       : response.data.uid,
                                        name      : response.data.name,
                                        country_id: response.data.country_id,
                                        state     : response.data.state,
                                        city      : response.data.city,
                                        zipcode   : response.data.zipcode,
                                        phone     : response.data.phone,
                                        address   : response.data.address
                                    })

                                    // Set default address
                                    this.selected = response.data.uid

                                    // Close dialog
                                    this.dialog   = false

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

                } else {

                    // Guest checkout
                    // Generate address id
                    this.form.uid    = randomstring.generate(32)

                    // Set new address
                    this.$store.dispatch("address/setAddress", this.form)

                    this.selected   = this.form.uid

                    // Close dialog
                    this.dialog     = false

                }

            },

            // Set default shipping address
            setShippingAddress(address) {
                this.selected = address.uid
                this.$store.dispatch('address/setAddress', {
                    uid       : address.uid,
                    name      : address.name,
                    country_id: address.country_id,
                    state     : address.state,
                    city      : address.city,
                    zipcode   : address.zipcode,
                    phone     : address.phone,
                    address   : address.address
                })

            },

            // Go to next step
            nextStep() {
                
                // Check if a shipping address selected or not
                if (!this.selected) {
                    
                    // Notify customer to select or create an address
                    this.$message(this.$t('t_toast_select_create_address'), 'alert-rhombus', 'info')

                } else {

                    // Go to payment step
                    // We use regular js redirect here
                    // Because we need to load PayPal SDK
                    typeof window !== undefined ? window.location.href = this.$clientIndex('checkout/payment') : this.$router.push('/checkout/payment')

                }

            }

        }

    }
</script>