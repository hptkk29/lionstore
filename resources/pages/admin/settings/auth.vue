<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_auth_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable Facebook login -->
                        <v-col cols="12" md="4">
                            <v-select dense outlined
                                v-model="form.is_facebook"
                                :hide-details="!errors.is_facebook"
                                :placeholder="$t('t_enable_facebook_login')"
                                :items="[{ text: $t('t_enable_facebook_login'), value: 1 }, { text: $t('t_disable_facebook_login'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_facebook"
                                :error="errors.is_facebook ? true : false" />
                        </v-col>

                        <!-- Facebook client id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.facebook_client_id"
                                :hide-details="!errors.facebook_client_id"
                                :placeholder="$t('t_enter_facebook_client_id')"
                                append-icon="mdi-facebook"
                                color="indigo accent-3" 
                                :rules="errors.facebook_client_id"
                                :error="errors.facebook_client_id ? true : false" />
                        </v-col>

                        <!-- Facebook secret id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.facebook_secret_id"
                                :hide-details="!errors.facebook_secret_id"
                                :placeholder="$t('t_enter_facebook_secret_id')"
                                append-icon="mdi-facebook"
                                color="indigo accent-3" 
                                :rules="errors.facebook_secret_id"
                                :error="errors.facebook_secret_id ? true : false" />
                        </v-col>

                        <!-- Enable Twitter login -->
                        <v-col cols="12" md="4">
                            <v-select dense outlined
                                v-model="form.is_twitter"
                                :hide-details="!errors.is_twitter"
                                :placeholder="$t('t_enable_twitter_login')"
                                :items="[{ text: $t('t_enable_twitter_login'), value: 1 }, { text: $t('t_disable_twitter_login'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_twitter"
                                :error="errors.is_twitter ? true : false" />
                        </v-col>

                        <!-- Twitter client id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.twitter_client_id"
                                :hide-details="!errors.twitter_client_id"
                                :placeholder="$t('t_enter_twitter_client_id')"
                                append-icon="mdi-twitter"
                                color="indigo accent-3" 
                                :rules="errors.twitter_client_id"
                                :error="errors.twitter_client_id ? true : false" />
                        </v-col>

                        <!-- Twitter secret id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.twitter_secret_id"
                                :hide-details="!errors.twitter_secret_id"
                                :placeholder="$t('t_enter_twitter_secret_id')"
                                append-icon="mdi-twitter"
                                color="indigo accent-3" 
                                :rules="errors.twitter_secret_id"
                                :error="errors.twitter_secret_id ? true : false" />
                        </v-col>

                        <!-- Enable Google login -->
                        <v-col cols="12" md="4">
                            <v-select dense outlined
                                v-model="form.is_google"
                                :hide-details="!errors.is_google"
                                :placeholder="$t('t_enable_google_login')"
                                :items="[{ text: $t('t_enable_google_login'), value: 1 }, { text: $t('t_disable_google_login'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_google"
                                :error="errors.is_google ? true : false" />
                        </v-col>

                        <!-- Google client id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.google_client_id"
                                :hide-details="!errors.google_client_id"
                                :placeholder="$t('t_enter_google_client_id')"
                                append-icon="mdi-google"
                                color="indigo accent-3" 
                                :rules="errors.google_client_id"
                                :error="errors.google_client_id ? true : false" />
                        </v-col>

                        <!-- Google secret id -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.google_secret_id"
                                :hide-details="!errors.google_secret_id"
                                :placeholder="$t('t_enter_google_secret_id')"
                                append-icon="mdi-google"
                                color="indigo accent-3" 
                                :rules="errors.google_secret_id"
                                :error="errors.google_secret_id ? true : false" />
                        </v-col>

                        <!-- Email verification required -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.verification_required"
                                :hide-details="!errors.verification_required"
                                :placeholder="$t('t_email_verification_required')"
                                :items="[{ text: $t('t_email_must_be_verified_first'), value: 1 }, { text: $t('t_no_need_for_email_verification'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.verification_required"
                                :error="errors.verification_required ? true : false" />
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
            let response = await $axios.get('dashboard/settings/auth')

			return {
				form      : {
                    is_facebook          : response.data.enable_facebook_login,
                    is_twitter           : response.data.enable_twitter_login,
                    is_google            : response.data.enable_google_login,
                    facebook_client_id   : response.data.facebook_client_id,
                    facebook_secret_id   : response.data.facebook_secret_id,
                    twitter_client_id    : response.data.twitter_client_id,
                    twitter_secret_id    : response.data.twitter_secret_id,
                    google_client_id     : response.data.google_client_id,
                    google_secret_id     : response.data.google_secret_id,
                    verification_required: response.data.verification_required
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
                title: this.$t('t_auth_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_facebook          : this.form.is_facebook,
                    is_twitter           : this.form.is_twitter,
                    is_google            : this.form.is_google,
                    facebook_client_id   : this.form.facebook_client_id,
                    facebook_secret_id   : this.form.facebook_secret_id,
                    twitter_client_id    : this.form.twitter_client_id,
                    twitter_secret_id    : this.form.twitter_secret_id,
                    google_client_id     : this.form.google_client_id,
                    google_secret_id     : this.form.google_secret_id,
                    verification_required: this.form.verification_required
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/auth', data)
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