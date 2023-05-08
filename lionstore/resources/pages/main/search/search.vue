<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <!-- Mobile -->
        <v-row v-if="$device.isMobileOrTablet">

            <!-- Filter -->
            <v-col cols="12">
                <div class="section-title">
                    <v-row align="center" justify="space-between" class="mx-0">
                        <div>
                            <div class="section-title-h1">
                                <h1>{{ $t('t_search_q', { q: this.$route.query.q }) }}</h1>
                            </div>
                        </div>
                        <div class="slider-arrows">
                            <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="dialog.filter = !dialog.filter">
                                <span v-t="'t_filter_search'"></span>
                            </v-btn>
                        </div>
                    </v-row>
                </div>
            </v-col>

            <!-- Filter options -->
            <v-dialog v-model="dialog.filter">
                <v-card class="c-card pa-0">

                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_filter_search'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialog.filter = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card-text class="pt-8 px-4">

                        <!-- Categories -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_categories'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">

                                <!-- Categories -->
                                <template v-for="(category, index) in categories">
                                    <v-checkbox  dense :ripple="false"
                                        v-model="form.cats"
                                        :value="category.id"
                                        :key="`search-category-${index}`"
                                        color="indigo accent-3"
                                        class="mt-0 mb-1"
                                        hide-details>
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(category.translation.title)[$i18n.locale]"></span>
                                        </template>
                                    </v-checkbox>
                                </template>

                            </v-card-text>
                        </v-card>

                        <!-- SubCategories -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_subcategories'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">

                                <!-- SubCategories -->
                                <template v-for="(subcategory, index) in subcategories">
                                    <v-checkbox  dense :ripple="false"
                                        v-model="form.subs"
                                        :value="subcategory.id"
                                        :key="`search-subcategory-${index}`"
                                        color="indigo accent-3"
                                        class="mt-0 mb-1"
                                        hide-details>
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(subcategory.translation.title)[$i18n.locale]"></span>
                                        </template>
                                    </v-checkbox>
                                </template>

                            </v-card-text>
                        </v-card>

                        <!-- ChildCategories -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_childcategories'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">

                                <!-- ChildCategories -->
                                <template v-for="(childcategory, index) in childcategories">
                                    <v-checkbox  dense :ripple="false"
                                        v-model="form.childs"
                                        :value="childcategory.id"
                                        :key="`search-childcategory-${index}`"
                                        color="indigo accent-3"
                                        class="mt-0 mb-1"
                                        hide-details>
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(childcategory.translation.title)[$i18n.locale]"></span>
                                        </template>
                                    </v-checkbox>
                                </template>

                            </v-card-text>
                        </v-card>

                        <!-- Brands -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_brands'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">

                                <!-- Brands -->
                                <template v-for="(brand, index) in brands">
                                    <v-checkbox  dense :ripple="false"
                                        v-model="form.brands"
                                        :value="brand.id"
                                        :key="`search-brand-${index}`"
                                        color="indigo accent-3"
                                        class="mt-0 mb-1"
                                        hide-details>
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(brand.translation.name)[$i18n.locale]"></span>
                                        </template>
                                    </v-checkbox>
                                </template>

                            </v-card-text>
                        </v-card>

                        <!-- Sort by -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_sort_by'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">

                                <!-- Sort by types -->
                                <v-radio-group dense v-model="form.sort_by" hide-details class="mt-0">
                                    <template v-for="(sort, index) in sortByTypes">
                                        <v-radio :ripple="false"
                                            :value="sort.value"
                                            :key="`search-sort-by-${index}`"
                                            color="indigo accent-3"
                                            class="mt-0 mb-1">
                                            <template v-slot:label>
                                                <span class="ff-default fs-11 font-weight-bold" style="padding-top: 2px" v-text="sort.text"></span>
                                            </template>
                                        </v-radio>
                                    </template>
                                </v-radio-group>

                            </v-card-text>
                        </v-card>

                        <!-- Price -->
                        <v-card class="c-card search-filter mb-6">
                            <v-toolbar flat :height="60" class="card-toolbar px-2">
                                <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_price'"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>

                            <v-card-text class="search-filter-section-scroll px-6">
                                <v-row>

                                    <!-- Min price -->
                                    <v-col cols="12">
                                        <v-text-field outlined dense hide-details
                                            v-model="form.min_price"
                                            :placeholder="$t('t_enter_min_price')"
                                            type="number"
                                            color="indigo accent-3" />
                                    </v-col>

                                    <!-- Max price -->
                                    <v-col cols="12">
                                        <v-text-field outlined dense hide-details
                                            v-model="form.max_price"
                                            :placeholder="$t('t_enter_max_price')"
                                            type="number"
                                            color="indigo accent-3" />
                                    </v-col>

                                    <!-- Filter -->
                                    <v-col cols="12">
                                        <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="filter()" class="tiktok-search-event">
                                            <span class="ff-default fs-11 fw-600" style="padding-top:2px" v-t="'t_filter_results'" v-if="!loading"></span>
                                        </v-btn>
                                    </v-col>

                                </v-row>
                            </v-card-text>

                        </v-card>
                    
                    </v-card-text>

                </v-card>
            </v-dialog>

            <!-- Results -->
            <v-col cols="12" v-if="products.length > 0">
                <v-row>

                    <template v-for="(product, index) in products">
                        <v-col cols="6" :key="`search-product-${index}`">
                            <product-card :product="product" />
                        </v-col>
                    </template>

                    <!-- Pagination -->
                    <v-col cols="12" class="text-center">
                        <v-pagination
                            v-if="productsData.total > productsData.per_page"
                            v-model="productsData.current_page"
                            :length="productsData.last_page"
                            @input="getNextPage"
                            :total-visible="7"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                            color="indigo accent-3"
                            class="pa-4"
                            ></v-pagination>
                    </v-col>

                </v-row>
            </v-col>

            <!-- No resuls -->
            <v-col cols="12" v-else>
                <v-alert border="left" icon="mdi-information-variant" text color="indigo accent-3" style="margin-top:2px">
                    <span class="ff-default fs-11 font-weight-medium" v-t="'t_no_results_matching_your_search'"></span>
                </v-alert>
            </v-col>

        </v-row>

        <!-- Desktop -->
        <v-row v-else>

            <!-- Filter -->
            <v-col cols="3">

                <!-- Categories -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_categories'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">

                        <!-- Categories -->
                        <template v-for="(category, index) in categories">
                            <v-checkbox  dense :ripple="false"
                                v-model="form.cats"
                                :value="category.id"
                                :key="`search-category-${index}`"
                                color="indigo accent-3"
                                class="mt-0 mb-1"
                                hide-details>
                                <template v-slot:label>
                                    <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(category.translation.title)[$i18n.locale]"></span>
                                </template>
                            </v-checkbox>
                        </template>

                    </v-card-text>
                </v-card>

                <!-- SubCategories -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_subcategories'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">

                        <!-- SubCategories -->
                        <template v-for="(subcategory, index) in subcategories">
                            <v-checkbox  dense :ripple="false"
                                v-model="form.subs"
                                :value="subcategory.id"
                                :key="`search-subcategory-${index}`"
                                color="indigo accent-3"
                                class="mt-0 mb-1"
                                hide-details>
                                <template v-slot:label>
                                    <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(subcategory.translation.title)[$i18n.locale]"></span>
                                </template>
                            </v-checkbox>
                        </template>

                    </v-card-text>
                </v-card>

                <!-- ChildCategories -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_childcategories'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">

                        <!-- ChildCategories -->
                        <template v-for="(childcategory, index) in childcategories">
                            <v-checkbox  dense :ripple="false"
                                v-model="form.childs"
                                :value="childcategory.id"
                                :key="`search-childcategory-${index}`"
                                color="indigo accent-3"
                                class="mt-0 mb-1"
                                hide-details>
                                <template v-slot:label>
                                    <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(childcategory.translation.title)[$i18n.locale]"></span>
                                </template>
                            </v-checkbox>
                        </template>

                    </v-card-text>
                </v-card>

                <!-- Brands -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_brands'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">

                        <!-- Brands -->
                        <template v-for="(brand, index) in brands">
                            <v-checkbox  dense :ripple="false"
                                v-model="form.brands"
                                :value="brand.id"
                                :key="`search-brand-${index}`"
                                color="indigo accent-3"
                                class="mt-0 mb-1"
                                hide-details>
                                <template v-slot:label>
                                    <span class="ff-default fs-11 font-weight-bold" style="padding-top:2px" v-text="JSON.parse(brand.translation.name)[$i18n.locale]"></span>
                                </template>
                            </v-checkbox>
                        </template>

                    </v-card-text>
                </v-card>

                <!-- Sort by -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_sort_by'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">

                        <!-- Sort by types -->
                        <v-radio-group dense v-model="form.sort_by" hide-details class="mt-0">
                            <template v-for="(sort, index) in sortByTypes">
                                <v-radio :ripple="false"
                                    :value="sort.value"
                                    :key="`search-sort-by-${index}`"
                                    color="indigo accent-3"
                                    class="mt-0 mb-1">
                                    <template v-slot:label>
                                        <span class="ff-default fs-11 font-weight-bold" style="padding-top: 2px" v-text="sort.text"></span>
                                    </template>
                                </v-radio>
                            </template>
                        </v-radio-group>

                    </v-card-text>
                </v-card>

                <!-- Price -->
                <v-card class="c-card search-filter mb-6">
                    <v-toolbar flat :height="60" class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-12" v-t="'t_price'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="search-filter-section-scroll px-6">
                        <v-row>

                            <!-- Min price -->
                            <v-col cols="12">
                                <v-text-field outlined dense hide-details
                                    v-model="form.min_price"
                                    :placeholder="$t('t_enter_min_price')"
                                    type="number"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Max price -->
                            <v-col cols="12">
                                <v-text-field outlined dense hide-details
                                    v-model="form.max_price"
                                    :placeholder="$t('t_enter_max_price')"
                                    type="number"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Filter -->
                            <v-col cols="12">
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="filter()" class="tiktok-search-event">
                                    <span class="ff-default fs-11 fw-600" style="padding-top:2px" v-t="'t_filter_results'" v-if="!loading"></span>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>

                </v-card>

            </v-col>

            <!-- Results -->
            <v-col cols="9" v-if="products.length > 0">
                <v-row>

                    <template v-for="(product, index) in products">
                        <v-col cols="3" :key="`search-product-${index}`">
                            <product-card :product="product" />
                        </v-col>
                    </template>

                    <!-- Pagination -->
                    <v-col cols="12" class="text-center">
                        <v-pagination
                            v-if="productsData.total > productsData.per_page"
                            v-model="productsData.current_page"
                            :length="productsData.last_page"
                            @input="getNextPage"
                            :total-visible="7"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                            color="indigo accent-3"
                            class="pa-4"
                            ></v-pagination>
                    </v-col>

                </v-row>
            </v-col>

            <!-- No resuls -->
            <v-col cols="9" v-else>
                <v-alert border="left" icon="mdi-information-variant" text color="indigo accent-3" style="margin-top:2px">
                    <span class="ff-default fs-11 font-weight-medium" v-t="'t_no_results_matching_your_search'"></span>
                </v-alert>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
