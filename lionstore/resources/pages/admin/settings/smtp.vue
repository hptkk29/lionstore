<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_smtp_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Host -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.host"
                                :hide-details="!errors.host"
                                :placeholder="$t('t_enter_smtp_host')"
                                append-icon="mdi-server"
                                color="indigo accent-3" 
                                :rules="errors.host"
                                :error="errors.host ? true : false" />
                        </v-col>

                        <!-- Port -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.port"
                                :hide-details="!errors.port"
                                :placeholder="$t('t_enter_smtp_port')"
                                append-icon="mdi-numeric"
                                color="indigo accent-3" 
                                :rules="errors.port"
                                :error="errors.port ? true : false" />
                        </v-col>

                        <!-- Secure -->
                        <v-col cols="12">
                            <v-select dense outlined persistent-hint
                                v-model="form.is_secure"
                                :placeholder="$t('t_secure_smtp')"
                                :items="[{ text: $t('t_true'), value: 1 }, { text: $t('t_false'), value: 0 }]"
                                :hint="$t('t_true_for_465')"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_secure"
                                :error="errors.is_secure ? true : false" />
                        </v-col>

                        <!-- Username -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.username"
                                :hide-details="!errors.username"
                                :placeholder="$t('t_enter_smtp_username')"
                                append-icon="mdi-account"
                                color="indigo accent-3" 
                                :rules="errors.username"
                                :error="errors.username ? true : false" />
                        </v-col>

                        <!-- Password -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.password"
                                :hide-details="!errors.password"
                                :placeholder="$t('t_enter_smtp_password')"
                                append-icon="mdi-lock"
                                color="indigo accent-3" 
                                :rules="errors.password"
                                :error="errors.password ? true : false" />
                        </v-col>

                        <!-- From email -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.from_email"
                                :hide-details="!errors.from_email"
                                :placeholder="$t('t_enter_smtp_from_email')"
                                append-icon="mdi-at"
                                color="indigo accent-3" 
                                :rules="errors.from_email"
                                :error="errors.from_email ? true : false" />
                        </v-col>

                        <!-- From name -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.from_name"
                                :hide-details="!errors.from_name"
                                :placeholder="$t('t_enter_smtp_from_name')"
                                append-icon="mdi-account-circle"
                                color="indigo accent-3" 
                                :rules="errors.from_name"
                                :error="errors.from_name ? true : false" />
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
            let response = await $axios.get('dashboard/settings/smtp')

			return {
				form : {
                    host      : response.data.host,
                    port      : response.data.port,
                    is_secure : response.data.is_secure,
                    username  : response.data.username,
                    password  : response.data.password,
                    from_email: response.data.from_email,
                    from_name : response.data.from_name
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
                title: this.$t('t_smtp_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    host      : this.form.host,
                    port      : this.form.port,
                    is_secure : this.form.is_secure,
                    username  : this.form.username,
                    password  : this.form.password,
                    from_email: this.form.from_email,
                    from_name : this.form.from_name
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/smtp', data)
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