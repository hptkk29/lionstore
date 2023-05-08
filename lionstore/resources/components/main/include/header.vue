<template>
    <div class="main-desktop-header">
        <v-app-bar :height="45" flat class="mini-header">

            <!-- Contact us -->
            <div class="mdh-contact">
                <a :href="`tel:${ $store.state.settings.site_phone }`" v-if="$store.state.settings.site_phone">
                    <v-icon>mdi-phone</v-icon>
                    <span v-text="$store.state.settings.site_phone"></span>
                </a>
                <a :href="`mailto:${ $store.state.settings.site_email }`" v-if="$store.state.settings.site_email">
                    <v-icon>mdi-email</v-icon>
                    <span v-text="$store.state.settings.site_email"></span>
                </a>
                <nuxt-link to="/contact">
                    <v-icon :size="16">mdi-face-agent</v-icon>
                    <span v-t="'t_support'"></span>
                </nuxt-link>
            </div>

            <v-spacer />

            <!-- Languages -->
            <div class="mdh-currency-lang">

                <!-- Languages menu -->
                <v-menu :min-width="150" :nudge-bottom="12" offset-y :left="$vuetify.rtl" content-class="mini-header-menu">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-on="on" v-bind="attrs" class="mdh-currency-lang-menu mdh-currency">
                            <img :src="`/images/flags/${ getSelectedLanguage.flag }`" />
                            <span v-text="getSelectedLanguage.title"></span>
                            <v-icon>mdi-chevron-down</v-icon>
                        </div>
                    </template>
                    <v-card flat>
                        <ul class="px-0">
                            <template v-for="lang in languages">
                                <li :key="lang.code" :class="lang.code === $i18n.locale ? 'selected-language' : ''" @click="setLocale(lang.code)">
                                    <img :src="`/images/flags/${ lang.flag }`">
                                    <span v-text="lang.title"></span>
                                </li>
                            </template>
                        </ul>
                    </v-card>
                </v-menu>

            </div>

            <!-- Dark mode -->
            <div class="mini-header-dark-mode">
                <span v-t="'t_dark_mode'"></span>
                <v-switch hide-details :ripple="false" color="blue" :value="$vuetify.theme.dark" :input-value="$vuetify.theme.dark" @change="setDarkMode()"
                     dense
                    ></v-switch>
            </div>

        </v-app-bar>
        
        <v-app-bar :height="90" :color="$vuetify.theme.dark ? '#2c2c2c' : 'white'" flat class="large-header">

            <!-- Logo -->
            <nuxt-link to="/" class="desktop-logo width-20">
                <img :src="logo" :alt="$store.state.settings.site_title" />
            </nuxt-link>

            <v-spacer />

            <!-- Search -->
            <div class="desktop-live-search" v-click-outside-search="closeSearch">

                <!-- Search input -->
                <v-text-field solo hide-details flat
                    v-model="form.q" 
                    @input="search" 
                    @keyup.enter="goToSearch()" 
                    @focus="openSearch"
                    :placeholder="$t('t_main_search_placeholder')" 
                    color="grey darken-1" 
                    append-icon="mdi-magnify"
                    tabindex="0" 
                    :height="50" />
                
                <!-- Search results -->
                <div class="search-results" v-if="isResults && (results.tags.length > 0 || results.products.length > 0 || results.brands.length > 0)">

                    <!-- Loop throup tags -->
                    <template v-for="(tag, index) in results.tags.filter(item => item.toLowerCase().indexOf(form.q) > -1)">
                        <nuxt-link v-if="form.q" :to="`/search?q=${ tag }`" :key="`search-tags-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(tag)"></span>
                            <div class="search-type" v-t="'t_keyword'"></div>
                        </nuxt-link>
                    </template>

                    <!-- Loop throup brands -->
                    <template v-for="(brand, index) in results.brands">
                        <nuxt-link :to="`/brand/${ brand.handler }`" :key="`search-brands-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(brandName(brand))"></span>
                            <div class="search-type" v-t="'t_brand'"></div>
                        </nuxt-link>
                    </template>

                    <!-- Loop throup products -->
                    <template v-for="(product, index) in results.products">
                        <nuxt-link :to="`/product/${ product.handler }`" :key="`search-products-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(productTitle(product))"></span>
                            <div class="search-type" v-t="'t_product'"></div>
                        </nuxt-link>
                    </template>

                </div>
            </div>

            <v-spacer />

            <!-- Buttons -->
            <div class="main-header-buttons width-30" :class="$vuetify.rtl ? 'text-left' : 'text-right'">

                <!-- Login -->
                <nuxt-link to="/auth/login" class="mh-btn" v-if="!$auth.loggedIn">
                    <span class="mh-btn-icon pr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24"/>
                                <rect fill="#000000" opacity="0.3" transform="translate(9.000000, 12.000000) rotate(-270.000000) translate(-9.000000, -12.000000) " x="8" y="6" width="2" height="12" rx="1"/>
                                <path d="M20,7.00607258 C19.4477153,7.00607258 19,6.55855153 19,6.00650634 C19,5.45446114 19.4477153,5.00694009 20,5.00694009 L21,5.00694009 C23.209139,5.00694009 25,6.7970243 25,9.00520507 L25,15.001735 C25,17.2099158 23.209139,19 21,19 L9,19 C6.790861,19 5,17.2099158 5,15.001735 L5,8.99826498 C5,6.7900842 6.790861,5 9,5 L10.0000048,5 C10.5522896,5 11.0000048,5.44752105 11.0000048,5.99956624 C11.0000048,6.55161144 10.5522896,6.99913249 10.0000048,6.99913249 L9,6.99913249 C7.8954305,6.99913249 7,7.89417459 7,8.99826498 L7,15.001735 C7,16.1058254 7.8954305,17.0008675 9,17.0008675 L21,17.0008675 C22.1045695,17.0008675 23,16.1058254 23,15.001735 L23,9.00520507 C23,7.90111468 22.1045695,7.00607258 21,7.00607258 L20,7.00607258 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(15.000000, 12.000000) rotate(-90.000000) translate(-15.000000, -12.000000) "/>
                                <path d="M16.7928932,9.79289322 C17.1834175,9.40236893 17.8165825,9.40236893 18.2071068,9.79289322 C18.5976311,10.1834175 18.5976311,10.8165825 18.2071068,11.2071068 L15.2071068,14.2071068 C14.8165825,14.5976311 14.1834175,14.5976311 13.7928932,14.2071068 L10.7928932,11.2071068 C10.4023689,10.8165825 10.4023689,10.1834175 10.7928932,9.79289322 C11.1834175,9.40236893 11.8165825,9.40236893 12.2071068,9.79289322 L14.5,12.0857864 L16.7928932,9.79289322 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.500000, 12.000000) rotate(-90.000000) translate(-14.500000, -12.000000) "/>
                            </g>
                        </svg>
                    </span>
                    <span class="mh-btn-text" v-t="'t_login'"></span>
                </nuxt-link>

                <!-- Register -->
                <nuxt-link to="/auth/register" class="mh-btn" v-if="!$auth.loggedIn">
                    <span class="mh-btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24"/>
                                <path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                <path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/>
                            </g>
                        </svg>
                    </span>
                    <span class="mh-btn-text" v-t="'t_register'"></span>
                </nuxt-link>

                <!-- My account -->
                <account v-if="$auth.loggedIn" />

                <!-- My shopping cart -->
                <div class="mh-btn" @click="openBasket()">
                    <span class="mh-btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24"/>
                                <path d="M18.1446364,11.84388 L17.4471627,16.0287218 C17.4463569,16.0335568 17.4455155,16.0383857 17.4446387,16.0432083 C17.345843,16.5865846 16.8252597,16.9469884 16.2818833,16.8481927 L4.91303792,14.7811299 C4.53842737,14.7130189 4.23500006,14.4380834 4.13039941,14.0719812 L2.30560137,7.68518803 C2.28007524,7.59584656 2.26712532,7.50338343 2.26712532,7.4104669 C2.26712532,6.85818215 2.71484057,6.4104669 3.26712532,6.4104669 L16.9929851,6.4104669 L17.606173,3.78251876 C17.7307772,3.24850086 18.2068633,2.87071314 18.7552257,2.87071314 L20.8200821,2.87071314 C21.4717328,2.87071314 22,3.39898039 22,4.05063106 C22,4.70228173 21.4717328,5.23054898 20.8200821,5.23054898 L19.6915238,5.23054898 L18.1446364,11.84388 Z" fill="#000000" opacity="0.3"/>
                                <path d="M6.5,21 C5.67157288,21 5,20.3284271 5,19.5 C5,18.6715729 5.67157288,18 6.5,18 C7.32842712,18 8,18.6715729 8,19.5 C8,20.3284271 7.32842712,21 6.5,21 Z M15.5,21 C14.6715729,21 14,20.3284271 14,19.5 C14,18.6715729 14.6715729,18 15.5,18 C16.3284271,18 17,18.6715729 17,19.5 C17,20.3284271 16.3284271,21 15.5,21 Z" fill="#000000"/>
                            </g>
                        </svg>
                    </span>
                    <span class="mh-btn-text" v-t="'t_my_cart'"></span>
                    <span class="mh-btn-badge" v-if="$store.state.cart.itemsInCart.length" v-text="$store.state.cart.itemsInCart.length"></span>
                </div>

            </div>

        </v-app-bar>
    </div>
