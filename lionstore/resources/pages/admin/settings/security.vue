<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_security_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable reCaptcha -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_recaptcha"
                                :hide-details="!errors.is_recaptcha"
                                :placeholder="$t('t_enable_google_recaptcha')"
                                :items="[{ text: $t('t_enable_google_recaptcha'), value: 1 }, { text: $t('t_disable_google_recaptcha'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_recaptcha"
                                :error="errors.is_recaptcha ? true : false" />
                        </v-col>

                        <!-- reCaptcha Site Key -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.recaptcha_site_key"
                                :hide-details="!errors.recaptcha_site_key"
                                :placeholder="$t('t_enter_recaptcha_site_key')"
                                append-icon="mdi-key-variant"
                                color="indigo accent-3" 
                                :rules="errors.recaptcha_site_key"
                                :error="errors.recaptcha_site_key ? true : false" />
                        </v-col>

                        <!-- reCaptcha Secret Key -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.recaptcha_secret_key"
                                :hide-details="!errors.recaptcha_secret_key"
                                :placeholder="$t('t_enter_recaptcha_secret_key')"
                                append-icon="mdi-shield-key"
                                color="indigo accent-3" 
                                :rules="errors.recaptcha_secret_key"
                                :error="errors.recaptcha_secret_key ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="update" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 font-weight-medium" v-t="'t_update'" v-if="!loading"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="1"
                                        :size="20"
                                        color="#6c6c6c"
                                        indeterminate />
                                </template>
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios }) {
			// Send request to server
            let response = await $axios.get('dashboard/settings/security')

			return {
				form      : {
                    is_recaptcha        : response.data.is_recaptcha,
                    recaptcha_site_key  : response.data.recaptcha_site_key,
                    recaptcha_secret_key: response.data.recaptcha_secret_key
                }
			}
		},

        data() {
            return {
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_security_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_recaptcha        : this.form.is_recaptcha,
                    recaptcha_site_key  : this.form.recaptcha_site_key,
                    recaptcha_secret_key: this.form.recaptcha_secret_key
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/security', data)
                            .then(async response => {

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Remove errors
                                this.errors = []

                                // Scroll to top
                                this.$scrollTo('#scroll-top-admin', 300, {})

                            })
                            .catch(error => {
                                
                                // Form errors
                                if (error.response.status === 422) {
                                    this.errors  = this.$errors(error.response.data.errors)
                                }

                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

            }
        }
    }
</script>