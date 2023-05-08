<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Try -->
        <v-dialog v-model="test" persistent :max-width="500">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_try_yourself'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="test = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Value -->
                        <v-col cols="12">
                            <v-text-field dense outlined hide-details
                                v-model="value"
                                :placeholder="$t('t_enter_price_value')"
                                append-icon="mdi-cash"
                                color="indigo accent-3"/>
                        </v-col>

                        <v-col cols="12">
                            <span class="pb-6  pt-4 black--text ff-default text-center d-block fs-30 font-weight-bold" v-text="$formatMoney(value, form.locale, form.code)"></span>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_currency_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="test = true">
                    <v-icon>mdi-card-bulleted-settings-outline</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- name -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.name"
                                :hide-details="!errors.name"
                                :placeholder="$t('t_enter_currency_name')"
                                append-icon="mdi-cash"
                                color="indigo accent-3" 
                                :rules="errors.name"
                                :error="errors.name ? true : false" />
                        </v-col>

                        <!-- Plural name -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.name_plural"
                                :hide-details="!errors.name_plural"
                                :placeholder="$t('t_enter_currency_name_plural')"
                                append-icon="mdi-cash-multiple"
                                color="indigo accent-3" 
                                :rules="errors.name_plural"
                                :error="errors.name_plural ? true : false" />
                        </v-col>

                        <!-- Symbol -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.symbol"
                                :hide-details="!errors.symbol"
                                :placeholder="$t('t_enter_currency_symbol')"
                                append-icon="mdi-currency-gbp"
                                color="indigo accent-3" 
                                :rules="errors.symbol"
                                :error="errors.symbol ? true : false" />
                        </v-col>

                        <!-- Symbol native -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined
                                v-model="form.symbol_native"
                                :hide-details="!errors.symbol_native"
                                :placeholder="$t('t_enter_currency_symbol_native')"
                                append-icon="mdi-currency-eth"
                                color="indigo accent-3" 
                                :rules="errors.symbol_native"
                                :error="errors.symbol_native ? true : false" />
                        </v-col>

                        <!-- Code -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.code"
                                :hide-details="!errors.code"
                                :placeholder="$t('t_enter_currency_code')"
                                append-icon="mdi-alphabetical-variant"
                                color="indigo accent-3" 
                                :rules="errors.code"
                                :error="errors.code ? true : false" />
                        </v-col>

                        <!-- Locale -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.locale"
                                :hide-details="!errors.locale"
                                :placeholder="$t('t_enter_currency_locale')"
                                append-icon="mdi-flag-triangle"
                                color="indigo accent-3" 
                                :rules="errors.locale"
                                :error="errors.locale ? true : false" />
                        </v-col>

                        <!-- Exchange rate -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.exchange_rate"
                                :hide-details="!errors.exchange_rate"
                                :placeholder="$t('t_enter_currency_exchange')"
                                append-icon="mdi-calculator-variant"
                                color="indigo accent-3" 
                                :rules="errors.exchange_rate"
                                :error="errors.exchange_rate ? true : false" />
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
            let response = await $axios.get('/dashboard/settings/currency')

			return {
				form      : {
                    locale       : response.data.locale,
                    code         : response.data.code,
                    symbol       : response.data.symbol,
                    name         : response.data.name,
                    symbol_native: response.data.symbol_native,
                    name_plural  : response.data.name_plural,
                    exchange_rate: response.data.exchange_rate
                }
			}
		},

        data() {
            return {
                errors : [],
                loading: false,
                test   : false,
                value  : 100
            }
        },

        head() {
			return {
                title: this.$t('t_currency_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    locale       : this.form.locale,
                    code         : this.form.code,
                    symbol       : this.form.symbol,
                    symbol_native: this.form.symbol_native,
                    name         : this.form.name,
                    name_plural  : this.form.name_plural,
                    exchange_rate: this.form.exchange_rate
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/settings/currency', data)
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