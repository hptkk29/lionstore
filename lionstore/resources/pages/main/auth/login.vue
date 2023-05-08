<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loader" />

        <v-row justify="center" align="center">
            <v-col cols="12" md="5">
                <v-card class="c-card">
                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <!-- Already a customer -->
                            <v-col cols="12">
                                <h2 class="fs-11 ff-open font-weight-medium text-uppercase text-center" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-t="'t_authentication'"></h2>
                            </v-col>

                            <!-- Not authorize notification -->
                            <v-col cols="12" v-if="unauthorized">
                                <v-alert text color="red" icon="mdi-alert-octagon" border="left" class="mb-0" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                    <span class="fs-12 font-weight-medium" v-t="'t_login_unauthorized'"></span>
                                </v-alert>
                            </v-col>

                            <!-- verification notification -->
                            <v-col cols="12" v-if="verification">
                                <v-alert text color="blue" icon="mdi-email-alert" border="left" class="mb-0" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                    <span class="fs-12 font-weight-medium" v-t="'t_account_requires_verification'"></span>
                                </v-alert>
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

                            <!-- Password -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.password"
                                    :hide-details="!errors.password"
                                    v-on:keyup.enter="login"
                                    autocomplete="new-password"
                                    :placeholder="$t('t_enter_password')"
                                    append-icon="mdi-lock"
                                    color="indigo accent-3" 
                                    type="password"
                                    :rules="errors.password"
                                    :error="errors.password ? true : false"/>
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
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="login()">
                                    <span class="fs-11 font-weight-medium" v-t="'t_login'" v-if="!loading"></span>
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

                            <!-- Reset password -->
                            <v-col cols="12">
                                <nuxt-link to="/auth/password/reset" class="d-block text-center fs-11 font-weight-medium cursor-pointer" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-t="'t_forgot_password'"></nuxt-link>
                            </v-col>

                            <!-- Social media login -->
                            <v-col cols="12" class="text-center">

                                <!-- Facebook login -->
                                <v-tooltip top v-if="$store.state.settings.authentication.enable_facebook_login">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-on="on" v-bind="attrs" dark icon class="mx-2 tiktok-register-facebook-event" color="#3b5998" @click="facebook()">
                                            <v-icon>mdi-facebook</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-t="'t_login_with_facebook'"></span>
                                </v-tooltip>
                                

                                <!-- Twitter login -->
                                <v-tooltip top v-if="$store.state.settings.authentication.enable_twitter_login">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-on="on" v-bind="attrs" dark icon class="mx-2 tiktok-register-twitter-event" color="#1DA1F2" @click="twitter()">
                                            <v-icon>mdi-twitter</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-t="'t_login_with_twitter'"></span>
                                </v-tooltip>

                                <!-- Google login -->
                                <v-tooltip top v-if="$store.state.settings.authentication.enable_google_login">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-on="on" v-bind="attrs" dark icon class="mx-2 tiktok-register-google-event" color="#DB4437" @click="google()">
                                            <v-icon>mdi-google</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-t="'t_login_with_google'"></span>
                                </v-tooltip>

                            </v-col>

                            <!-- New customer -->
                            <v-col cols="12">
                                <v-row align="center" justify="space-around" class="mx-0 px-0">
                                    <v-divider />
                                        <h1 class="fs-11 font-weight-medium text-uppercase mx-4" v-t="'t_new_customer_question'"></h1>
                                    <v-divider />
                                </v-row>
                            </v-col>

                            <!-- Sign up -->
                            <v-col cols="12">
                                <v-btn depressed block :color="$vuetify.theme.dark ? '#2c2c2c' : 'grey lighten-3'" nuxt to="/auth/register">
                                    <span class="fs-11 font-weight-medium" v-t="'t_register'"></span>
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
    import * as queryString from 'query-string';

    export default {
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

        auth: 'guest',

        middleware: "guest",
        
        data() {
            return {
                form: {
                    email          : '',
                    password       : '',
                    recaptcha_token: ''
                },
                breadcrumbs: [
                    {
                        url: this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url: this.$clientIndex('auth/login'),
                        text: this.$t('t_login'),
                    }
                ],
                errors      : [],
                unauthorized: false,
                verification: false,
                loading     : false,
                loader      : false
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
                title: this.$t('t_login'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${this.$t('t_login')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('auth/login') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${this.$t('t_login')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('auth/login') }  ]
			}
        },

        methods: {

            // Login user
            async login() {

                try {
                    
                    // Check if recaptcha enabled but it failed
                    if (this.$store.state.settings.recaptcha.is_recaptcha && !this.form.recaptcha_token) {
                        return
                    }

                    // Check if form data not inserted
                    if (!this.form.password || !this.form.email) {
                        return
                    }

                    // Enable loader
                    this.loading = true

                    // Get login credentials
                    let data = {
                        email          : this.form.email,
                        password       : this.form.password,
                        recaptcha_token: this.form.recaptcha_token
                    }

                    // Login
                    await this.$axios.post('auth/login', data)
                                     .then(async response => {
                                         
                                        // Check if verification required
                                        if (response.data.verification) {
                                            
                                            this.verification  = true

                                            // Remove unauthorized login
                                            this.unauthorized  = false

                                            // Reset form
                                            this.form.email    = ''
                                            this.form.password = ''

                                            // Reset errors
                                            this.errors        = []

                                        } else {

                                            // Get token
                                            const token        = response.data.token

                                            // Set token and refresh token
                                            this.$auth.setUserToken(token)
                                            this.$axios.setHeader('Authorization', 'Bearer ' + token)
                                            this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + token)

                                            // Remove unauthorized login
                                            this.unauthorized  = false

                                            // Reset errors
                                            this.errors        = []

                                            // Get redirect location
                                            const redirect     = this.$route.query.redirect || '/'

                                            // Run analytics tools
                                            if (process.client) {
                                                
                                                // Snapchat Pixel
                                                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                                    window.snaptr('track', 'LOGIN');
                                                }

                                            }

                                            // Redirect to Home page
                                            this.$router.push(redirect)

                                        }

                                     })
                                     .catch(error => {
                                         
                                         // Unauthorized
                                         if (error.response.status === 401) {
                                             this.unauthorized = true
                                             // Reset errors
                                             this.errors = []
                                         }

                                        // Form errors
                                        if (error.response.status === 422) {
                                            this.errors  = this.$errors(error.response.data.errors)
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

            // Facebook
            facebook() {

                // Set request params
                const stringifiedParams = queryString.stringify({
                    client_id    : this.$store.state.settings.authentication.facebook_client_id,
                    redirect_uri : `${this.$clientIndex('auth/facebook/callback')}`,
                    scope        : ['public_profile', 'email'].join(','),
                    response_type: 'token',
                    auth_type    : 'rerequest',
                    display      : 'popup',
                    state        : Math.random().toString(36).slice(2)
                });

                // Set facebook auth url
                const oauth = `https://www.facebook.com/v2.1/dialog/oauth?${stringifiedParams}`;
                
                // Open oauth link
                window.open(oauth, '_self')
                
            },

            // Twitter
            async twitter() {

                // Start login
                this.loader = true

                // Send request
                await this
                        .$axios
                        .post('auth/twitter/redirect')
                        .then(response => {

                            // Parse response data
                            const parsed = queryString.parse(response.data);
                            
                            // Set twitter auth url
                            const oauth  = `https://api.twitter.com/oauth/authorize?oauth_token=${parsed.oauth_token}`;
                            
                            // Open oauth link
                            window.open(oauth, '_self')

                        })
                        .catch(error => {
                            console.log(error)
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                        })
                        .finally(() => {
                            this.loader = false
                        })

            },

            // Google
            async google() {

                // Start login
                this.loader = true

                // Send request
                await this
                        .$axios
                        .post('auth/google/redirect')
                        .then(response => {
                            
                            // Set google auth url
                            const oauth = response.data
                            
                            // Open oauth link
                            window.open(oauth, '_self')

                        })
                        .catch(error => {
                            console.log(error)
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                        })
                        .finally(() => {
                            this.loader = false
                        })

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