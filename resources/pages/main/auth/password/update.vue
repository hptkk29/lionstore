<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <v-row justify="center" align="center">
            <v-col cols="12" md="5">
                <v-card class="c-card">
                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <!-- Update password -->
                            <v-col cols="12">
                                <h2 class="fs-11 ff-open font-weight-medium text-uppercase text-center" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-t="'t_update_password'"></h2>
                            </v-col>
                            
                            <!-- New password -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.password"
                                    :hide-details="!errors.password"
                                    :placeholder="$t('t_enter_password')"
                                    append-icon="mdi-lock"
                                    color="indigo accent-3" 
                                    type="password"
                                    :rules="errors.password"
                                    :error="errors.password ? true : false"/>
                            </v-col>

                            <!-- Password confirmation -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.password_confirmation"
                                    :hide-details="!errors.password_confirmation"
                                    :placeholder="$t('t_enter_password_confirmation')"
                                    append-icon="mdi-lock"
                                    color="indigo accent-3" 
                                    type="password"
                                    :rules="errors.password_confirmation"
                                    :error="errors.password_confirmation ? true : false"/>
                            </v-col>

                            <!-- reCaptcha -->
                            <v-col cols="12" v-if="$store.state.settings.recaptcha.is_recaptcha">
                               <recaptcha 
                                    :siteKey="$store.state.settings.recaptcha.recaptcha_site_key"
                                    :dataTheme="$vuetify.theme.dark ? 'dark' : 'light'"
                                    @success="recaptchaSuccess" />
                            </v-col>

                            <!-- Update -->
                            <v-col cols="12">
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="update()">
                                    <span class="fs-11 font-weight-medium" v-t="'t_update'" v-if="!loading"></span>
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

        async asyncData({ app, $axios, query, redirect }) {
			// Send request to server
            let response = await $axios
                                    .post('auth/password/verify', { token: query.token, email: query.email })
                                    .then(response => {

                                        return {
                                            email: response.data.email,
                                            token: response.data.token
                                        }

                                    })
                                    .catch(error => {
                                        console.log(error)
                                        redirect('/auth/password/reset')
                                    })

            return {
                token: response.token,
                email: response.email
            }
			
		},
        
        data() {
            return {
                form: {
                    password             : '',
                    password_confirmation: '',
                    recaptcha_token      : ''
                },
                errors      : [],
                loading     : false
            }
        },

        head() {
			return {

                // Title
                title: this.$t('t_update_password'),

                // Set meta tags
                meta: [

                    // Description
                    { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                    // OG Title
                    { hid: 'og:type', property: 'og:type', content: false },

                    // OG Title
                    { hid: 'og:title', property: 'og:title', content: `${this.$t('t_update_password')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // OG Site Name
                    { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                    // OG Description
                    { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                    // OG Image
                    { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                    // OG Url
                    { hid: 'og:url', property: 'og:url', content: this.$clientIndex('auth/password/update') },

                    // Twitter Title
                    { hid: 'twitter:title', name: 'twitter:title', content: `${this.$t('t_update_password')} ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}` },

                    // Twitter Description
                    { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                    // Twitter Image
                    { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                    // Twitter Image Alt
                    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                    // Twitter Card
                    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },

                    { hid: 'robots', name: 'robots', content: 'noindex' }
                    
                ],
                link: [ { rel: 'canonical', href: this.$clientIndex('auth/password/update') }  ]
			}
        },

        methods: {

            // Update password
            async update() {

                try {
                    
                    // Check if recaptcha enabled but it failed
                    if (this.$store.state.settings.recaptcha.is_recaptcha && !this.form.recaptcha_token) {
                        return
                    }

                    // Check if form data not inserted
                    if (!this.form.password || !this.form.password_confirmation) {
                        return
                    }

                    // Enable loader
                    this.loading = true
                    
                    // Get login credentials
                    let data = {
                        password             : this.form.password,
                        password_confirmation: this.form.password_confirmation,
                        token                : this.token,
                        email                : this.email,
                        recaptcha_token      : this.form.recaptcha_token
                    }

                    // Login
                    await this.$axios.post('auth/password/update', data)
                                     .then(async response => {
                                        
                                         // Success
                                        this.$message(this.$t('t_password_has_been_updated'))

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