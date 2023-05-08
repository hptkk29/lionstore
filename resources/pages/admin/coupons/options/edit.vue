<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_edit_coupon')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/coupons">
                            <v-icon>mdi-sale</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_coupons')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>
                        
                        <!-- coupon code -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.code"
                                :hide-details="!errors.code"
                                :placeholder="$t('t_enter_coupon_code')"
                                append-icon="mdi-barcode-scan"
                                color="indigo accent-3" 
                                :rules="errors.code"
                                :error="errors.code ? true : false" />
                        </v-col>

                        <!-- Type -->
                        <v-col :cols="12">
                            <v-select dense outlined
                                v-model="form.type"
                                :hide-details="!errors.type"
                                :items="[ { value: 'money' , text: $t('t_money_discount') }, { value: 'percentage' , text: $t('t_percentage_discount') } ]"
                                item-value="value"
                                item-text="text"
                                :placeholder="$t('t_choose_discount_type')"
                                color="indigo accent-3" 
                                :rules="errors.type"
                                :error="errors.type ? true : false" />
                        </v-col>

                        <!-- Value -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.value"
                                :hide-details="!errors.value"
                                :placeholder="$t('t_enter_discount_value')"
                                :suffix="form.type === 'percentage' ? '%' : currencySymbol"
                                color="indigo accent-3" 
                                :rules="errors.value"
                                :error="errors.value ? true : false" />
                        </v-col>

                        <!-- Unlimted -->
                        <v-col cols="12" :md="form.unlimited ? 12 : 6">
                            <v-select dense outlined
                                v-model="form.unlimited"
                                :hide-details="!errors.unlimited"
                                :items="[ { value: 1, text: $t('t_unlimited_usage') }, { value: 0, text: $t('t_limited_usage') } ]"
                                item-value="value"
                                item-text="text"
                                :placeholder="$t('t_choose_coupon_usage')"
                                color="indigo accent-3" 
                                :rules="errors.unlimited"
                                :error="errors.unlimited ? true : false" />
                        </v-col>

                        <!-- Usage -->
                        <v-col cols="12" md="6" v-if="!form.unlimited">
                            <v-text-field dense outlined
                                v-model="form.usage"
                                :hide-details="!errors.usage"
                                :placeholder="$t('t_enter_coupon_max_usage')"
                                color="indigo accent-3" 
                                append-icon="mdi-numeric"
                                :rules="errors.usage"
                                :error="errors.usage ? true : false" />
                        </v-col>

                        <!-- Coupon start date -->
                        <v-col cols="12" md="6">
                            <v-dialog
                                ref="dateStart"
                                v-model="dates.start"
                                :return-value.sync="form.start_date"
                                persistent
                                max-width="500px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field outlined dense readonly 
                                        v-on="on"
                                        v-model="form.start_date"
                                        :hide-details="!errors.start_date"
                                        :placeholder="$t('t_choose_coupon_start_date')"
                                        color="indigo accent-3" 
                                        append-icon="mdi-calendar-import"
                                        :rules="errors.start_date"
                                        :error="errors.start_date ? true : false" />
                                </template>
                                <v-date-picker :locale="$i18n.locale" v-model="form.start_date" scrollable landscape color="indigo accent-3" :min="now">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="indigo accent-3" @click="dates.start = false" v-text="$t('t_cancel')"></v-btn>
                                    <v-btn depressed dark color="indigo accent-3" @click="$refs.dateStart.save(form.start_date)" v-text="$t('t_choose')"></v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <!-- Coupon end date -->
                        <v-col cols="12" md="6">
                            <v-dialog
                                ref="dateEnd"
                                v-model="dates.end"
                                :return-value.sync="form.end_date"
                                persistent
                                max-width="500px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field outlined dense readonly 
                                        v-on="on"
                                        v-model="form.end_date"
                                        :hide-details="!errors.end_date"
                                        :placeholder="$t('t_choose_coupon_end_date')"
                                        color="indigo accent-3" 
                                        append-icon="mdi-calendar-export"
                                        :rules="errors.end_date"
                                        :error="errors.end_date ? true : false" />
                                </template>
                                <v-date-picker v-model="form.end_date" scrollable landscape color="indigo accent-3" :min="now">
                                    <v-spacer></v-spacer>
                                    <v-btn text color="indigo accent-3" @click="dates.end = false" v-text="$t('t_cancel')"></v-btn>
                                    <v-btn depressed dark color="indigo accent-3" @click="$refs.dateEnd.save(form.end_date)" v-text="$t('t_choose')"></v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <!-- Status -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_active"
                                :hide-details="!errors.is_active"
                                :placeholder="$t('t_coupon_status')"
                                :items="[{ text: $t('t_active'), value: 1 }, { text: $t('t_inactive'), value: 0 }]"
                                item-value="value"
                                item-text="text"
                                color="indigo accent-3" 
                                :rules="errors.is_active"
                                :error="errors.is_active ? true : false" />
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
    import moment from 'moment'

    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, params }) {
			// Get data
			let response = await $axios.post('dashboard/coupons/options/edit', { id: params.id })
			return {
                form: {
                    id        : response.data.coupon.id,
                    type      : response.data.coupon.coupon_type,
                    code      : response.data.coupon.coupon_code,
                    value     : response.data.coupon.discount_value,
                    usage     : response.data.coupon.usage_times,
                    start_date: moment(response.data.coupon.start_date).format('YYYY-MM-DD'),
                    end_date  : moment(response.data.coupon.ends_date).format('YYYY-MM-DD'),
                    unlimited : response.data.coupon.is_unlimited,
                    is_active : response.data.coupon.is_active,
                }
			}
		},

        data() {
            return {
                dates: {
                    start: false,
                    end  : false
                },
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_edit_coupon')
			}
		},

        computed: {
            
            // Get selected currency symbol
            currencySymbol() {
                
                return '$'

            },

            // Now time
            now() {
                let today = new Date()
                let dd    = String(today.getDate()).padStart(2, '0')
                let mm    = String(today.getMonth() + 1).padStart(2, '0')
                let yyyy  = today.getFullYear()

                // Generate today as string
                today     = `${yyyy}-${mm}-${dd}`

                // Return date
                return today
            }

        },

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    id        : this.form.id,
                    type      : this.form.type,
                    code      : this.form.code,
                    value     : this.form.value,
                    usage     : this.form.usage,
                    start_date: this.form.start_date,
                    end_date  : this.form.end_date,
                    unlimited : this.form.unlimited,
                    is_active : this.form.is_active
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/coupons/options/update', data)
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