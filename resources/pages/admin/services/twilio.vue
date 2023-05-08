<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_twilio_gateway')"></v-toolbar-title>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Account Sid -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.account_sid"
                                :hide-details="!errors.account_sid"
                                :placeholder="$t('t_enter_account_sid')"
                                append-icon="mdi-barcode"
                                color="indigo accent-3" 
                                :rules="errors.account_sid"
                                :error="errors.account_sid ? true : false" />
                        </v-col>

                        <!-- Auth token -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.auth_token"
                                :hide-details="!errors.auth_token"
                                :placeholder="$t('t_enter_auth_token')"
                                append-icon="mdi-folder-pound"
                                color="indigo accent-3" 
                                :rules="errors.auth_token"
                                :error="errors.auth_token ? true : false" />
                        </v-col>

                        <!-- Phone -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.phone"
                                :hide-details="!errors.phone"
                                :placeholder="$t('t_enter_twilio_phone')"
                                append-icon="mdi-phone"
                                color="indigo accent-3" 
                                :rules="errors.phone"
                                :error="errors.phone ? true : false" />
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

        async asyncData({ app, $axios, params }) {
			// Send request to server
            let response = await $axios.get('dashboard/services/twilio')

			return {
				form: {
                    account_sid: response.data.account_sid,
                    auth_token : response.data.auth_token,
                    phone      : response.data.phone
                },
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
                title: this.$t('t_twilio_gateway')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    account_sid: this.form.account_sid,
                    auth_token : this.form.auth_token,
                    phone      : this.form.phone
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/services/twilio', data)
                            .then(response => {

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