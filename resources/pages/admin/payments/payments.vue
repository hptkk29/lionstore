<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_payments')"></v-toolbar-title>

            </v-toolbar>
            
            <v-data-table
                :headers="headers"
                :items="payments"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
            >

                <!-- Order -->
                <template v-slot:[`item.order`]="{ item }">
                    <nuxt-link :to="`/dashboard/orders/details/${ item.order.uid }`">
                        <span class="fs-12 ff-default font-weight-bold" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="item.order_id"></span>
                    </nuxt-link>
                </template>

                <!-- Payment method -->
                <template v-slot:[`item.method`]="{ item }">

                    <!-- Paypal -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#cae4ff" text-color="#3b7bbf" v-if="item.payment_method === 'paypal'">{{ $t('t_paypal') }}</v-chip>

                    <!-- Stripe -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#ecfbff" text-color="#00afe1" v-if="item.payment_method === 'stripe'">{{ $t('t_stripe') }}</v-chip>

                    <!-- Cash on delivery -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#ffd6cc" text-color="#e12a00" v-if="item.payment_method === 'cod'">{{ $t('t_cash_on_delivery') }}</v-chip>

                    <!-- Offline -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#e8e8e8" text-color="#a0a0a0" v-if="item.payment_method === 'offline'">{{ $t('t_bank_transfer') }}</v-chip>

                </template>

                <!-- Amount -->
                <template v-slot:[`item.amount`]="{ item }">
                    <span class="fs-14 ff-default font-weight-light" v-text="$formatMoney(item.payment_amount, item.payment_currency_locale, item.payment_currency)"></span>
                </template>

                <!-- Transaction -->
                <template v-slot:[`item.transaction`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="item.transaction_id"></span>
                </template>

                <!-- Payment date -->
                <template v-slot:[`item.date`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">
                    <v-menu bottom :left="!$vuetify.rtl" :right="$vuetify.rtl" origin="center center" :max-height="300" :min-width="200" content-class="elegant-menu">
                        <template v-slot:activator="{ on }">
                            <v-btn small v-on="on" icon>
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense avatar class="py-0">

                                <!-- Edit -->
                                <v-list-item nuxt :to="`/dashboard/payments/edit/${item.handler}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_page')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Delete -->
                                <v-list-item @click.prevent="remove([item], true)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-delete</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_delete_page')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="paymentsData.total > paymentsData.per_page"
                v-model="paymentsData.current_page"
                :length="paymentsData.last_page"
                @input="getNextPage"
                :total-visible="7"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                color="indigo accent-3"
                class="pa-4"
                ></v-pagination>

        </v-card>

    </v-container>
</template>

<script>
    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get payments
			let response = await $axios.get('dashboard/payments')
			return {
				paymentsData : response.data.meta,
				payments     : response.data.data
			}
		},

        data() {
            return {
                loading      : false,
                selected     : []
            }
        },

        head() {
			return {
                title: this.$t('t_payments')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_order_number'), value: 'order', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_payment_method'), value: 'method', sortable: false, align: 'center'},
		          	{ text: this.$t('t_amount'), value: 'amount', sortable: false, align: 'center'},
		          	{ text: this.$t('t_transaction_id'), value: 'transaction', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_payment_date'), value: 'date', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get payments next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/payments?page=${page}`)
                            .then(response => {

                                // Set new payments
                                this.paymentsData = response.data.meta
                                this.payments     = response.data.data
                                
                                // Scroll top
                                this.$scrollTo('#scroll-top-admin', 300, {})

                            })
                            .catch(error => {

                                // Error
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                            }).finally(() => {

                                // Stop loader
                                this.loading = false

                            })

            },

            // Delete data
            async remove(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_delete'),
                    message: this.$t('t_confirm_deletion_text'),
                    button: {
                        no: this.$t('t_cancel'),
                        yes: this.$t('t_confirm')
                    },
                    /**
                     * Callback Function
                     * @param {Boolean} confirm 
                     */
                    callback: async confirm => {
                        if (confirm) {
                        
                            // Start loading
                            this.loading = true

                            // Get server url
                            const url    = '/dashboard/payments/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.payments.splice(this.payments.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.payments.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.payments.splice(vm.payments.indexOf(item), 1);
                                                            }
                                                            
                                                        })
                                                    })
                                                    
                                                    // Deselect old items
                                                    this.selected = []

                                                }

                                                // Success
                                                this.$message(this.$t('t_toast_process_done'))

                                            }).catch(error => {

                                                // Error
                                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                                            }).finally(() => {

                                                // Stop loading
                                                this.loading = false

                                            })

                        }
                    }
                    }
                )

            },

            // Get page title
            title(page) {

                // Get current locale
                const locale = this.$i18n.locale

                // Return title depends on current locale
                switch (locale) {
                    case 'ar':
                        return page.translation.title_ar
                        break;

                    case 'az':
                        return page.translation.title_az
                        break;

                    case 'cn':
                        return page.translation.title_cn
                        break;

                    case 'de':
                        return page.translation.title_de
                        break;

                    case 'en':
                        return page.translation.title_en
                        break;

                    case 'es':
                        return page.translation.title_es
                        break;

                    case 'fr':
                        return page.translation.title_fr
                        break;

                    case 'hi':
                        return page.translation.title_hi
                        break;

                    case 'hu':
                        return page.translation.title_hu
                        break;

                    case 'jp':
                        return page.translation.title_jp
                        break;

                    case 'nl':
                        return page.translation.title_nl
                        break;

                    case 'po':
                        return page.translation.title_po
                        break;

                    case 'pt':
                        return page.translation.title_pt
                        break;

                    case 'ro':
                        return page.translation.title_ro
                        break;

                    case 'ru':
                        return page.translation.title_ru
                        break;

                    case 'th':
                        return page.translation.title_th
                        break;

                    case 'tr':
                        return page.translation.title_tr
                        break;

                    case 'ua':
                        return page.translation.title_ua
                        break;
                
                    default:
                        return page.translation.title_en
                        break;
                }

            }

        }
        
    }
</script>