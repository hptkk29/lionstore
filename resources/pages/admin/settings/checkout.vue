<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_checkout_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable guest mode -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.is_guest_checkout" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_checkout_as_guest')">
                            </v-switch>
                        </v-col>

                        <!-- Enable name -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_name" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_name_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable phone -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_phone" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_phone_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable state -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_state" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_state_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable city -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_city" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_city_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable address -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_address" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_address_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable zipcode -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.field_zipcode" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_zipcode_field_checkout')">
                            </v-switch>
                        </v-col>

                        <!-- Enable buy on whatsapp -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.is_whatsapp_order" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_buy_on_whatsapp_btn')">
                            </v-switch>
                        </v-col>

                        <!-- Enable buy on whatsapp on mobile -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.whatsapp_btn_mobile" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_buy_on_whatsapp_mobile')">
                            </v-switch>
                        </v-col>

                        <!-- Enable buy on whatsapp on desktop -->
                        <v-col cols="12">
                            <v-switch inset dense v-model="form.whatsapp_btn_desktop" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_buy_on_whatsapp_desktop')">
                            </v-switch>
                        </v-col>

                        <!-- Whatsapp number -->
                        <v-col cols="12">
                            <v-text-field dense outlined persistent-hint
                                v-model="form.whatsapp_number"
                                :placeholder="$t('t_enter_whatsapp_number')"
                                :hint="$t('t_enter_whatsapp_number_hint')"
                                append-icon="mdi-phone"
                                color="indigo accent-3" 
                                :rules="errors.whatsapp_number"
                                :error="errors.whatsapp_number ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12" class="pt-8">
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
            let response = await $axios.get('dashboard/settings/checkout')

			return {
				form      : {
                    is_guest_checkout   : response.data.is_guest_checkout,
                    field_name          : response.data.field_name,
                    field_phone         : response.data.field_phone,
                    field_state         : response.data.field_state,
                    field_city          : response.data.field_city,
                    field_address       : response.data.field_address,
                    field_zipcode       : response.data.field_zipcode,
                    is_whatsapp_order   : response.data.is_whatsapp_order,
                    whatsapp_btn_mobile : response.data.whatsapp_btn_mobile,
                    whatsapp_btn_desktop: response.data.whatsapp_btn_desktop,
                    whatsapp_number     : response.data.whatsapp_number
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
                title: this.$t('t_checkout_settings')
			}
		},

        watch: {
            'form.is_whatsapp_order': {
                handler: function (after, before) {
                    if (after === false) {
                        this.form.whatsapp_btn_mobile  = 0
                        this.form.whatsapp_btn_desktop = 0
                    }
                },
                deep: true
            }
        },

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_guest_checkout   : this.form.is_guest_checkout,
                    field_name          : this.form.field_name,
                    field_phone         : this.form.field_phone,
                    field_state         : this.form.field_state,
                    field_city          : this.form.field_city,
                    field_address       : this.form.field_address,
                    field_zipcode       : this.form.field_zipcode,
                    is_whatsapp_order   : this.form.is_whatsapp_order,
                    whatsapp_btn_mobile : this.form.whatsapp_btn_mobile,
                    whatsapp_btn_desktop: this.form.whatsapp_btn_desktop,
                    whatsapp_number     : this.form.whatsapp_number
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/checkout', data)
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