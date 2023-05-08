<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Read refund reason -->
        <v-dialog v-model="refund.dialog" persistent :max-width="500" v-if="refund.reason">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_refund_reason'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="refund.dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4" v-html="refund.reason.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
            </v-card>
        </v-dialog>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_refunds_requests')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Process -->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-expand-transition>
                        <v-btn v-if="selected.length" v-on="on" key="delete" icon @click="process(selected)">
                            <v-icon>mdi-check-bold</v-icon>
                        </v-btn>
                        </v-expand-transition>
                    </template>
                    <span v-text="$t('t_process_request')"></span>
                </v-tooltip>

                <!-- Read -->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-expand-transition>
                        <v-btn v-if="selected.length" v-on="on" key="delete" icon @click="read(selected)">
                            <v-icon>mdi-file-eye</v-icon>
                        </v-btn>
                        </v-expand-transition>
                    </template>
                    <span v-text="$t('t_mark_as_read')"></span>
                </v-tooltip>

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
                :items="refunds"
                item-key="id"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Order number -->
                <template v-slot:[`item.order`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="item.order.order_number"></span>
                </template>

                <!-- Order amount -->
                <template v-slot:[`item.amount`]="{ item }">
                    <span class="fs-12 ff-default font-weight-regular" v-text="$formatMoney(item.order.total_price, item.order.payment.payment_currency_locale, item.order.payment.payment_currency)"></span>
                </template>

                <!-- Refund status -->
                <template v-slot:[`item.status`]="{ item }">
                    
                    <!-- Processed -->
                    <v-chip small label color="#d3fcef" text-color="#1fa25f" v-if="item.is_processed">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_processed') }}</span>
                    </v-chip>

                    <!-- New request -->
                    <v-chip small label color="#eaeaea" text-color="#767676" v-if="!item.is_seen">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_new_request') }}</span>
                    </v-chip>

                    <!-- Marked as read -->
                    <v-chip small label color="#fff7d0" text-color="#a18604" v-if="item.is_seen && !item.is_processed">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_marked_as_read') }}</span>
                    </v-chip>

                </template>

                <!-- Refund date -->
                <template v-slot:[`item.date`]="{ item }">
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

                                <!-- Refund reason -->
                                <v-list-item @click="reason(item)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-frequently-asked-questions</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_return_reason')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Details -->
                                <v-list-item :href="$clientIndex(`dashboard/orders/details/${item.order.uid}`)" target="_blank">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-clipboard-list</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_order_details')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Read -->
                                <v-list-item @click.prevent="read([item], true)" v-if="!item.is_seen">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-file-eye</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_mark_as_read')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Process -->
                                <v-list-item @click.prevent="process([item], true)" v-if="!item.is_processed">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-check-bold</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_process_request')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_request')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="refundsData.total > refundsData.per_page"
                v-model="refundsData.current_page"
                :length="refundsData.last_page"
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
			// Get refunds
			let response = await $axios.get('dashboard/refunds')
			return {
				refundsData : response.data.meta,
				refunds     : response.data.data
			}
		},

        data() {
            return {
                loading : false,
                selected: [],
                refund  : {
                    reason: '',
                    dialog: false
                }
            }
        },

        head() {
			return {
                title: this.$t('t_refunds_requests')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_order_number'), value: 'order', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_total_amount'), value: 'amount', sortable: false, align: 'center'},
		          	{ text: this.$t('t_refund_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_refund_date'), value: 'date', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get refunds next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/refunds?page=${page}`)
                            .then(response => {

                                // Set new refunds
                                this.refundsData = response.data.meta
                                this.refunds     = response.data.data
                                
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
                            const url    = '/dashboard/refunds/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.refunds.splice(this.refunds.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.refunds.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.refunds.splice(vm.refunds.indexOf(item), 1);
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

            // Process requests
            async process(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_process_requests'),
                    message: this.$t('t_process_requests_confirm_desc'),
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
                            const url    = '/dashboard/refunds/options/process'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    this.refunds[this.refunds.indexOf(items[0])].is_seen      = true
                                                    this.refunds[this.refunds.indexOf(items[0])].is_processed = true

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.refunds.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                vm.refunds[vm.refunds.indexOf(item)].is_seen      = true
                                                                vm.refunds[vm.refunds.indexOf(item)].is_processed = true
                                                            }
                                                            
                                                        })
                                                    })
                                                    
                                                    // Deselect old items
                                                    this.selected = []

                                                }

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
                )

            },

            // Mark as read
            async read(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_mark_as_read'),
                    message: this.$t('t_mark_as_read_confirm'),
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
                            const url    = '/dashboard/refunds/options/read'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    this.refunds[this.refunds.indexOf(items[0])].is_seen = true

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.refunds.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                vm.refunds[vm.refunds.indexOf(item)].is_seen = true
                                                            }
                                                            
                                                        })
                                                    })
                                                    
                                                    // Deselect old items
                                                    this.selected = []

                                                }

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
                )

            },

            // Read refund reason
            reason(refund) {
                
                this.refund.reason = refund.refund_reason
                this.refund.dialog = true

            }

        }
        
    }
</script>