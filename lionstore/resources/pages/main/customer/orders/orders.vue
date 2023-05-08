<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Order details -->
        <customer-order-details />

        <!-- Cancel reason -->
        <v-dialog v-model="cancelForm.dialog" persistent :max-width="500" v-if="cancelForm.order">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_cancel_reason'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="cancelForm.dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Cancel reason -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="cancelForm.reason"
                                :hide-details="!errors.reason"
                                :placeholder="$t('t_enter_cancel_reason')"
                                append-icon="mdi-frequently-asked-questions"
                                color="indigo accent-3" 
                                :rules="errors.reason"
                                :error="errors.reason ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="cancel()" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-text="$t('t_cancel_order')"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="3"
                                        :size="10"
                                        color="#6c6c6c"
                                        indeterminate />
                                </template>
                            </v-btn>
                        </v-col>

                    </v-row>
                    
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-row>

            <!-- Sidebar -->
            <customer-layout v-if="!$device.isMobileOrTablet" />

            <v-col :cols="$device.isMobileOrTablet ? 12 : 9">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_orders'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-data-table
                        :headers="headers"
                        :items="orders"
                        item-key="id"
                        :no-data-text="$t('t_table_no_data_available')"
                        hide-default-footer
                        :mobile-breakpoint="0"
                        disable-pagination
                    >

                        <!-- Order number -->
                        <template v-slot:[`item.order_number`]="{ item }">
                            <span class="fs-12 ff-default font-weight-medium" v-text="item.order_number"></span>
                        </template>

                        <!-- Order price -->
                        <template v-slot:[`item.price`]="{ item }">
                            <span class="fs-12 ff-default font-weight-bold" v-text="$formatMoney(item.total_price, item.payment.payment_currency_locale, item.payment.payment_currency)"></span>
                        </template>

                        <!-- Order status -->
                        <template v-slot:[`item.status`]="{ item }">
                    
                            <!-- New order -->
                            <v-chip small label color="#fff7d0" text-color="#a18604" v-if="item.order_status === 'new'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_pending') }}</span>
                            </v-chip>

                            <!-- Order confirmed -->
                            <v-chip small label color="#e9e7ff" text-color="#0f3282" v-if="item.order_status === 'confirmed'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_confirmed') }}</span>
                            </v-chip>

                            <!-- Order shipped -->
                            <v-chip small label color="#e7f6ff" text-color="#2a77e9" v-if="item.order_status === 'shipped'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_shipped') }}</span>
                            </v-chip>

                            <!-- Order delivered -->
                            <v-chip small label color="#dfffef" text-color="#13995b" v-if="item.order_status === 'delivered'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_delivered') }}</span>
                            </v-chip>

                            <!-- Order canceled -->
                            <v-chip small label color="#e9e9e9" text-color="#646464" v-if="item.order_status === 'canceled'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_canceled') }}</span>
                            </v-chip>

                            <!-- Order refunded -->
                            <v-chip small label color="#ffe7e7" text-color="#d54343" v-if="item.order_status === 'refunded'">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_refunded') }}</span>
                            </v-chip>

                        </template>

                        <!-- Placed at -->
                        <template v-slot:[`item.date`]="{ item }">
                            <span class="fs-12 ff-default font-weight-medium" v-text="$ago(item.placed_at)"></span>
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
                                        <v-list-item @click="details(item)">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-shopping</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-t="'t_order_details'"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <!-- Cancel -->
                                        <v-list-item @click="showCancelReason(item)" v-if="item.order_status === 'new'">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-close-network</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-t="'t_cancel_order'"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <!-- Refund -->
                                        <v-list-item nuxt :to="`/refund/request?order=${ item.order_number }`" v-if="item.order_status === 'delivered' && $store.state.settings.refunds.is_enabled">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-arrow-left</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-t="'t_return_order'"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <!-- Delivered -->
                                        <v-list-item @click="delivered(item)" v-if="item.order_status === 'shipped'">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-truck-check</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-t="'t_order_delivered'"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                    </v-list>
                            </v-menu>
                        </template>

                    </v-data-table>

                    <!-- Pagination -->
                    <v-pagination
                        v-if="ordersData.total > ordersData.per_page"
                        v-model="ordersData.current_page"
                        :length="ordersData.last_page"
                        @input="getNextPage"
                        :total-visible="7"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                        color="indigo accent-3"
                        class="pa-4"
                        ></v-pagination>

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import { EventBus } from '~/utils/events'

export default {
    
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    auth: true,

    middleware: 'auth',

    components: {
        'customer-layout'       : () => import('~/pages/main/customer/layout/layout'),
        'customer-order-details': () => import('~/pages/main/customer/orders/options/details'),
    },

    async asyncData({ app, $axios, redirect }) {
        // Get orders
        let response = await $axios.get('customer/orders')
        return {
            ordersData : response.data.meta,
            orders     : response.data.data
        }
    },

    data() {
        return {
            cancelForm: {
                dialog: false,
                order : null,
                reason: null
            },
            errors  : [],
            loading : false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_my_orders')

        }
    },

    computed: {

        headers() {
            return [
                { text: this.$t('t_order_number'), value: 'order_number', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_total_price'), value: 'price', sortable: false, align: 'center'},
                { text: this.$t('t_order_status'), value: 'status', sortable: false, align: 'center'},
                { text: this.$t('t_placed'), value: 'date', sortable: false, align: 'center'},
                { text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'}
            ]
        }

    },

    methods: {
        
        // Get order details
        details(order) {
            EventBus.$emit('customer::open::order::details', order)
        },

        // Show canel reason dialog
        showCancelReason(order) {

            this.cancelForm.order  = order
            this.cancelForm.dialog = true

        },

        // Orders canceled
        async cancel() {

            this.$confirm(
                {
                title: this.$t('t_cancel_order'),
                message: this.$t('t_are_you_sure'),
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
                        const url    = '/customer/orders/options/cancel'

                        // Send request
                        await this.$axios.post(url, { id: this.cancelForm.order.uid, reason: this.cancelForm.reason })
                                        .then(response => {

                                            // Update order status to canceled
                                            if (this.orders[this.orders.indexOf(this.cancelForm.order)].order_status === 'new') {

                                                this.orders[this.orders.indexOf(this.cancelForm.order)].order_status = 'canceled'
                                                
                                            }

                                            // Reset cancel form and close dialog
                                            this.cancelForm.dialog = false
                                            this.cancelForm.order  = null
                                            this.cancelForm.reason = null

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

        // Order delivered
        async delivered(order) {

            this.$confirm(
                {
                title: this.$t('t_order_delivered'),
                message: this.$t('t_did_u_receive_your_shipment'),
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
                        const url    = '/customer/orders/options/delivered'

                        // Send request
                        await this.$axios.post(url, { id: order.uid})
                                        .then(response => {

                                            // Update order status to canceled
                                            if (this.orders[this.orders.indexOf(order)].order_status === 'shipped') {

                                                this.orders[this.orders.indexOf(order)].order_status = 'delivered'
                                                
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

    }

}
</script>