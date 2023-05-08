<template>
    <v-footer padless inset class="main-footer">
        <v-card flat tile  class="text-center fill-width" :color="$vuetify.theme.dark ? '#303030' : '#fff'">
            <v-card-text class="highlight-btn">

                <!-- Pages -->
                <v-container fluid class="py-4 px-12">
                    <v-row class="px-12">

                        <!-- First column -->
                        <v-col cols="3" v-if="$store.state.settings.footer.first_column">
                            <div class="footer-pages-links" v-if="pages.first">
                                <p v-text="$store.state.settings.footer.first_column"></p>
                                <template v-for="(page, i) in pages.first">
                                    <nuxt-link :key="i" :to="`/page/${ page.handler }`" v-text="pageTitle(page)"></nuxt-link>
                                </template>
                            </div>
                        </v-col>

                        <!-- Second column -->
                        <v-col cols="3" v-if="$store.state.settings.footer.second_column">
                            <div class="footer-pages-links" v-if="pages.second">
                                <p v-text="$store.state.settings.footer.second_column"></p>
                                <template v-for="(page, i) in pages.second">
                                    <nuxt-link :key="i" :to="`/page/${ page.handler }`" v-text="pageTitle(page)"></nuxt-link>
                                </template>
                            </div>
                        </v-col>

                        <!-- Third column -->
                        <v-col cols="3" v-if="$store.state.settings.footer.third_column">
                            <div class="footer-pages-links" v-if="pages.third">
                                <p v-text="$store.state.settings.footer.third_column"></p>
                                <template v-for="(page, i) in pages.third">
                                    <nuxt-link :key="i" :to="`/page/${ page.handler }`" v-text="pageTitle(page)"></nuxt-link>
                                </template>
                            </div>
                        </v-col>

                        <!-- Social media icons -->
                        <v-col cols="3" class="pt-12">

                            <span class="d-block ff-open fs-10 fw-600 mb-4 text-uppercase letter-spacing-05px" v-t="'t_follow_us_on_social'"></span>

                            <!-- Social media icons -->
                            <template v-for="icon in icons">
                                <v-tooltip top :key="icon.icon" v-if="icon.enabled">
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="mx-2" icon :color="icon.color" v-on="on" :href="icon.url" target="_blank">
                                            <v-icon size="22px">{{ icon.icon }}</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-text="icon.tooltip"></span>
                                </v-tooltip>
                            </template>

                        </v-col>

                    </v-row>
                </v-container>

            </v-card-text>

            <!-- Payment services images / Copyrights -->
            <v-card-text class="footer-payment-services">

                <!-- Footer payment methods -->
                <img v-if="$store.state.settings.footer.image" :src="`/uploads/${ $store.state.settings.footer.image.file_folder }/${ $store.state.settings.footer.image.uid }.webp`" height="40px" :alt="$store.state.settings.site_title" :title="$store.state.settings.site_title" />

                <!-- Copyrights -->
                <p class="fs-11 font-weight-regular mt-2" v-text="$store.state.settings.footer.copyrights"></p>

            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: 'main-footer',
        
        computed: {

            // Social media icons
            icons() {
                return [
                    { 
                        icon   : 'mdi-facebook', 
                        color  : '#3b5998', 
                        url    : this.$store.state.settings.footer.facebook_url,
                        tooltip: this.$t('t_follow_us_facebook'),
                        enabled: this.$store.state.settings.footer.facebook_url ? true : false
                    },
                    { 
                        icon   : 'mdi-instagram', 
                        color  : '#662f2f', 
                        url    : this.$store.state.settings.footer.instagram_url,
                        tooltip: this.$t('t_follow_us_instagram'),
                        enabled: this.$store.state.settings.footer.instagram_url ? true : false
                    },
                    { 
                        icon   : 'mdi-twitter', 
                        color  : '#00acee', 
                        url    : this.$store.state.settings.footer.twitter_url,
                        tooltip: this.$t('t_follow_us_twitter'),
                        enabled: this.$store.state.settings.footer.twitter_url ? true : false
                    },
                    { 
                        icon   : 'mdi-youtube', 
                        color  : 'error', 
                        url    : this.$store.state.settings.footer.youtube_url,
                        tooltip: this.$t('t_subscribe_youtube'),
                        enabled: this.$store.state.settings.footer.youtube_url ? true : false
                    },
                    { 
                        icon   : 'mdi-whatsapp', 
                        color  : '#25D366', 
                        url    : `https://api.whatsapp.com/send?phone=${ this.$store.state.settings.footer.whatsapp_url }`,
                        tooltip: this.$t('t_contact_us_whatsapp'),
                        enabled: this.$store.state.settings.footer.whatsapp_url ? true : false
                    },
                    { 
                        icon   : 'mdi-telegram', 
                        color  : '#0088cc', 
                        url    : this.$store.state.settings.footer.telegram_url,
                        tooltip: this.$t('t_join_telegram'),
                        enabled: this.$store.state.settings.footer.telegram_url ? true : false
                    },
                    { 
                        icon   : 'mdi-pinterest', 
                        color  : '#E60023', 
                        url    : this.$store.state.settings.footer.pinterest_url,
                        tooltip: this.$t('t_follow_us_pinterest'),
                        enabled: this.$store.state.settings.footer.pinterest_url ? true : false
                    },
                    { 
                        icon   : 'mdi-vk', 
                        color  : '#1A4B78', 
                        url    : this.$store.state.settings.footer.vk_url,
                        tooltip: this.$t('t_follow_us_vk'),
                        enabled: this.$store.state.settings.footer.vk_url ? true : false
                    },
                ]
            },

            // Group pages by columns
            pages() {

                // Get pages
                const pages  = this.$store.state.settings.pages

                // Group by column
                const result = pages.reduce(function (r, a) {
                    r[a.column] = r[a.column] || [];
                    r[a.column].push(a);
                    return r;
                }, Object.create(null));

                // Return result
                return result

            }

        },

        methods: {

            // Get page title
            pageTitle(page) {

                // Get current locale
                const locale = this.$i18n.locale

                // Get title depends on current locale
                switch (locale) {
                    case 'ar':
                        return page.translation.title_ar
                        break;

                    case 'az':
                        return page.translation.title_az
                        break;

                    case 'cn':
                        return page.translation.title_cn
                        break;

                    case 'de':
                        return page.translation.title_de
                        break;

                    case 'en':
                        return page.translation.title_en
                        break;

                    case 'es':
                        return page.translation.title_es
                        break;

                    case 'fr':
                        return page.translation.title_fr
                        break;

                    case 'hi':
                        return page.translation.title_hi
                        break;

                    case 'hu':
                        return page.translation.title_hu
                        break;

                    case 'jp':
                        return page.translation.title_jp
                        break;

                    case 'nl':
                        return page.translation.title_nl
                        break;

                    case 'po':
                        return page.translation.title_po
                        break;

                    case 'pt':
                        return page.translation.title_pt
                        break;

                    case 'ro':
                        return page.translation.title_ro
                        break;

                    case 'ru':
                        return page.translation.title_ru
                        break;

                    case 'th':
                        return page.translation.title_th
                        break;

                    case 'tr':
                        return page.translation.title_tr
                        break;

                    case 'ua':
                        return page.translation.title_ua
                        break;
                
                    default:
                        return page.translation.title_en
                        break;
                }

            }

        }

    }
</script>