</template>

<script>
    import { io } from "socket.io-client";
    import { loadMessages } from '~/plugins/i18n'

    export default {

        name: 'main-header',

        components: {
			account: () => import('~/components/main/partials/account')
		},

        data() {
            return {
                form   : {
                    q: ''
                },
                results: {
                    products: [],
                    brands  : [],
                    tags    : []
                },
                isResults: false
            }
        },

        computed: {

            // Available languages
            languages() {

                // Set empty array variable
                var data = []

                // Check for supported languages
                this.$store.state.settings.languages.en ? data.push({ title: 'English', code: 'en', flag: 'US.png' }) : ''
                this.$store.state.settings.languages.de ? data.push({ title: 'Deutsch', code: 'de', flag: 'de.png' }) : ''
                this.$store.state.settings.languages.es ? data.push({ title: 'Español', code: 'es', flag: 'ES.png' }) : ''
                this.$store.state.settings.languages.fr ? data.push({ title: 'Français', code: 'fr', flag: 'FR.png' }) : ''
                this.$store.state.settings.languages.hu ? data.push({ title: 'Magyar', code: 'hu', flag: 'HU.png' }) : ''
                this.$store.state.settings.languages.nl ? data.push({ title: 'Nederlands', code: 'nl', flag: 'NL.png' }) : ''
                this.$store.state.settings.languages.po ? data.push({ title: 'Polski', code: 'po', flag: 'PL.png' }) : ''
                this.$store.state.settings.languages.pt ? data.push({ title: 'Português', code: 'pt', flag: 'BR.png' }) : ''
                this.$store.state.settings.languages.ro ? data.push({ title: 'Română', code: 'ro', flag: 'RO.png' }) : ''
                this.$store.state.settings.languages.az ? data.push({ title: 'Azərbaycan', code: 'az', flag: 'AZ.png' }) : ''
                this.$store.state.settings.languages.cn ? data.push({ title: '简体中文', code: 'cn', flag: 'CN.png' }) : ''
                this.$store.state.settings.languages.jp ? data.push({ title: '日本語', code: 'jp', flag: 'JP.png' }) : ''
                this.$store.state.settings.languages.hi ? data.push({ title: 'भारतीय', code: 'hi', flag: 'IN.png' }) : ''
                this.$store.state.settings.languages.ru ? data.push({ title: 'Pусский', code: 'ru', flag: 'RU.png' }) : ''
                this.$store.state.settings.languages.th ? data.push({ title: 'ไทย', code: 'th', flag: 'TH.png' }) : ''
                this.$store.state.settings.languages.tr ? data.push({ title: 'Türkçe‪', code: 'tr', flag: 'TR.png' }) : ''
                this.$store.state.settings.languages.ar ? data.push({ title: 'العربية', code: 'ar', flag: 'SA.png' }) : ''
                this.$store.state.settings.languages.ua ? data.push({ title: 'Українська', code: 'ua', flag: 'UA.png' }) : ''

                // Return langs
                return data

            },

            // Get selected language
            getSelectedLanguage() {

                // Get currenct locale
                const locale = this.$i18n.locale

                // Search this locale in supported languages
                const find = this.languages.find(item => {
                    return item.code === locale
                })

                // Check if locale exits
                if (find) {
                    return {
                        flag : find.flag,
                        code : find.code,
                        title: find.title
                    }
                } else {

                    // Return English as default
                    // to prevent errors
                    return {
                        flag : 'US.png',
                        code : 'en',
                        title: 'English'
                    }

                }

            },

            // Get site logo
            logo() {

                // Set logo 
                const logo = this.$store.state.settings.desktop_logo

                // Check if site has a desktop logo
                if (logo) {

                    return this.$clientIndex(`uploads/${ logo.file_folder }/${ logo.uid }.webp`)

                } else {

                    // Return default logo
                    return this.$clientIndex('images/default/logo.svg')

                }

            }

        },

        methods: {

            // Set lcale
            async setLocale(locale) {

                await loadMessages(locale)

                this.$i18n.locale = locale

                // Check if rtl required
                if (locale === 'ar') {
                    this.$vuetify.rtl = true
                } else {
                    this.$vuetify.rtl = false
                }

                // Set locale
                this.$cookies.set('locale', locale, this.$cookiesOptions())

                // Force update
                this.$forceUpdate()

            },

            // Set dark mode ON/OFF
            setDarkMode() {

                // Get dark mode status
                const status  = this.$vuetify.theme.dark

                // Set cookies options
                const options = this.$cookiesOptions()

                // Check if dark mode enabled
                if (status) {
                    
                    // Remove cookie
                    this.$cookies.remove('dark_mode', options)

                    // Disable dark mode
                    this.$vuetify.theme.dark = false

                } else {

                    // Dark mode not yet enabled
                    this.$cookies.set('dark_mode', "enabled", options)

                    // Enable dark mode
                    this.$vuetify.theme.dark = true

                }
                
                // Force update
                this.$forceUpdate()
            },

            // Live search
            async search() {

                // Check if search keyword not empty
                if (this.form.q && this.form.q.length > 2) {
                   
                    try {

                        // Send
                        await this.$axios.post('search/ajax', { q: this.form.q })
                                        .catch(error => {

                                            console.log(error)

                                        })
                                        .finally(() => {
                                        })

                    } catch (e) {
                        console.log(e)
                    }

                }
                
            },

            // Open Basket
            openBasket() {

                this.$nuxt.$emit('open_shopping_cart')

            },

            // Get brand name
            brandName(brand) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode brand name
                const name   = JSON.parse(brand.translation.name)

                return name[locale]
            },

            // Product title
            productTitle(product) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]
            },

            // Replace matched words in search results
            replaceMatched(text) {
                try {
                    var regEx  = new RegExp("(" + this.form.q + ")(?!([^<]+)?>)", "gi");

                    var output = text.replace(regEx, "<strong>$1</strong>");

                    return output
                } catch (error) {
                    return text
                }
            },

            // Open search results
            openSearch(event) {
                this.isResults = true
            },

            // Close search results
            closeSearch(event) {
                this.isResults = false
            },

            // Go to search page
            goToSearch() {

                // Check if form has keyword
                if (this.form.q) {
                    
                    this.isResults = false
                    
                    this.$router.push(`/search?q=${ this.form.q }`)

                }

            }

        },

        mounted() {

            // Listen for live search events
            const socket = io(process.env.APP_URL, {
                withCredentials: true
            })

            socket.on('live::search', (data) => {
                this.results.products = data.products
                this.results.brands   = data.brands
                this.results.tags     = data.tags
                this.isResults        = true

            })
        }

    }
</script>