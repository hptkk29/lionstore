<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Current password -->
        <v-dialog v-model="dialog.password" persistent max-width="400px">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-4">
                    <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_current_password'"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog.password = !dialog.password">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="pt-8 px-8">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.current_password"
                                :hide-details="!errors.current_password"
                                :placeholder="$t('t_enter_your_current_pass')"
                                append-icon="mdi-lock"
                                color="indigo accent-3" 
                                type="password"
                                :rules="errors.current_password"
                                :error="errors.current_password ? true : false" />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="pb-6 px-8">
                    <v-spacer />
                    <v-btn depressed dark color="indigo accent-3" min-width="100px" @click="update">
                        <span class="fs-11 font-weight-medium px-6" v-t="'t_update_profile'"></span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>

            <!-- Sidebar -->
            <customer-layout v-if="!$device.isMobileOrTablet" />

            <v-col :cols="$device.isMobileOrTablet ? 12 : 9">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_account_settings'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="py-10 px-8">
                        <v-row>

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

                            <!-- Email -->
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

                            <v-col cols="12" v-if="!form.is_social">
                                <v-row align="center" justify="space-around" class="mx-0 px-0 my-4">
                                    <v-divider />
                                        <h1 class="fs-11 font-weight-medium text-uppercase mx-4" v-t="'t_change_password_section'"></h1>
                                    <v-divider />
                                </v-row>
                            </v-col>

                            <!-- New password -->
                            <v-col cols="12" md="6" v-if="!form.is_social">
                                <v-text-field dense outlined
                                    v-model="form.new_password"
                                    :hide-details="!errors.new_password"
                                    :placeholder="$t('t_enter_new_password')"
                                    append-icon="mdi-lock"
                                    type="password"
                                    color="indigo accent-3" 
                                    :rules="errors.new_password"
                                    :error="errors.new_password ? true : false" />
                            </v-col>

                            <!-- New password confirmation -->
                            <v-col cols="12" md="6" v-if="!form.is_social">
                                <v-text-field dense outlined
                                    v-model="form.new_password_confirm"
                                    :hide-details="!errors.new_password_confirm"
                                    :placeholder="$t('t_enter_new_password_confirm')"
                                    append-icon="mdi-lock"
                                    type="password"
                                    color="indigo accent-3"
                                    :rules="errors.new_password_confirm"
                                    :error="errors.new_password_confirm ? true : false" />
                            </v-col>

                            <!-- Submit -->
                            <v-col cols="12">
                                <v-btn rounded color="indigo accent-3" depressed block @click="form.is_social ? update() : dialog.password = true" :loading="loading" :disabled="loading" :dark="!loading">
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

    components: {
        'customer-layout': () => import('~/pages/main/customer/layout/layout')
    },

    async asyncData({ app, $axios, params }) {
        // Send request to server
        let response = await $axios.post('customer/profile/edit')

        return {
            form: {
                id                  : response.data.id,
                username            : response.data.username,
                email               : response.data.email,
                is_social           : response.data.is_social,
                current_password    : '',
                new_password        : '',
                new_password_confirm: ''
            }
            
        }
    },

    data() {
        return {
            dialog: {
                password: false
            },
            errors: [],
            loading: false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_my_account')

        }
    },

    methods: {

        // Update
        async update() {

            // Start loading
            this.loading = true

            // Get data
            let data     = {
                id                  : this.form.id,
                username            : this.form.username,
                email               : this.form.email,
                new_password        : this.form.new_password,
                new_password_confirm: this.form.new_password_confirm,
                current_password    : this.form.current_password
            }

            // Send request to server
            await this.$axios
                        .post('customer/profile/update', data)
                        .then(response => {

                            // Success
                            this.$message(this.$t('t_toast_process_done'))

                            // Remove errors
                            this.errors                    = []

                            // Reset password inputs
                            this.form.new_password         = ''
                            this.form.new_password_confirm = ''
                            this.form.current_password     = ''

                            // Close password dialog
                            this.dialog.password           = false

                            // Scroll to top
                            this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                        })
                        .catch(error => {
                            
                            // Form errors
                            if (error.response.status === 422) {
                                this.errors  = this.$errors(error.response.data.errors)
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                            } else if (error.response.status === 401) {
                                
                                // Wrong password
                                this.$message(this.$t('t_toast_wrong_password'), 'alert-rhombus', 'error')

                            } else {

                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                            }

                        })
                        .finally(() => {
                            // Stop loading
                            this.loading = false
                        })

        }

    }

}
</script>