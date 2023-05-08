<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <v-row justify="center" align="center">
            <v-col cols="12" md="5">
                <v-card class="c-card">
                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <!-- Password reset -->
                            <v-col cols="12">
                                <h2 class="fs-11 ff-open font-weight-medium text-uppercase text-center" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-t="'t_password_reset'"></h2>
                            </v-col>
                            
                            <!-- E-mail address -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.email"
                                    :hide-details="!errors.email"
                                    :placeholder="$t('t_enter_email')"
                                    append-icon="mdi-at"
                                    color="indigo accent-3" 
                                    type="email"
                                    :rules="errors.email"
                                    :error="errors.email ? true : false"/>
                            </v-col>

                            <!-- reCaptcha -->
                            <v-col cols="12" v-if="$store.state.settings.recaptcha.is_recaptcha">
                               <recaptcha 
                                    :siteKey="$store.state.settings.recaptcha.recaptcha_site_key"
                                    :dataTheme="$vuetify.theme.dark ? 'dark' : 'light'"
                                    @success="recaptchaSuccess" />
                            </v-col>

                            <!-- Login button -->
                            <v-col cols="12">
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="reset()">
                                    <span class="fs-11 font-weight-medium" v-t="'t_reset'" v-if="!loading"></span>
                                    <template v-slot:loader>
                                        <v-progress-circular
                                            :width="2"
                                            size="20"
                                            color="#6c6c6c"
                                            indeterminate
                                            ></v-progress-circular>
                                    </template>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        auth: 'guest',

        middleware: "guest",
        
        data() {
            return {
                form: {
                    email          : '',
                    recaptcha_token: ''
                },
                breadcrumbs: [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('auth/password/reset'),
                        text: this.$t('t_password_reset'),
                    }
                ],
                errors      : [],
                loading     : false
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
                title: this.$t('t_password_reset'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${this.$t('t_password_reset')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('auth/password/reset') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${this.$t('t_password_reset')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('auth/password/reset') }  ]
			}
        },

        methods: {

            // Reset password
            async reset() {

                try {
                    
                    // Check if recaptcha enabled but it failed
                    if (this.$store.state.settings.recaptcha.is_recaptcha && !this.form.recaptcha_token) {
                        return
                    }

                    // Check if form data not inserted
                    if (!this.form.email) {
                        return
                    }

                    // Enable loader
                    this.loading = true

                    // Get login credentials
                    let data = {
                        email          : this.form.email,
                        recaptcha_token: this.form.recaptcha_token
                    }

                    // Login
                    await this.$axios.post('auth/password/reset', data)
                                     .then(async response => {
                                        
                                         // Success
                                        this.$message(this.$t('t_password_reset_link_sent'))

                                         // Redirect to login page
                                         this.$router.push('/auth/login')

                                     })
                                     .catch(error => {

                                        // Form errors
                                        if (error.response.status === 422) {
                                            this.errors = this.$errors(error.response.data.errors)
                                        }

                                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                                     })
                                     .finally(async () => {
                                        // Reset reCaptcha
                                        if (this.$store.state.settings.recaptcha.is_recaptcha) {
                                            this.form.recaptcha_token = ''
                                            await this.$recaptcha.reset()
                                        }
                                        
                                        // Stop loading
                                        this.loading = false
                                     })

                } catch (e) {
                    console.log(e)
                }
            },

            // reCaptcha Success
            recaptchaSuccess(token) {
                this.form.recaptcha_token = token
            }

        },

        beforeDestroy() {
            this.$recaptcha.destroy()
        },

        created() {
            this.$setRecaptchaLang(this.$i18n.locale)
        }

    }
</script>