<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card flat class="c-card mb-4">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_sms_template_tags')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-8">

                <span class="mb-4 d-block" v-t="'t_sms_template_tags_desc'"></span>

                <v-row>
                    <v-col cols="12" md="5">

                        <!-- Order number -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-medium fs-13">{orderNumber}</span>
                            </v-col>
                            <div class=" col fs-13" v-t="'t_order_number_sms_tag'"></div>
                        </div>

                        <!-- Fullname -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-medium fs-13">{fullname}</span>
                            </v-col>
                            <div class=" col fs-13" v-t="'t_fullname_sms_tag'"></div>
                        </div>

                        <!-- Total amount -->
                        <div class="row spacer no-gutters align-center mb-2">
                            <v-col cols="5" class="text-no-wrap">
                                <span class="font-weight-medium fs-13">{amount}</span>
                            </v-col>
                            <div class=" col fs-13" v-t="'t_amount_sms_tag'"></div>
                        </div>

                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_sms_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable/Disable Sms system -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_active"
                                :hide-details="!errors.is_active"
                                :placeholder="$t('t_enable_sms_system')"
                                :items="[{ text: $t('t_enable_sms_system'), value: 1 }, { text: $t('t_disable_sms_system'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_active"
                                :error="errors.is_active ? true : false" />
                        </v-col>

                        <!-- Default sms gateway -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.default_gateway"
                                :hide-details="!errors.default_gateway"
                                :placeholder="$t('t_default_sms_gateway')"
                                :items="[{ text: $t('t_twilio_gateway'), value: 'twilio' }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.default_gateway"
                                :error="errors.default_gateway ? true : false" />
                        </v-col>

                        <!-- Order confirmed template -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.template_order_confirmed"
                                :hide-details="!errors.template_order_confirmed"
                                :placeholder="$t('t_enter_template_for_confirmed_order_sms')"
                                append-icon="mdi-checkbox-marked-circle-outline"
                                color="indigo accent-3" 
                                :rules="errors.template_order_confirmed"
                                :error="errors.template_order_confirmed ? true : false" />
                        </v-col>

                        <!-- Order delivered template -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.template_order_delivered"
                                :hide-details="!errors.template_order_delivered"
                                :placeholder="$t('t_enter_template_for_delivered_order_sms')"
                                append-icon="mdi-truck-check"
                                color="indigo accent-3" 
                                :rules="errors.template_order_delivered"
                                :error="errors.template_order_delivered ? true : false" />
                        </v-col>

                        <!-- Order shipped template -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.template_order_shipped"
                                :hide-details="!errors.template_order_shipped"
                                :placeholder="$t('t_enter_template_for_shipped_order_sms')"
                                append-icon="mdi-truck-fast"
                                color="indigo accent-3" 
                                :rules="errors.template_order_shipped"
                                :error="errors.template_order_shipped ? true : false" />
                        </v-col>

                        <!-- Order refunded template -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.template_order_refunded"
                                :hide-details="!errors.template_order_refunded"
                                :placeholder="$t('t_enter_template_for_refunded_order_sms')"
                                append-icon="mdi-credit-card-refund"
                                color="indigo accent-3" 
                                :rules="errors.template_order_refunded"
                                :error="errors.template_order_refunded ? true : false" />
                        </v-col>

                        <!-- Order canceled template -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.template_order_canceled"
                                :hide-details="!errors.template_order_canceled"
                                :placeholder="$t('t_enter_template_for_canceled_order_sms')"
                                append-icon="mdi-cancel"
                                color="indigo accent-3" 
                                :rules="errors.template_order_canceled"
                                :error="errors.template_order_canceled ? true : false" />
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
            let response = await $axios.get('dashboard/settings/sms')

			return {
				form      : {
                    is_active               : response.data.is_active,
                    default_gateway         : response.data.default_gateway,
                    template_order_confirmed: response.data.template_order_confirmed,
                    template_order_delivered: response.data.template_order_delivered,
                    template_order_shipped  : response.data.template_order_shipped,
                    template_order_refunded : response.data.template_order_refunded,
                    template_order_canceled : response.data.template_order_canceled
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
                title: this.$t('t_sms_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_active               : this.form.is_active,
                    default_gateway         : this.form.default_gateway,
                    template_order_confirmed: this.form.template_order_confirmed,
                    template_order_delivered: this.form.template_order_delivered,
                    template_order_shipped  : this.form.template_order_shipped,
                    template_order_refunded : this.form.template_order_refunded,
                    template_order_canceled : this.form.template_order_canceled
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/sms', data)
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