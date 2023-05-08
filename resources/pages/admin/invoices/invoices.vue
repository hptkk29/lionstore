<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Notification -->
        <v-alert text color="amber darken-2">
            <span class="fs-12 font-weight-medium" v-t="'t_go_to_orders_generate_invocies'"></span>
        </v-alert>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_invoices')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Delete -->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-expand-transition>
                        <v-btn v-if="selected.length" v-on="on" key="delete" icon @click="remove(selected)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-expand-transition>
                    </template>
                    <span v-text="$t('t_delete')"></span>
                </v-tooltip>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="invoices"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                disable-pagination
                :mobile-breakpoint="0"
                show-select
            >

                <!-- Invoice name -->
                <template v-slot:[`item.name`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="item.invoice_name"></span>
                </template>

                <!-- Order number -->
                <template v-slot:[`item.order`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="item.order.order_number"></span>
                </template>

                <!-- Invoice status -->
                <template v-slot:[`item.status`]="{ item }">

                    <!-- Paid -->
                    <v-btn depressed :min-width="100" dark small color="light-green lighten-4" v-if="item.invoice_status === 'paid'">
                        <span class="font-weight-medium fs-10 green--text text--darken-4" v-t="'t_paid'"></span>
                    </v-btn>

                    <!-- Pending -->
                    <v-btn depressed :min-width="100" dark small color="yellow lighten-4" v-if="item.invoice_status === 'pending'">
                        <span class="font-weight-medium fs-10 yellow--text text--darken-4" v-t="'t_pending'"></span>
                    </v-btn>

                </template>

                <!-- Invoice amount -->
                <template v-slot:[`item.amount`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$formatMoney(item.invoice_amount, item.order.payment.payment_currency_locale, item.order.payment.payment_currency)"></span>
                </template>

                <!-- Created -->
                <template v-slot:[`item.created`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="$ago(item.created_at)"></span>
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

                                <!-- Details -->
                                <v-list-item nuxt :to="`/dashboard/orders/details/${item.order.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-clipboard-list</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_order_details')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Download -->
                                <v-list-item @click.prevent="download(item)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-download</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_download_invoice')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_invoice')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="invoicesData.total > invoicesData.per_page"
                v-model="invoicesData.current_page"
                :length="invoicesData.last_page"
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
    import fileDownload from 'js-file-download'

    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get invoices
			let response = await $axios.get('dashboard/invoices')
			return {
				invoicesData : response.data.meta,
				invoices     : response.data.data
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
                title: this.$t('t_invoices')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_invoice_name'), value: 'name', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_order_number'), value: 'order', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_invoice_status'), value: 'status', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_invoice_amount'), value: 'amount', sortable: false, align: 'center'},
		          	{ text: this.$t('t_created'), value: 'created', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get invoices next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/invoices?page=${page}`)
                            .then(response => {

                                // Set new invoices
                                this.invoicesData = response.data.meta
                                this.invoices     = response.data.data
                                
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
                            const url    = '/dashboard/invoices/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.invoices.splice(this.invoices.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.invoices.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.invoices.splice(vm.invoices.indexOf(item), 1);
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

            // Download invoice
            async download(invoice) {

                // Start loading
                this.loading = true

                // Get server url
                const url    = 'dashboard/invoices/options/download'

                // Set request config
                const config = {
                    responseType: 'blob',
                    headers: { 
                        'Cache-Control': 'no-cache',
                        'Pragma'       : 'no-cache',
                        'Expires'      : '0',
                    }
                }

                // Send request
                await this.$axios.post(url, { id: invoice.id }, config)
                                .then(response => {

                                    fileDownload(response.data, `${ invoice.invoice_name }.pdf`);

                                    // Success
                                    this.$message(this.$t('t_toast_process_done'))

                                }).catch(error => {
                                    console.log(error)
                                    // Error
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                                }).finally(() => {

                                    // Stop loading
                                    this.loading = false

                                })

            }

        }
        
    }
</script>