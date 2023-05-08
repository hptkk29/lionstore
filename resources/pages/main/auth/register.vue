<template>
    <v-container fluid grid-list-xl>
        <v-row justify="center" align="center">
            <v-col cols="12" md="5">

                <!-- Form -->
                <v-card class="c-card" v-if="!verification.active">
                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <v-col cols="12">
                                <h2 class="fs-11 font-weight-medium text-uppercase text-center" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-t="'t_create_new_account'"></h2>
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

                            <!-- Username -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.username"
                                    :hide-details="!errors.username"
                                    :placeholder="$t('t_enter_username')"
                                    append-icon="mdi-account"
                                    color="indigo accent-3"
                                    :rules="errors.username"
                                    :error="errors.username ? true : false"/>
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

                            <!-- Submit button -->
                            <v-col cols="12">
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="register()" class="tiktok-register-email-event">
                                    <span class="fs-11 font-weight-medium" v-t="'t_register'" v-if="!loading"></span>
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

                            <!-- Already a customer -->
                            <v-col cols="12">
                                <v-row align="center" justify="space-around" class="mx-0 px-0">
                                    <v-divider />
                                        <h1 class="fs-11 font-weight-medium text-uppercase mx-4" v-t="'t_already_customer_question'"></h1>
                                    <v-divider />
                                </v-row>
                            </v-col>

                            <!-- Sign in -->
                            <v-col cols="12">
                                <v-btn depressed block :color="$vuetify.theme.dark ? '#2c2c2c' : 'grey lighten-3'" nuxt to="/auth/login">
                                    <span class="fs-11 font-weight-medium" v-t="'t_login'"></span>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- verification -->
                <div class="empty-state" v-else>
                    <div class="empty-state-container">
                        <v-icon class="empty-state-icon">mdi-email-check</v-icon>
                        <strong class="empty-state-label fs-18 font-weight-light" v-t="'t_email_verification'"></strong> 
                        <p class="empty-state-description fs-13" v-html="$t('t_email_verification_email', { email: verification.email })"></p>
                        <v-btn depressed dark nuxt to="/auth/login" color="indigo accent-3" class="mt-3 px-8">
                            <span v-t="'t_login'" class="fs-10 font-weight-medium"></span>
                        </v-btn>
                    </div>
                </div>

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
                    username       : '',
                    recaptcha_token: ''
                },
                breadcrumbs: [
                    {
                        url : this.$clientIndex(),
                        text: this.$t('t_home'),
                    },
                    {
                        url : this.$clientIndex('auth/register'),
                        text: this.$t('t_register'),
                    },
                ],
                verification: {
                    active: false,
                    email : null
                },
                errors      : [],
                loading     : false
            }
        },

        jsonld() {

            const items = this.breadcrumbs.map((item, index) => ({
                '@type' : 'ListItem',
                position: index + 1,
                item    : {
                    '@id': item.url,
                    name : item.text,
                },
            }))

            return {
                '@context'     : 'https://schema.org',
                '@type'        : 'BreadcrumbList',
                itemListElement: items,
            };
        },

        head() {
			return {

                // Title
                title: this.$t('t_register'),
                titleTemplate: `%s ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}`,

                // Set header attributes
                htmlAttrs: {
                    lang: this.$i18n.locale
                },

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${this.$t('t_register')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$clientIndex('images/default/og-image.png') },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('auth/login') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${this.$t('t_register')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$clientIndex('images/default/og-image.png') },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                    
                ],

                // Set body attributes
                bodyAttrs: {
                    class: this.$vuetify.theme.dark ? 'is-dark-mode': ''
                },

                // Set links tags
                link: [

                    // Canonical
                    { rel: 'canonical', href: this.$clientIndex('auth/login') }

                ]
			}
        },

        methods: {

            // Register
            async register() {
                
                try {

                    // Check if form data inserted
                    if (!this.form.password || !this.form.email || !this.form.username) {
                        return
                    }

                    // Enable loader
                    this.loading = true

                    // Get login credentials
                    let data = {
                        email          : this.form.email,
                        password       : this.form.password,
                        username       : this.form.username,
                        recaptcha_token: this.form.recaptcha_token
                    }

                    // Login
                    await this.$axios.post('auth/register', data)
                                     .then(async response => {
                                        
                                        // Check if verification required
                                        if (response.data.verification) {

                                            // Show verification page
                                            this.verification.email  = response.data.email
                                            this.verification.active = true

                                        } else {

                                            // No need for verification
                                            // Get token
                                            const token    = response.data.token

                                            // Set token and refresh token
                                            this.$auth.setUserToken(token)
                                            this.$axios.setHeader('Authorization', 'Bearer ' + token)
                                            this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + token)

                                            // Reset errors
                                            this.errors    = []

                                            // Get redirect location
                                            const redirect = this.$route.query.redirect || '/'

                                            // Run analytics tools
                                            if (process.client) {
                                                
                                                // Snapchat Pixel
                                                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                                    window.snaptr('track', 'SIGN_UP',  { 
                                                        'sign_up_method': 'Email'
                                                    });
                                                }

                                                // Facebook Pixel
                                                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                                    window._fbq('track', 'CompleteRegistration', {
                                                        'content_name': 'Email'
                                                    })
                                                }

                                            }

                                            // Redirect to Home page
                                            this.$router.push(redirect)

                                        }
                                        

                                     })
                                     .catch(error => {

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

            // reCaptcha Success
            recaptchaSuccess(token) {
                this.form.recaptcha_token = token
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