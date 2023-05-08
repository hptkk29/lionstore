<template>
    <v-container fluid grid-list-xl>

        <v-row justify="center">
            <v-col :cols="$device.isMobileOrTablet ? 12 : 10">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar" :class="$device.isMobileOrTablet ? 'px-2' : 'px-8'">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="title"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <span class="fs-11 grey--text font-weight-regular">{{ $t('t_page_last_update', { date: $ago(page.updated_at) }) }}</span>
                    </v-toolbar>

                    <v-card-text class="py-10" :class="$device.isMobileOrTablet ? 'px-6' : 'px-12'">
                        
                        <section v-html="content"></section>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    async asyncData({ app, $axios, params }) {
        // Send request to server
        let response = await $axios.post('page', { handler: params.handler })

        return {
            page: response.data
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
            title: this.title,

            // Set meta tags
            meta: [

                // Description
                { hid: 'description', name: 'description', content: this.page.seo_description },

                // OG Title
                { hid: 'og:type', property: 'og:type', content: false },

                // OG Title
                { hid: 'og:title', property: 'og:title', content: `${ this.page.seo_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                // OG Site Name
                { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                // OG Description
                { hid: 'og:description', property: 'og:description', content: this.page.seo_description },

                // OG Image
                { hid: 'og:image', property: 'og:image', content: this.ogimage },

                // OG Url
                { hid: 'og:url', property: 'og:url', content: this.$clientIndex(`page/${ this.page.handler }`) },

                // Twitter Title
                { hid: 'twitter:title', name: 'twitter:title', content: `${ this.page.seo_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_title }` },

                // Twitter Description
                { hid: 'twitter:description', name: 'twitter:description', content: this.page.seo_description },

                // Twitter Image
                { hid: 'twitter:image', name: 'twitter:image', content: this.ogimage },

                // Twitter Image Alt
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.page.seo_description },

                // Twitter Card
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                
            ],
            link: [ { rel: 'canonical', href: this.$clientIndex(`page/${ this.page.handler }`) }  ]
        }
    },

    computed: {

        // Get page title
        title() {

            // Get current locale
            const locale = this.$i18n.locale

            // Return title depends on current locale
            switch (locale) {
                case 'ar':
                    return this.page.translation.title_ar
                    break;

                case 'az':
                    return this.page.translation.title_az
                    break;

                case 'cn':
                    return this.page.translation.title_cn
                    break;

                case 'de':
                    return this.page.translation.title_de
                    break;

                case 'en':
                    return this.page.translation.title_en
                    break;

                case 'es':
                    return this.page.translation.title_es
                    break;

                case 'fr':
                    return this.page.translation.title_fr
                    break;

                case 'hi':
                    return this.page.translation.title_hi
                    break;

                case 'hu':
                    return this.page.translation.title_hu
                    break;

                case 'jp':
                    return this.page.translation.title_jp
                    break;

                case 'nl':
                    return this.page.translation.title_nl
                    break;

                case 'po':
                    return this.page.translation.title_po
                    break;

                case 'pt':
                    return this.page.translation.title_pt
                    break;

                case 'ro':
                    return this.page.translation.title_ro
                    break;

                case 'ru':
                    return this.page.translation.title_ru
                    break;

                case 'th':
                    return this.page.translation.title_th
                    break;

                case 'tr':
                    return this.page.translation.title_tr
                    break;

                case 'ua':
                    return this.page.translation.title_ua
                    break;
            
                default:
                    return this.page.translation.title_en
                    break;
            }

        },

        // Get page content
        content() {

            // Get current locale
            const locale = this.$i18n.locale

            // Return content depends on current locale
            switch (locale) {
                case 'ar':
                    return this.page.translation.content_ar
                    break;

                case 'az':
                    return this.page.translation.content_az
                    break;

                case 'cn':
                    return this.page.translation.content_cn
                    break;

                case 'de':
                    return this.page.translation.content_de
                    break;

                case 'en':
                    return this.page.translation.content_en
                    break;

                case 'es':
                    return this.page.translation.content_es
                    break;

                case 'fr':
                    return this.page.translation.content_fr
                    break;

                case 'hi':
                    return this.page.translation.content_hi
                    break;

                case 'hu':
                    return this.page.translation.content_hu
                    break;

                case 'jp':
                    return this.page.translation.content_jp
                    break;

                case 'nl':
                    return this.page.translation.content_nl
                    break;

                case 'po':
                    return this.page.translation.content_po
                    break;

                case 'pt':
                    return this.page.translation.content_pt
                    break;

                case 'ro':
                    return this.page.translation.content_ro
                    break;

                case 'ru':
                    return this.page.translation.content_ru
                    break;

                case 'th':
                    return this.page.translation.content_th
                    break;

                case 'tr':
                    return this.page.translation.content_tr
                    break;

                case 'ua':
                    return this.page.translation.content_ua
                    break;
            
                default:
                    return this.page.translation.content_en
                    break;
            }

        },

        // JSON LD
        breadcrumbs(){
            return [
                {
                    url: this.$clientIndex(),
                    text: this.$t('t_home'),
                },
                {
                    url: this.$clientIndex(`page/${ this.page.handler }`),
                    text: this.title,
                }
            ]
        },

        // Get page ogimage
        ogimage() {

            // Check if page has ogimage
            if (this.page.ogimage) {
                
                return this.$clientIndex(`/uploads/${ this.page.ogimage.file_folder }/${ this.page.ogimage.uid }.webp`)

            } else {

                // Return default ogimage
                return this.$ogimage()

            }

        }

    }
}
</script>