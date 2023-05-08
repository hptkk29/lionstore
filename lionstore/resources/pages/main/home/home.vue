<template>
    <v-container fluid grid-list-xl>

        <!-- Mobile -->
        <v-row class="mb-12" v-if="$device.isMobileOrTablet">

            <!-- Sliders -->
            <v-col cols="12" v-if="sliders.length > 0">
                <v-carousel
                    :height="250"
                    hide-delimiter-background
                    show-arrows-on-hover
                    class="desktop-sliders"
                    id="desktop-sliders-element"
                    cycle
                >

                    <template v-for="(slide, i) in sliders">

                        <!-- Link inside -->
                        <v-carousel-item :ripple="false" :key="i" nuxt :to="slide.link_value" :src="slider(slide)" v-if="slide.link_type === 'inside'" />

                        <!-- Link outside -->
                        <v-carousel-item :ripple="false" :key="i" :href="slide.link_value" :src="slider(slide)" v-if="slide.link_type === 'outside'" />

                    </template>

                </v-carousel>
            </v-col>

            <!-- Mobile categories -->
            <v-col cols="12" class="mt-7" v-if="categories.length > 0">
                <v-row>

                    <!-- Section title -->
                    <v-col cols="12">
                        <div class="section-title">
                            <v-row align="center" justify="space-between" class="mx-0">
                                <div>
                                    <div class="section-title-h1">
                                        <h1 v-t="'t_categories'"></h1>
                                    </div>
                                </div>
                            </v-row>
                        </div>
                    </v-col>
                    <template v-for="(category, index) in categories">
                        <v-col cols="3" :key="`mobile-home-${index}`" class="text-center">
                            <nuxt-link :to="`/category/${ category.handler }`" class="mb-3">
                                <v-img :src="categoryIcon(category)" :alt="categoryTitle(category)" :width="50" :height="50" class="mx-auto"></v-img>
                                <span class="fs-10 font-weight-medium mt-3 d-block" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="categoryTitle(category)"></span>
                            </nuxt-link>
                        </v-col>
                    </template>
                </v-row>
            </v-col>

        </v-row>

        <!-- Desktop -->
        <v-row class="mb-12" v-else>

            <!-- Categories -->
            <v-col cols="3" v-if="categories.length > 0">

                <v-card class="header-category-cnt c-card" id="main-categories">
                    <v-toolbar flat dense class="card-toolbar px-2">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_categories')"></v-toolbar-title>
                    </v-toolbar>
                    <div class="header-category-list">
                        <ul class="header-category-list-flex">

                            <template v-for="(category, i) in categories">
                                <li class="cate-item" :key="`home-categories-${ i }`">
                                    <div class="cate-title">
                                        <nuxt-link :to="`/category/${ category.handler }`">
                                            <span v-text="categoryTitle(category)"></span>
                                        </nuxt-link>
                                    </div>
                                    <div class="cate-cnt c-card" :style="`width: ${ categories_menu_width }px`">

                                        <!-- Subcategory && Childcategories -->
                                        <v-row>
                                            <template v-for="(subcategory, j) in category.subcategories">
                                                <v-col cols="3" :key="`home-subcategories-${ j }`">
                                                    <div class="cate-column">
                                                        <dl>

                                                            <!-- Subcategory -->
                                                            <dt>
                                                                <nuxt-link :to="`category/${ category.handler }/${ subcategory.handler }`">
                                                                    <span v-text="subcategoryTitle(subcategory)"></span>
                                                                </nuxt-link>
                                                            </dt>

                                                            <!-- Childcategories -->
                                                            <template v-for="(childcategory, n) in subcategory.childcategories">
                                                                <dd :key="`home-childcategories-${ n }`">
                                                                    <nuxt-link :to="`category/${ category.handler }/${ subcategory.handler }/${ childcategory.handler }`">
                                                                        <span v-text="childcategoryTitle(childcategory)"></span>
                                                                    </nuxt-link>
                                                                </dd>
                                                            </template>

                                                        </dl>
                                                    </div>
                                                </v-col>
                                            </template>
                                        </v-row>

                                    </div>
                                </li>
                            </template>

                        </ul>
                    </div>
                </v-card>

            </v-col>

            <!-- Sliders -->
            <v-col cols="9" v-if="sliders.length > 0">
                <v-carousel
                    :height="setHeight() > 450 ? setHeight() : 500"
                    hide-delimiter-background
                    show-arrows-on-hover
                    class="desktop-sliders"
                    id="desktop-sliders-element"
                    cycle
                >

                    <template v-for="(slide, i) in sliders">

                        <!-- Link inside -->
                        <v-carousel-item :ripple="false" :key="i" nuxt :to="slide.link_value" :src="slider(slide)" v-if="slide.link_type === 'inside'" />

                        <!-- Link outside -->
                        <v-carousel-item :ripple="false" :key="i" :href="slide.link_value" :src="slider(slide)" v-if="slide.link_type === 'outside'" />

                    </template>

                </v-carousel>
            </v-col>

        </v-row>
        
        <!-- Flash deals -->
        <client-only>
            <v-row class="mb-12" v-if="flash_deals.length > 0">

                <!-- Section title -->
                <v-col cols="12">
                    <div class="section-title">
                        <v-row align="center" justify="space-between" class="mx-0">
                            <div>
                                <div class="section-title-h1">
                                    <h1 v-t="'t_flash_deals'"></h1>
                                </div>
                            </div>
                            <div class="slider-arrows" v-if="$vuetify.rtl">
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="next('flashDeals')">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="prev('flashDeals')">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                            </div>
                            <div class="slider-arrows" v-else>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="prev('flashDeals')">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="next('flashDeals')">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                    </div>
                </v-col>

                <!-- Products list -->
                <v-col cols="12">
                    <swiper ref="flashDeals" class="swiper" :options="{slidesPerView: $device.isMobileOrTablet ? 2 : 6, spaceBetween: $device.isMobileOrTablet ? 25 : 35,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }}">
                        <template v-for="product in flash_deals">
                            <swiper-slide :key="product.id">
                                <product-card :product="product.product" :flashDeal="true"></product-card>
                            </swiper-slide>
                        </template>
                    </swiper>
                </v-col>

            </v-row>
        </client-only>

        <!-- Categories with products -->
        <client-only>
            <template v-for="(item, index) in categoriesWithProducts">
                <v-row class="mb-12" :key="`categories-product-${index}`">

                    <!-- Section title -->
                    <v-col cols="12">
                        <div class="section-title">
                            <v-row align="center" justify="space-between" class="mx-0">
                                <div>
                                    <div class="section-title-h1">
                                        <nuxt-link :to="`/category/${item.category.category.handler}/${item.category.subcategory.handler}/${item.category.handler}`" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"><h1 v-text="childcategoryTitle(item.category)"></h1></nuxt-link>
                                    </div>
                                </div>
                                <div class="slider-arrows" v-if="$vuetify.rtl">
                                    <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="next(`categories-in-home-${item.category.handler}`)">
                                        <v-icon :size="15">mdi-chevron-right</v-icon>
                                    </v-btn>
                                    <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="prev(`categories-in-home-${item.category.handler}`)">
                                        <v-icon :size="15">mdi-chevron-left</v-icon>
                                    </v-btn>
                                </div>
                                <div class="slider-arrows" v-else>
                                    <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="prev(`categories-in-home-${item.category.handler}`)">
                                        <v-icon :size="15">mdi-chevron-left</v-icon>
                                    </v-btn>
                                    <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="next(`categories-in-home-${item.category.handler}`)">
                                        <v-icon :size="15">mdi-chevron-right</v-icon>
                                    </v-btn>
                                </div>
                            </v-row>
                        </div>
                    </v-col>

                    <!-- Products list -->
                    <v-col cols="12">
                        <swiper :ref="`categories-in-home-${item.category.handler}`" class="swiper" :options="{slidesPerView: $device.isMobileOrTablet ? 2 : 6, spaceBetween: $device.isMobileOrTablet ? 25 : 35,
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            }}">
                            <template v-for="(product, index) in item.products">
                                <swiper-slide :key="`category-products-${index}`">
                                    <product-card :product="product"></product-card>
                                </swiper-slide>
                            </template>
                        </swiper>
                    </v-col>

                </v-row>
            </template>
        </client-only>
        
    </v-container>
