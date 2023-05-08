<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" />

        <v-row>

            <!-- Notification -->
            <v-col cols="12" v-if="isSuccess">
                <v-alert text color="success" icon="mdi-check-underline" border="left" class="mb-0" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                    <span class="fs-12 font-weight-medium" v-t="'t_refund_request_succeeded'"></span>
                </v-alert>
            </v-col>

            <!-- Details -->
            <v-col cols="12" md="6">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_information'"></v-toolbar-title>
                    </v-toolbar>

                    <v-card-text class="py-10 px-8" v-html="$store.state.settings.refunds.message_to_customer"></v-card-text>
                </v-card>
            </v-col>

            <!-- Form -->
            <v-col cols="12" md="6">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_return_exchange'"></v-toolbar-title>
                    </v-toolbar>

                    <v-card-text class="py-10 px-8">
                        <v-row>
                            
                            <!-- Order id -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.order"
                                    :hide-details="!errors.order"
                                    :placeholder="$t('t_enter_order_number')"
                                    append-icon="mdi-numeric"
                                    color="indigo accent-3"
                                    :rules="errors.order"
                                    :error="errors.order ? true : false"/>
                            </v-col>

                            <!-- Reason -->
                            <v-col cols="12">
                                <v-textarea outlined dense :height="220"
                                    v-model="form.reason"
                                    :hide-details="!errors.reason"
                                    :placeholder="$t('t_enter_return_reason')"
                                    append-icon="mdi-frequently-asked-questions"
                                    color="indigo accent-3"
                                    :rules="errors.reason"
                                    :error="errors.reason ? true : false"/>
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
                                <v-btn depressed block :dark="!loading" :loading="loading" :disabled="loading" color="indigo accent-3" @click.prevent="submit()" class="tiktok-refund-event">
                                    <span class="fs-11 font-weight-medium" v-t="'t_submit'" v-if="!loading"></span>
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

                            <!-- Accept return policy -->
                            <v-col cols="12" class="text-center">
                                <span class="grey--text fs-12 font-weight-regular d-block" v-t="'t_agree_to_return_policy'"></span>
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

    auth: true,

    middleware: 'auth',

    async asyncData({ app, query, store, redirect }) {
        // Check if refund system enabled
        if (!store.state.settings.refunds.is_enabled) {
            redirect('/')
        }

        return {
            form: {
                order          : query.order ? query.order : '',
                reason         : '',
                recaptcha_token: ''
            }
        }
    },

    data() {
        return {
            errors   : [],
            isSuccess: false,
            loading  : false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_return_exchange')

        }
    },

    methods: {

        // reCaptcha Success
        recaptchaSuccess(token) {
            this.form.recaptcha_token = token
        },

        // Request refund
        async submit() {

            // Check if form set
            if (!this.form.order || !this.form.reason) {
                return
            }

            // Start loading
            this.loading = true

            // Set data
            const data   = {
                id             : this.form.order,
                reason         : this.form.reason,
                recaptcha_token: this.form.recaptcha_token
            }

            // Send request to server
            await this.$axios
                        .post('refund/request', data)
                        .then(response => {

                            // Success
                            this.isSuccess            = true

                            // Remove errors
                            this.errors               = []

                            // Reset form
                            this.form.order           = ''
                            this.form.reason          = ''
                            this.form.recaptcha_token = ''

                            // Scroll to top
                            this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                            // Run analytics tools
                            if (process.client) {

                                // Facebook Pixel
                                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                    window._fbq('track', 'Lead', {
                                        'content_name': `refund-${ this.form.order }`
                                    })
                                }

                            }

                        })
                        .catch(error => {
                            // Form errors
                            if (error.response.status === 422) {
                                this.errors  = this.$errors(error.response.data.errors)
                            }

                            // Show error toast
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