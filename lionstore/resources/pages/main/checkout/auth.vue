<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

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
                    
                    <v-row class="my-6">

                            <!-- Login -->
                            <v-col cols="12" :md="is_guest ? 4 : 6">
                                <v-card flat class="c-card px-2 py-3 cursor-pointer" :min-height="154" nuxt to="/auth/login?redirect=/checkout/shipping">
                                    <v-row justify="center" align="center" class="mx-0" style="height: 152px;">
                                        <div class="text-center">
                                            <v-icon :color="$vuetify.theme.dark ? 'white' : 'grey darken-2'" style="padding: 12px; border-radius: 50%; font-size: 25px; margin-bottom: 12px;" :style="$vuetify.theme.dark ? 'background-color: #4f4f4f; ' : 'background-color: #ebebeb;'">mdi-login</v-icon>
                                            <span class="fs-11 fw-600 d-block" :class="$vuetify.theme.dark ? 'grey--text text--lighten-3' : 'grey--text text--darken-3'" v-t="'t_login_to_your_account'"></span>
                                            <span class="font-italic fs-9" v-t="'t_if_you_have_account_checkout'"></span>
                                        </div>
                                    </v-row>
                                </v-card>
                            </v-col>

                            <!-- Register -->
                            <v-col cols="12" :md="is_guest ? 4 : 6">
                                <v-card flat class="c-card px-2 py-3 cursor-pointer" :min-height="154" nuxt to="/auth/register?redirect=/checkout/shipping">
                                    <v-row justify="center" align="center" class="mx-0" style="height: 152px;">
                                        <div class="text-center">
                                            <v-icon :color="$vuetify.theme.dark ? 'white' : 'grey darken-2'" style="padding: 12px; border-radius: 50%; font-size: 25px; margin-bottom: 12px;" :style="$vuetify.theme.dark ? 'background-color: #4f4f4f; ' : 'background-color: #ebebeb;'">mdi-account-plus</v-icon>
                                            <span class="fs-11 fw-600 d-block" :class="$vuetify.theme.dark ? 'grey--text text--lighten-3' : 'grey--text text--darken-3'" v-t="'t_create_new_account'"></span>
                                            <span class="font-italic fs-9" v-t="'t_create_account_follow_orders'"></span>
                                        </div>
                                    </v-row>
                                </v-card>
                            </v-col>

                            <!-- Guest -->
                            <v-col cols="12" md="4" v-if="is_guest">
                                <v-card flat class="c-card px-2 py-3 cursor-pointer" :min-height="154" nuxt to="/checkout/shipping">
                                    <v-row justify="center" align="center" class="mx-0" style="height: 152px;">
                                        <div class="text-center">
                                            <v-icon :color="$vuetify.theme.dark ? 'white' : 'grey darken-2'" style="padding: 12px; border-radius: 50%; font-size: 25px; margin-bottom: 12px;" :style="$vuetify.theme.dark ? 'background-color: #4f4f4f; ' : 'background-color: #ebebeb;'">mdi-incognito</v-icon>
                                            <span class="fs-11 fw-600 d-block" :class="$vuetify.theme.dark ? 'grey--text text--lighten-3' : 'grey--text text--darken-3'" v-t="'t_checkout_as_guest'"></span>
                                            <span class="font-italic fs-9" v-t="'t_progress_to_shipping_info'"></span>
                                        </div>
                                    </v-row>
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
    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        async asyncData({ $axios }) {
            // Send request to server
            let response = await $axios.post('checkout/auth/fetch')

            return {
                is_guest: response.data.is_guest_checkout
            }
        },

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
                title: this.$t('t_my_account'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_my_account') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('checkout/auth') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_my_account') } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('checkout/auth') }  ]
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
                        url: this.$clientIndex('checkout/auth'),
                        text: this.$t('t_my_account'),
                    }
                ]
            }

        }

    }
</script>