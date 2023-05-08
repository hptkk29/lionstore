<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Shipping address -->
        <v-dialog v-model="dialogs.address" persistent :max-width="500" v-if="current.address">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_shipping_address'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.address = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4">
                    
                    <!-- Name -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_name">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_name'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.name"></div>
                    </div>

                    <!-- Phone -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_phone">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_phone'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.phone"></div>
                    </div>

                    <!-- Address -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_address">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_address'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.address"></div>
                    </div>

                    <!-- Country -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.is_global">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_country'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.country.name"></div>
                    </div>

                    <!-- State -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_field">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_state'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.state"></div>
                    </div>

                    <!-- City -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_city">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_city'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.city"></div>
                    </div>

                    <!-- Zip code -->
                    <div class="row spacer no-gutters align-center mb-2" v-if="$store.state.settings.checkout.field_zipcode">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_zipcode'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.address.address.zipcode"></div>
                    </div>
                    
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Customer details -->
        <v-dialog v-model="dialogs.customer" persistent :max-width="500" v-if="current.customer">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_customer_details'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.customer = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4">
                    
                    <!-- Username -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_username'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.customer.customer.username"></div>
                    </div>

                    <!-- E-mail -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_email'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.customer.customer.email"></div>
                    </div>

                    <!-- Registered date -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_registered_date'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="$ago(current.customer.customer.created_at)"></div>
                    </div>

                    <!-- IP address -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_ip_address'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.customer.customer_ip"></div>
                    </div>
                    
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Payment details -->
        <v-dialog v-model="dialogs.payment" persistent :max-width="500" v-if="current.payment">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_payment_details'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.payment = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4">
                    
                    <!-- Transaction id -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_transaction_id'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="current.payment.payment.transaction_id"></div>
                    </div>

                    <!-- Payment date -->
                    <div class="row spacer no-gutters align-center mb-2">
                        <v-col cols="5" class="text-no-wrap">
                            <strong v-t="'t_payment_date'"></strong>
                        </v-col>
                        <div class="grey--text  col" v-text="$ago(current.payment.payment.created_at)"></div>
                    </div>
                    
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Cancel reason -->
        <v-dialog v-model="dialogs.cancel" persistent :max-width="500" v-if="cancelForm.selected">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_cancel_reason'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.cancel = false">
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
                            <v-btn rounded color="indigo accent-3" depressed block @click="canceled()" :loading="loading" :disabled="loading" :dark="!loading">
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

        <!-- Order notes -->
        <v-dialog v-model="dialogs.notes" persistent :max-width="500" v-if="notesForm.selected">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-12 font-weight-bold" v-t="'t_order_notes'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.notes = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Order notes -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="notesForm.notes"
                                :hide-details="!errors.notes"
                                :placeholder="$t('t_enter_order_notes')"
                                append-icon="mdi-format-list-bulleted-square"
                                color="indigo accent-3"
                                :rules="errors.notes"
                                :error="errors.notes ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="notes()" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-text="$t('t_update_notes')"></span>
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

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_orders')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Delete -->
                <v-expand-transition>
                    <v-btn depressed dark small color="red lighten-5" v-if="selected.length" @click="remove(selected)" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                        <span class="font-weight-medium fs-10 red--text text--accent-3" v-t="'t_delete'"></span>
                    </v-btn>
                </v-expand-transition>

                <!-- Confirm -->
                <v-expand-transition>
                    <v-btn depressed dark small color="yellow lighten-5" v-if="selected.length" @click="confirm(selected)" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                        <span class="font-weight-medium fs-10 yellow--text text--darken-4" v-t="'t_confirm'"></span>
                    </v-btn>
                </v-expand-transition>

                <!-- Shipped -->
                <v-expand-transition>
                    <v-btn depressed dark small color="blue lighten-5" v-if="selected.length" @click="shipped(selected)" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                        <span class="font-weight-medium fs-10 blue--text text--darken-4" v-t="'t_shipped'"></span>
                    </v-btn>
                </v-expand-transition>

                <!-- Delivered -->
                <v-expand-transition>
                    <v-btn depressed dark small color="light-green lighten-5" v-if="selected.length" @click="delivered(selected)" :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                        <span class="font-weight-medium fs-10 light-green--text text--darken-4" v-t="'t_delivered'"></span>
                    </v-btn>
                </v-expand-transition>

                <!-- Refunded -->
                <v-expand-transition>
                    <v-btn depressed dark small color="grey lighten-5" v-if="selected.length" @click="refunded(selected)" :class="$vuetify.rtl ? 'ml-0' : 'mr-0'">
                        <span class="font-weight-medium fs-10 grey--text text--darken-4" v-t="'t_refunded'"></span>
                    </v-btn>
                </v-expand-transition>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="orders"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                disable-pagination
                :mobile-breakpoint="0"
                show-select
            >

                <!-- Order number -->
                <template v-slot:[`item.order_number`]="{ item }">

                    <!-- Mobile source -->
                    <v-icon v-if="item.order_source_name === 'mobile'" color="red" :size="16" :class="$vuetify.rtl ? 'pl-1' : 'pr-1'" style="margin-top:-2px">mdi-cellphone</v-icon>

                    <!-- Desktop source -->
                    <v-icon v-if="item.order_source_name === 'desktop'" color="indigo accent-3" :size="16" :class="$vuetify.rtl ? 'pl-1' : 'pr-1'" style="margin-top:-1px">mdi-desktop-mac</v-icon>

                    <span class="fs-12 ff-default font-weight-medium" v-text="item.order_number"></span>

                </template>

                <template v-slot:[`item.payment_method`]="{ item }">

                    <!-- PayPal -->
                    <div v-if="item.payment.payment_method === 'paypal'" class="d-flex justify-center align-center">
                        <span class="fs-12 font-weight-bold" style="color:#0079C1" v-t="'t_paypal'"></span>
                    </div>

                    <!-- Stripe -->
                    <div v-if="item.payment.payment_method === 'stripe'" class="d-flex justify-center align-center">
                        <span class="fs-12 font-weight-bold" style="color:#6358F7" v-t="'t_stripe'"></span>
                    </div>

                    <!-- Cash on delivery -->
                    <div v-if="item.payment.payment_method === 'cod'" class="d-flex justify-center align-center">
                        <span class="fs-12 font-weight-bold" style="color:#f79a58" v-t="'t_cash_on_delivery'"></span>
                    </div>

                    <!-- Offline -->
                    <div v-if="item.payment.payment_method === 'offline'" class="d-flex justify-center align-center">
                        <span class="fs-12 font-weight-bold" style="color:#a8a8a8" v-t="'t_bank_transfer'"></span>
                    </div>

                </template>

                <!-- Total -->
                <template v-slot:[`item.total`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$formatMoney(item.total_price, item.payment.payment_currency_locale, item.payment.payment_currency)"></span>
                </template>

                <!-- Subtotal -->
                <template v-slot:[`item.subtotal`]="{ item }">
                    <span class="fs-12 ff-default font-weight-light" v-text="$formatMoney(item.subtotal_price, item.payment.payment_currency_locale, item.payment.payment_currency)"></span>
                </template>

                <!-- Shipping -->
                <template v-slot:[`item.shipping`]="{ item }">
                    <span class="fs-12 ff-default font-weight-light" v-text="$formatMoney(item.shipping_cost, item.payment.payment_currency_locale, item.payment.payment_currency)" v-if="Number(item.shipping_cost) > 0"></span>
                    <span class="fs-12 ff-default font-weight-light" v-else v-t="'t_free'"></span>
                </template>

                <!-- Tax -->
                <template v-slot:[`item.tax`]="{ item }">
                    <span class="fs-12 ff-default font-weight-light" v-text="$formatMoney(item.taxes_cost, item.payment.payment_currency_locale, item.payment.payment_currency)" v-if="Number(item.taxes_cost) > 0"></span>
                    <span class="fs-12 ff-default font-weight-light" v-else v-text="$formatMoney(0, item.payment.payment_currency_locale, item.payment.payment_currency)"></span>
                </template>

                <!-- Discount -->
                <template v-slot:[`item.discount`]="{ item }">
                    <span class="fs-12 ff-default font-weight-light error--text" v-text="`- ${ $formatMoney(discount(item), item.payment.payment_currency_locale, item.payment.payment_currency) }`" v-if="item.discount_code && item.discount_type && item.discount_value"></span>
                    <span class="fs-12 ff-default font-weight-light error--text" v-else v-text="`- ${ $formatMoney(0, item.payment.payment_currency_locale, item.payment.payment_currency) }`"></span>
                </template>

                <!-- Placed at -->
                <template v-slot:[`item.placed`]="{ item }">
                    <span class="fs-12 ff-default font-weight-medium" v-text="$ago(item.placed_at)"></span>
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
                    <v-menu open-on-hover :close-on-content-click="false" max-width="200px" :nudge-width="200" offset-x v-if="item.order_status === 'canceled'">
                        <template v-slot:activator="{ on, attrs }">
                            <v-chip v-bind="attrs" v-on="on" small label color="#e9e9e9" text-color="#646464">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_canceled') }}</span>
                            </v-chip>
                        </template>

                        <v-card max-width="200px" class="ff-default fs-11 font-weight-medium pa-4" v-if="item.cancel_reason" v-html="item.cancel_reason.replace(/(?:\r\n|\r|\n)/g, '<br>')"></v-card>
                    </v-menu>

                    <!-- Order refunded -->
                    <v-chip small label color="#ffe7e7" text-color="#d54343" v-if="item.order_status === 'refunded'">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_refunded') }}</span>
                    </v-chip>

                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">
                    <v-menu bottom :left="!$vuetify.rtl" :right="$vuetify.rtl" origin="center center" :max-height="500" :min-width="250" content-class="elegant-menu">
                        <template v-slot:activator="{ on }">
                            <v-btn small v-on="on" icon>
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense avatar class="py-0">

                                <!-- Details -->
                                <v-list-item nuxt :to="`/dashboard/orders/details/${item.uid}`">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-clipboard-list</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_order_details')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Address -->
                                <v-list-item @click.prevent="viewAddress(item)">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-map-marker-radius</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_shipping_address'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Payment -->
                                <v-list-item @click.prevent="viewPayment(item)">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-credit-card</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_view_payment'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Customer -->
                                <v-list-item @click.prevent="viewCustomer(item)" v-if="item.customer">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-account</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_customer_details'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Confirmed -->
                                <v-list-item @click.prevent="confirm([item], true)" v-if="item.order_status === 'new'">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-check-underline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_confirm_order'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Order shipped -->
                                <v-list-item @click.prevent="shipped([item], true)" v-if="item.order_status === 'confirmed'">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-truck-fast</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_order_shipped'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Order delivered -->
                                <v-list-item @click.prevent="delivered([item], true)" v-if="item.order_status === 'shipped'">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-home-map-marker</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_order_delivered'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Download invoice -->
                                <v-list-item @click.prevent="invoice(item)">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-receipt</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_generate_invoice'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Order notes -->
                                <v-list-item @click.prevent="showOrderNotes(item)">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-format-list-text</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_order_notes'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Order refunded -->
                                <v-list-item @click.prevent="refunded([item], true)" v-if="item.order_status === 'delivered'">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-cash-refund</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_order_refunded'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Cancel order -->
                                <v-list-item @click.prevent="showCancelReason(item)" v-if="item.order_status !== 'delivered' && item.order_status !== 'refunded' && item.order_status !== 'canceled' && item.order_status !== 'shipped'">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-cancel</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_cancel_order'"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Delete -->
                                <v-list-item @click.prevent="remove([item], true)">
                                    <v-list-item-avatar :size="35">
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-delete</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-t="'t_delete_order'"></v-list-item-title>
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

    </v-container>
</template>

<script>
    import fileDownload from 'js-file-download'

    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get orders
			let response = await $axios.get('dashboard/orders')
			return {
				ordersData : response.data.meta,
				orders     : response.data.data
			}
		},

        data() {
            return {
                dialogs: {
                    address : false,
                    customer: false,
                    payment : false,
                    cancel  : false,
                    notes   : false
                },
                current: {
                    address : null,
                    customer: null,
                    payment : null
                },
                cancelForm: {
                    selected: null,
                    reason  : null
                },
                notesForm : {
                    selected: null,
                    notes   : null
                },
                loading : false,
                selected: [],
                errors  : []
            }
        },

        head() {
			return {
                title: this.$t('t_orders')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_order_number'), value: 'order_number', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_payment_method'), value: 'payment_method', sortable: false, align: 'center'},
		          	{ text: this.$t('t_total'), value: 'total', sortable: false, align: 'center'},
		          	{ text: this.$t('t_subtotal'), value: 'subtotal', sortable: false, align: 'center'},
		          	{ text: this.$t('t_shipping'), value: 'shipping', sortable: false, align: 'center'},
		          	{ text: this.$t('t_tax'), value: 'tax', sortable: false, align: 'center'},
		          	{ text: this.$t('t_discount'), value: 'discount', sortable: false, align: 'center'},
		          	{ text: this.$t('t_placed'), value: 'placed', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get orders next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/orders?page=${page}`)
                            .then(response => {

                                // Set new orders
                                this.ordersData = response.data.meta
                                this.orders     = response.data.data
                                
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
                            const url    = '/dashboard/orders/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.orders.splice(this.orders.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.orders.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.orders.splice(vm.orders.indexOf(item), 1);
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

            // Confirm orders
            async confirm(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_confirm_orders'),
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
                            const url    = '/dashboard/orders/options/confirm'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    // Update order status to confirmed
                                                    if (this.orders[this.orders.indexOf(items[0])].order_status === 'new') {

                                                        this.orders[this.orders.indexOf(items[0])].order_status = 'confirmed'
                                                        
                                                    }

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.orders.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                if (vm.orders[vm.orders.indexOf(item)].order_status === 'new') {

                                                                    vm.orders[vm.orders.indexOf(item)].order_status = 'confirmed'
                                                                    
                                                                }
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

            // Orders shipped
            async shipped(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_orders_shipped'),
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
                            const url    = '/dashboard/orders/options/shipped'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    // Update order status to shipped
                                                    if (this.orders[this.orders.indexOf(items[0])].order_status === 'confirmed') {

                                                        this.orders[this.orders.indexOf(items[0])].order_status = 'shipped'
                                                        
                                                    }

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.orders.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                if (vm.orders[vm.orders.indexOf(item)].order_status === 'confirmed') {

                                                                    vm.orders[vm.orders.indexOf(item)].order_status = 'shipped'
                                                                    
                                                                }
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

            // Orders delivered
            async delivered(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_orders_delivered'),
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
                            const url    = '/dashboard/orders/options/delivered'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    // Update order status to delivered
                                                    if (this.orders[this.orders.indexOf(items[0])].order_status === 'shipped') {

                                                        this.orders[this.orders.indexOf(items[0])].order_status = 'delivered'
                                                        
                                                    }

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.orders.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                if (vm.orders[vm.orders.indexOf(item)].order_status === 'shipped') {

                                                                    vm.orders[vm.orders.indexOf(item)].order_status = 'delivered'
                                                                    
                                                                }
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

            // Orders refunded
            async refunded(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_orders_refunded'),
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
                            const url    = '/dashboard/orders/options/refunded'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Update item in list
                                                if (single) {
                                                    
                                                    // Update order status to refunded
                                                    if (this.orders[this.orders.indexOf(items[0])].order_status === 'delivered') {

                                                        this.orders[this.orders.indexOf(items[0])].order_status = 'refunded'
                                                        
                                                    }

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.orders.forEach(function(v, j) {

                                                            if (item.id === v.id) {

                                                                if (vm.orders[vm.orders.indexOf(item)].order_status === 'delivered') {

                                                                    vm.orders[vm.orders.indexOf(item)].order_status = 'refunded'
                                                                    
                                                                }
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

            // Orders canceled
            async canceled() {

                // Check if cancel reason set
                if (this.cancelForm.reason) {
                    
                    this.$confirm({
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
                                const url    = '/dashboard/orders/options/canceled'

                                // Send request
                                await this.$axios.post(url, { id: this.cancelForm.selected.id, reason: this.cancelForm.reason })
                                                .then(response => {

                                                    // Update order status to canceled
                                                    if (this.orders[this.orders.indexOf(this.cancelForm.selected)].order_status === 'new' || this.orders[this.orders.indexOf(this.cancelForm.selected)].order_status === 'confirmed') {

                                                        this.orders[this.orders.indexOf(this.cancelForm.selected)].order_status = 'canceled'
                                                        
                                                    }

                                                    // Reset cancel form and close dialog
                                                    this.dialogs.cancel      = false
                                                    this.cancelForm.selected = null
                                                    this.cancelForm.reason   = null

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

                }

            },

            // Enter cancel reason
            showCancelReason(order) {

                this.cancelForm.selected = order
                this.dialogs.cancel      = true

            },

            // Show notes form
            showOrderNotes(order) {
                this.notesForm.selected = order
                this.notesForm.notes    = order.order_notes
                this.dialogs.notes      = true
            },

            // Update order notes
            async notes() {

                // Start loading
                this.loading = true

                // Get server url
                const url    = '/dashboard/orders/options/notes'

                // Send request
                await this.$axios.post(url, { id: this.notesForm.selected.id, notes: this.notesForm.notes })
                                .then(response => {

                                    // Update order status to canceled
                                    this.orders[this.orders.indexOf(this.notesForm.selected)].order_notes = this.notesForm.notes

                                    // Reset notes form and close dialog
                                    this.dialogs.notes      = false
                                    this.notesForm.selected = null
                                    this.notesForm.notes    = null

                                    // Success
                                    this.$message(this.$t('t_toast_process_done'))

                                }).catch(error => {

                                    // Error
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                                }).finally(() => {

                                            // Stop loading
                                            this.loading = false

                                        })

            },

            // Get order discount
            discount(order) {

                // Check if order has a coupon code
                if (order.discount_code && order.discount_value && order.discount_type) {
                    
                    // Check type of this promotion code
                    if (order.discount_type === 'money') {
                        
                        // Return how much money will be discount from total
                        return Number(order.discount_value)

                    }

                    // Check if type of promotion is a percentage of total price
                    if (order.discount_type === 'percentage') {
                        
                        // Get total price
                        const total  = Number(order.subtotal_price) + Number(order.shipping_cost) + Number(order.taxes_cost)

                        // Get percentage of total
                        const result = total * Number(order.discount_value) / 100

                        // Now return discount value
                        return Number(result)

                    }

                    // Not a valid promotion code
                    return 0

                } else {

                    // Customer does not have any coupon
                    return 0

                }

            },

            // View order payment details
            viewPayment(order) {
                this.current.payment = order
                this.dialogs.payment = true
            },

            // View order customer details
            viewCustomer(order) {
                this.current.customer = order
                this.dialogs.customer = true
            },

            // View order shipping address details
            viewAddress(order) {
                this.current.address  = order
                this.dialogs.address  = true
            },

            // Download order invoice
            async invoice(order) {

                // Start loading
                this.loading = true

                // Get server url
                const url    = 'dashboard/orders/options/invoice'

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
                await this.$axios.post(url, { id: order.id }, config)
                                .then(response => {

                                    fileDownload(response.data, `${ order.order_number }.pdf`);

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