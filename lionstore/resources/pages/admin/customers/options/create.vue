<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_create_customer')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/customers">
                            <v-icon>mdi-account-supervisor</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_customers')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- E-mail address -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.email"
                                :hide-details="!errors.email"
                                :placeholder="$t('t_enter_email')"
                                append-icon="mdi-at"
                                color="indigo accent-3" 
                                :rules="errors.email"
                                :error="errors.email ? true : false" />
                        </v-col>

                        <!-- Username -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.username"
                                :hide-details="!errors.username"
                                :placeholder="$t('t_enter_username')"
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
                                :placeholder="$t('t_enter_password')"
                                append-icon="mdi-lock"
                                type="password"
                                color="indigo accent-3" 
                                :rules="errors.password"
                                :error="errors.password ? true : false" />
                        </v-col>

                        <!-- Verification -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_verified"
                                :hide-details="!errors.is_verified"
                                :placeholder="$t('t_customer_status')"
                                :items="[{ text: $t('t_verified'), value: 1 }, { text: $t('t_unverified'), value: 0 }]"
                                item-value="value"
                                item-text="text"
                                color="indigo accent-3" 
                                :rules="errors.is_verified"
                                :error="errors.is_verified ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="create" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 font-weight-medium" v-t="'t_create'" v-if="!loading"></span>
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

        data() {
            return {
                form: {
                    email      : '',
                    username   : '',
                    password   : '',
                    is_verified: '',
                },
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_create_customer')
			}
		},

        methods: {

            // Insert
            async create() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    username   : this.form.username,
                    email      : this.form.email,
                    password   : this.form.password,
                    is_verified: this.form.is_verified,
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/customers/options/create', data)
                            .then(response => {

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Remove errors
                                this.errors = []

                                // Reset form
                                this.reset()

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

            },

            // Reset form
            reset() {
                this.form.username = ''
                this.form.email    = ''
                this.form.password = ''
            }
        }
    }
</script>