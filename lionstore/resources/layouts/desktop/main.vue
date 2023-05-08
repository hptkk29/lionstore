<template>
    <v-app class="main-desktop-layout">

        <vue-confirm-dialog></vue-confirm-dialog>

        <!-- Header -->
        <main-header />

        <!-- Basket -->
        <main-basket />

        <!-- Content -->
        <v-main id="desktop-container" ref="mainContainer" class="mb-12">
            <v-container fluid class="main-content">
                <nuxt/>
            </v-container>
        </v-main>

        <!-- Footer -->
        <main-footer />

    </v-app>
</template>

<script>
    export default {
        components: {
            'main-footer' : () => import('~/components/main/include/footer'),
            'main-header' : () => import('~/components/main/include/header'),
            'main-basket' : () => import('~/components/main/partials/basket')
        },

        head() {
			return {
                titleTemplate: `%s ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}`,
                htmlAttrs: { lang: this.$i18n.locale },
                link: [ { rel: 'icon', type: 'image/x-icon', href: this.$favicon() } ]
			}
        },

        beforeCreate() {
            
            // Get dark mode
            const cookie = this.$cookies.get('dark_mode', this.$cookiesOptions())

            // Check if dark mode enabled
            if (cookie && cookie === "enabled") {
                
                // Enable dark mode 
                this.$vuetify.theme.dark = true

            } else {

                // Dark mode not enabled
                this.$vuetify.theme.dark = false

            }

            // Set locale
            switch (this.$cookies.get('locale', this.$cookiesOptions())) {
                case 'ar':
                    this.$i18n.locale = 'ar'
                    break;

                case 'az':
                    this.$i18n.locale = 'az'
                    break;

                case 'cn':
                    this.$i18n.locale = 'cn'
                    break;

                case 'de':
                    this.$i18n.locale = 'de'
                    break;

                case 'en':
                    this.$i18n.locale = 'en'
                    break;

                case 'es':
                    this.$i18n.locale = 'es'
                    break;

                case 'fr':
                    this.$i18n.locale = 'fr'
                    break;

                case 'hi':
                    this.$i18n.locale = 'hi'
                    break;

                case 'hu':
                    this.$i18n.locale = 'hu'
                    break;

                case 'jp':
                    this.$i18n.locale = 'jp'
                    break;

                case 'nl':
                    this.$i18n.locale = 'nl'
                    break;

                case 'po':
                    this.$i18n.locale = 'po'
                    break;

                case 'pt':
                    this.$i18n.locale = 'pt'
                    break;

                case 'ro':
                    this.$i18n.locale = 'ro'
                    break;

                case 'ru':
                    this.$i18n.locale = 'ru'
                    break;

                case 'th':
                    this.$i18n.locale = 'th'
                    break;

                case 'tr':
                    this.$i18n.locale = 'tr'
                    break;

                case 'ua':
                    this.$i18n.locale = 'ua'
                    break;
            
                default:
                    this.$i18n.locale = this.$store.state.settings.default_language
                    break;
            }

            // Check if rtl enabled
            if (this.$i18n.locale === 'ar' || this.$store.state.settings.is_rtl) {
                this.$vuetify.rtl = true
            } else {
                this.$vuetify.rtl = false
            }

        }

    }
</script>