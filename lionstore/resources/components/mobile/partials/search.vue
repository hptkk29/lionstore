<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card tile class="mobile-live-search">
            <v-toolbar flat class="px-0">

                <!-- Go back -->
                <v-btn icon class="mr-3" :class="$vuetify.rtl ? 'mr-2' : 'ml-2'" @click="dialog = false">
                    <v-icon :size="20" :color="$vuetify.theme.dark ? '#a6a6a6' : '#6e6e6e'">{{ $vuetify.rtl ? 'mdi-arrow-right' : 'mdi-arrow-left' }}</v-icon>
                </v-btn>

                <!-- Search input -->
                <div class="live-search-input">
                    <v-text-field solo single-line flat hide-details
                        @input="search" 
                        @keyup.enter="goToSearch()" 
                        :placeholder="$t('t_main_search_placeholder')" 
                        background-color="transparent"
                        color="grey darken-1"
                        v-model="keyword" 
                        tabindex="0"
                        :height="55" 
                    ></v-text-field>
                </div>
                
            </v-toolbar>

            <v-card-text class="px-1 pt-4">

                <!-- Search results -->
                <div class="search-results" v-if="isResults && (results.tags.length > 0 || results.products.length > 0 || results.brands.length > 0)">

                    <!-- Loop throup tags -->
                    <template v-for="(tag, index) in results.tags.filter(item => item.toLowerCase().indexOf(keyword) > -1)">
                        <nuxt-link v-if="keyword" :to="`/search?q=${ tag }`" :key="`search-tags-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(tag)"></span>
                            <div class="search-type" v-t="'t_keyword'"></div>
                        </nuxt-link>
                    </template>

                    <!-- Loop throup brands -->
                    <template v-for="(brand, index) in results.brands">
                        <nuxt-link @click.native="dialog = false" :to="`/brand/${ brand.handler }`" :key="`search-brands-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(brandName(brand))"></span>
                            <div class="search-type" v-t="'t_brand'"></div>
                        </nuxt-link>
                    </template>

                    <!-- Loop throup products -->
                    <template v-for="(product, index) in results.products">
                        <nuxt-link @click.native="dialog = false" :to="`/product/${ product.handler }`" :key="`search-products-${ index }`" class="search-value-container">
                            <span class="search-keyword" v-html="replaceMatched(productTitle(product))"></span>
                            <div class="search-type" v-t="'t_product'"></div>
                        </nuxt-link>
                    </template>

                </div>

            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
import { io } from "socket.io-client";

export default {
    
    data() {
        return {
            dialog: false,
            keyword: null,
            results: {
                products: [],
                brands  : [],
                tags    : []
            },
            isResults: false
        }
    },

    watch: {
        dialog: {
            handler: function (val, oldVal) {
                if (val === true) {
                    this.results.products = []
                    this.results.brands   = []
                    this.results.tags     = []
                    this.isResults        = false
                    this.keyword          = null
                }
            },
            deep: true
        }
    },

    created() {
        this.$nuxt.$on('open::mobile::search', () => {
            this.dialog = true
        })
    },

    methods: {

        // Live search
        async search() {

            // Check if search keyword not empty
            if (this.keyword && this.keyword.length > 2) {
                
                try {

                    // Send
                    await this.$axios.post('search/ajax', { q: this.keyword })
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

        // Replace matched words in search results
        replaceMatched(text) {
            try {
                var regEx  = new RegExp("(" + this.keyword + ")(?!([^<]+)?>)", "gi");

                var output = text.replace(regEx, "<strong>$1</strong>");

                return output
            } catch (error) {
                return text
            }
        },

        // Go to search page
        goToSearch() {

            // Check if form has keyword
            if (this.keyword) {
                
                this.isResults = false

                // Close dialog
                this.dialog    = false
                
                this.$router.push(`/search?q=${ this.keyword }`)

            }

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