</template>

<script>
import 'swiper/swiper-bundle.css'

export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    async asyncData({ app, $axios }) {
        // Send request to server
        let response = await $axios.post('home')

        return {
            categories            : response.data.categories,
            flash_deals           : response.data.flash_deals,
            sliders               : response.data.sliders,
            categoriesWithProducts: response.data.categoriesWithProducts
        }
    },

    data() {
        return {
            categories_menu_width: 0
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
            title: this.$store.state.settings.site_title,
            titleTemplate: `%s ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }`,

            // Set meta tags
            meta: [

                // Description
                { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                // OG Type
                { hid: 'og:type', property: 'og:type', content: false },

                // OG Title
                { hid: 'og:title', property: 'og:title', content: `${ this.$store.state.settings.site_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }` },

                // OG Site Name
                { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                // OG Description
                { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                // OG Image
                { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                // OG Url
                { hid: 'og:url', property: 'og:url', content: this.$clientIndex() },

                // Twitter Title
                { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$store.state.settings.site_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }` },

                // Twitter Description
                { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                // Twitter Image
                { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                // Twitter Image Alt
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                // Twitter Card
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                
            ],
            link: [ { rel: 'canonical', href: this.$clientIndex() }  ]
        }
    },

    computed: {

        // JSON LD
        breadcrumbs(){
            return [
                {
                    url: this.$clientIndex(),
                    text: this.$t('t_home'),
                }
            ]
        }

    },

    methods: {

        // Slider next
        next(slider) {
            if (Array.isArray(this.$refs[slider])) {
                this.$refs[slider][0].$swiper.slideNext()
            } else {
                this.$refs[slider].$swiper.slideNext()
            }
        },

        // Slider previous
        prev(slider) {
            if (Array.isArray(this.$refs[slider])) {
                this.$refs[slider][0].$swiper.slidePrev()
            } else {
                this.$refs[slider].$swiper.slidePrev()
            }
        },

        // Get childcategory title
        childcategoryTitle(childcategory) {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode childcategory title
            const title  = JSON.parse(childcategory.translation.title)

            // Return title depends on current locale
            return title[locale] ? title[locale] : title[this.$store.state.settings.default_language]

        },

        // Get category title
        categoryTitle(category) {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode category title
            const title  = JSON.parse(category.translation.title)

            // Return title depends on current locale
            return title[locale] ? title[locale] : title[this.$store.state.settings.default_language]

        },

        // Get subcategory title
        subcategoryTitle(subcategory) {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode subcategory title
            const title  = JSON.parse(subcategory.translation.title)

            // Return title depends on current locale
            return title[locale] ? title[locale] : title[this.$store.state.settings.default_language]

        },

        // Get parent category icon
        categoryIcon(category) {

            // Check if category has icon
            if (category.icon) {
                
                return this.$clientIndex(`/uploads/${ category.icon.file_folder }/${ category.icon.uid }.webp`)

            } else {

                // Return default icon
                return this.$clientIndex('/images/default/icon.svg')

            }

        },

        // Set carousel height
        setHeight() {

            if (process.client) {
                if (this.categories.length > 0) {
                    const filterSectionDOM = document.getElementById("main-categories");
                    return filterSectionDOM ? filterSectionDOM.offsetHeight : 0; 
                }
            }

        },

        // Get slider image
        slider(slider) {
            // Check if mobile or tablet or desktop
            if (this.$device.isMobileOrTablet) {
                
                if (slider.mobile_slider_id) {
                    return this.$clientIndex(`/uploads/${ slider.mobileSlider.file_folder }/${ slider.mobileSlider.uid }.webp`)
                }

            } else {

                // Return desktop slider
                if (slider.desktop_slider_id) {
                    return this.$clientIndex(`/uploads/${ slider.desktopSlider.file_folder }/${ slider.desktopSlider.uid }.webp`)
                } 

            }
        }

    },

    mounted() {

        if (this.sliders.length > 0) {
            // Get carousel width
            const carousel             = document.getElementById('desktop-sliders-element').getBoundingClientRect()
            
            // Set categories menu width
            this.categories_menu_width = Number(carousel.width) + Number(2)
        }
        
        // Check if route has an error
        if (this.$route.query.error === 'VERIFY_TOKEN_EXPIRED') {
            this.$message(this.$t('t_verify_email_token_expired'), 'alert-rhombus', 'error')
        }
        
    }

}
</script>