const queryString = require('query-string');

export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    async watchQuery(newQuery, oldQuery) {
        // Send request to server
        let response = await this.$axios.get(`search/results?q=${ newQuery.q }`)

        this.categories     = response.data.categories
        this.subcategories  = response.data.subcategories
        this.childcategories= response.data.childcategories
        this.brands         = response.data.brands
        this.productsData   = response.data.results.meta
        this.products       = response.data.results.data
        this.dialog.filter  = false
    },

    async asyncData({ app, $axios, query, redirect }) {

        // Check if no query keyword set
        if (!query.q) {
            redirect('/')
        }

        // Send request to server
        let response = await $axios.get(`search/results?q=${ query.q }`)

        return {
            categories     : response.data.categories,
            subcategories  : response.data.subcategories,
            childcategories: response.data.childcategories,
            brands         : response.data.brands,
            productsData   : response.data.results.meta,
            products       : response.data.results.data
        }
    },

    data() {
        return {
            loading: false,
            form: {
                cats     : [],
                subs     : [],
                childs   : [],
                brands   : [],
                sort_by  : '',
                min_price: '',
                max_price: '',
                q        : this.$route.query.q
            },
            dialog: {
                filter: false
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
            title: this.$t('t_search_q', { q: this.$route.query.q }),

            // Set meta tags
            meta: [

                // Description
                { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                // OG Title
                { hid: 'og:type', property: 'og:type', content: false },

                // OG Title
                { hid: 'og:title', property: 'og:title', content: `${ this.$t('t_search_q', { q: this.$route.query.q }) } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                // OG Site Name
                { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                // OG Description
                { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                // OG Image
                { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                // OG Url
                { hid: 'og:url', property: 'og:url', content: this.$clientIndex(`search?q=${ this.$route.query.q }`) },

                // Twitter Title
                { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$t('t_search_q', { q: this.$route.query.q }) } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                // Twitter Description
                { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                // Twitter Image
                { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                // Twitter Image Alt
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                // Twitter Card
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                
            ],
            link: [ { rel: 'canonical', href: this.$clientIndex(`search?q=${ this.$route.query.q }`) }  ]
        }
    },

    computed: {

        // Sort by types
        sortByTypes() {
            return [
                { value: 'newest', text: this.$t('t_recently_added') },
                { value: 'oldest', text: this.$t('t_oldest_first') },
                { value: 'top_rated', text: this.$t('t_top_rated') },
                { value: 'popular', text: this.$t('t_most_popular') },
                { value: 'cheap_price', text: this.$t('t_cheapest_first') },
                { value: 'high_price', text: this.$t('t_high_price') }
            ]
        },

        // JSON LD
        breadcrumbs(){
            return [
                {
                    url: this.$clientIndex(),
                    text: this.$t('t_home'),
                },
                {
                    url: this.$clientIndex(`search?q=${ this.$route.query.q }`),
                    text: this.$route.query.q,
                }
            ]
        },

    },

    methods: {

        // Filter search
        async filter() {

            // Start loading
            this.loading = true

            // Set an empty object
            var data     = {}

            // Check if form has categories
            if (Array.isArray(this.form.cats) && this.form.cats.length > 0) {
                data.categories = this.form.cats.join()
                data.preload    = 1
            }

            // Check if form has subcategories
            if (Array.isArray(this.form.subs) && this.form.subs.length > 0) {
                data.subcategories = this.form.subs.join()
            }

            // Check if form has childcategories
            if (Array.isArray(this.form.childs) && this.form.childs.length > 0) {
                data.childcategories = this.form.childs.join()
            }

            // Check if form has brands
            if (Array.isArray(this.form.brands) && this.form.brands.length > 0) {
                data.brands = this.form.brands.join()
            }

            // Check if form has sort by
            if (this.form.sort_by) {
                data.sort_by = this.form.sort_by
            }

            // Check if form has max price
            if (this.form.max_price) {
                data.max_price = this.form.max_price
            }

            // Check if form has min price
            if (this.form.min_price) {
                data.min_price = this.form.min_price
            }

            // Check if form has keyword
            if (this.form.q) {
                data.q = this.form.q
            }

            // Set url queries
            const queries = queryString.stringify(data);

            // Set request url
            const url     = `search/results?${ decodeURIComponent(queries) }`

            // Send request to server
            await this
                    .$axios
                    .get(url)
                    .then(response => {

                        // Set products
                        this.productsData  = response.data.results.meta,
                        this.products      = response.data.results.data

                        this.dialog.filter = false

                        // Scroll to top
                        this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                        // Run analytics tools
                        if (process.client) {
                            
                            // Snapchat Pixel
                            if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                window.snaptr('track', 'SEARCH',  { 
                                    'search_string': this.form.q

                                });
                            }

                            // Facebook Pixel
                            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                window._fbq('track', 'Search', {
                                    'search_string': this.form.q
                                })
                            }

                        }

                    })
                    .catch(error => {
                        // Show error toast
                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                    })
                    .finally(() => {
                        // Stop loader
                        this.loading = false
                    })

        },

        // Get next page
        async getNextPage(page = 1) {

            // Start loading
            this.loading = true

            // Set an empty object
            var data     = {}

            // Check if form has categories
            if (Array.isArray(this.form.cats) && this.form.cats.length > 0) {
                data.categories = this.form.cats.join()
                data.preload    = 1
            }

            // Check if form has subcategories
            if (Array.isArray(this.form.subs) && this.form.subs.length > 0) {
                data.subcategories = this.form.subs.join()
            }

            // Check if form has childcategories
            if (Array.isArray(this.form.childs) && this.form.childs.length > 0) {
                data.childcategories = this.form.childs.join()
            }

            // Check if form has brands
            if (Array.isArray(this.form.brands) && this.form.brands.length > 0) {
                data.brands = this.form.brands.join()
            }

            // Check if form has sort by
            if (this.form.sort_by) {
                data.sort_by = this.form.sort_by
            }

            // Check if form has max price
            if (this.form.max_price) {
                data.max_price = this.form.max_price
            }

            // Check if form has min price
            if (this.form.min_price) {
                data.min_price = this.form.min_price
            }

            // Check if form has keyword
            if (this.form.q) {
                data.q = this.form.q
            }

            // Set page
            data.page     = page

            // Set url queries
            const queries = queryString.stringify(data);

            // Set request url
            const url     = `search/results?${ decodeURIComponent(queries) }`

            // Send request to server
            await this
                    .$axios
                    .get(url)
                    .then(response => {

                        // Set products
                        this.productsData  = response.data.results.meta,
                        this.products      = response.data.results.data
                        this.dialog.filter = false

                        // Scroll to top
                        this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                        // Run analytics tools
                        if (process.client) {
                            
                            // Snapchat Pixel
                            if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                window.snaptr('track', 'SEARCH',  { 
                                    'search_string': this.form.q

                                });
                            }

                            // Facebook Pixel
                            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                window._fbq('track', 'Search', {
                                    'search_string': this.form.q
                                })
                            }

                        }

                    })
                    .catch(error => {
                        // Show error toast
                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                    })
                    .finally(() => {
                        // Stop loader
                        this.loading = false
                    })

        }

    },

    mounted() {

        // Run analytics tools
        if (process.client) {
            
            // Snapchat Pixel
            if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                window.snaptr('track', 'SEARCH',  { 
                    'search_string': this.form.q

                });
            }

            // Facebook Pixel
            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                window._fbq('track', 'Search', {
                    'search_string': this.form.q
                })
            }

        }

    }

}
</script>