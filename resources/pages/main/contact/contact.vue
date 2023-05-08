<template>
    <v-container fluid grid-list-xl>
        <v-row justify="center" align="center">
            <v-col :cols="$device.isMobileOrTablet ? 12 : 6">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_contact_us'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="py-10 px-8">
                        <v-row>
                            
                            <!-- Name -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.name"
                                    :hide-details="!errors.name"
                                    :placeholder="$t('t_enter_your_name')"
                                    append-icon="mdi-account"
                                    color="indigo accent-3"
                                    :rules="errors.name"
                                    :error="errors.name ? true : false"/>
                            </v-col>

                            <!-- E-mail address -->
                            <v-col cols="12" md="6">
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
                            
                            <!-- Phone -->
                            <v-col cols="12" md="6">
                                <v-text-field outlined dense
                                    v-model="form.phone"
                                    :hide-details="!errors.phone"
                                    :placeholder="$t('t_enter_phone')"
                                    append-icon="mdi-phone"
                                    color="indigo accent-3"
                                    :rules="errors.phone"
                                    :error="errors.phone ? true : false"/>
                            </v-col>

                            <!-- Subject -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.subject"
                                    :hide-details="!errors.subject"
                                    :placeholder="$t('t_enter_subject')"
                                    append-icon="mdi-circle-edit-outline"
                                    color="indigo accent-3"
                                    :rules="errors.subject"
                                    :error="errors.subject ? true : false"/>
                            </v-col>

                            <!-- Message -->
                            <v-col cols="12">
                                <v-textarea outlined dense :height="200"
                                    v-model="form.message"
                                    :hide-details="!errors.message"
                                    :placeholder="$t('t_enter_message')"
                                    append-icon="mdi-file-document-edit-outline"
                                    color="indigo accent-3"
                                    :rules="errors.message"
                                    :error="errors.message ? true : false"/>
                            </v-col>

                            <!-- reCaptcha -->
                            <v-col cols="12" v-if="$store.state.settings.recaptcha.is_recaptcha">
                               <recaptcha 
                                    :siteKey="$store.state.settings.recaptcha.recaptcha_site_key"
                                    :dataTheme="$vuetify.theme.dark ? 'dark' : 'light'"
                                    @success="recaptchaSuccess" />
                            </v-col>

                            <!-- Send -->
                            <v-col cols="12">
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="send()" class="tiktok-contact-event">
                                    <span class="fs-11 fw-600" v-t="'t_send'" v-if="!loading"></span>
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
        
        data() {
            return {
                form: {
                    email          : '',
                    name           : '',
                    phone          : '',
                    subject        : '',
                    message        : '',
                    recaptcha_token: ''
                },
                errors: [],
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
                title: this.$t('t_contact_us'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${this.$t('t_contact_us')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('contact') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${this.$t('t_contact_us')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('contact') }  ]
			}
        },

        computed: {

            // JSON LD
            breadcrumbs(){
                return [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('contact'),
                        text: this.$t('t_contact_us'),
                    }
                ]
            }

        },

        methods: {

            // Send message
            async send() {

                try {

                    // Check if recaptcha enabled but it failed
                    if (this.$store.state.settings.recaptcha.is_recaptcha && !this.form.recaptcha_token) {
                        return
                    }

                    // Check if form data inserted
                    if (!this.form.name || !this.form.email || !this.form.phone || !this.form.subject || !this.form.message) {
                        return
                    }

                    // Enable loader
                    this.loading = true

                    // Get login credentials
                    let data = {
                        name           : this.form.name,
                        email          : this.form.email,
                        subject        : this.form.subject,
                        phone          : this.form.phone,
                        message        : this.form.message,
                        recaptcha_token: this.form.recaptcha_token
                    }

                    // Send
                    await this.$axios.post('contact', data)
                                     .then(response => {
                                        
                                        // Message sent
                                        this.$message(this.$t('t_your_message_sent'), 'check-underline')

                                        // Run analytics tools
                                        if (process.client) {

                                            // Facebook Pixel
                                            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                                window._fbq('track', 'Contact', {
                                                    'content_name': this.form.subject
                                                })
                                            }

                                        }

                                        // Reset form
                                        this.form.name    = ''
                                        this.form.email   = ''
                                        this.form.phone   = ''
                                        this.form.subject = ''
                                        this.form.message = ''

                                        // Scroll top
                                        this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                                     })
                                     .catch(error => {

                                        // Form errors
                                        if ( error.response && error.response.data) {
                                            this.errors  = this.$errors(error.response.data)
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