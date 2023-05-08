<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" max-width="600">
        <v-card>
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_products_pricing_calculator')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="py-8 calculator-page">
                <v-row>

                    <!-- Notification -->
                    <v-col cols="12">
                        <v-alert text color="blue" icon="mdi-information-variant" border="left" class="mb-0" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                            <span class="fs-12 font-weight-medium" v-t="'t_calculator_message'"></span>
                        </v-alert>
                    </v-col>
        
                    <!-- Product price -->
                    <v-col cols="12" md="2">
                        <v-simple-table :style="$vuetify.theme.dark ? 'border: 2px solid #3d3d3d' : 'border: 2px solid #e1e1e1'">
                            <template v-slot:default>
                                <thead :style="$vuetify.theme.dark ? 'background-color: #262626' : 'background-color: #f8f8f8'">
                                    <tr>
                                        <th colspan="2" class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_product_price'"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <!-- Original price -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_original_price'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.original_price"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Packaging -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_packaging'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.packaging"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Advertising -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_advertising'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.advertising"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Commission -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_commission'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.commission"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Bank fees -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_bank_fees'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.bank_fees"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- SMS fees -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_sms_fees'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.sms_fees"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- My profit -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium success--text text-uppercase" v-t="'t_my_profit'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.my_profit"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>
                                        
                                </tbody>
                                <tfoot style="border-top: 1px solid #d7d7d7">
                                    <tr>
                                        
                                        <!-- Total price -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_total'"></span>
                                        </td>
                                        
                                        <td class="text-center font-weight-bold fs-12" v-text="$formatMoney(totalProductPrice())"></td>
                                    </tr>
                                </tfoot>
                            </template>
                        </v-simple-table>
                    </v-col>

                    <!-- Fixed charges -->
                    <v-col cols="12" md="2">
                        <v-simple-table :style="$vuetify.theme.dark ? 'border: 2px solid #3d3d3d' : 'border: 2px solid #e1e1e1'">
                            <template v-slot:default>
                                <thead :style="$vuetify.theme.dark ? 'background-color: #262626' : 'background-color: #f8f8f8'">
                                    <tr>
                                        <th colspan="2" class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_monthly_expenses'"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <!-- Website VPS -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_vps'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.website_vps"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Website domain -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_domain'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.website_domain"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Website SSL -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_ssl_certificate'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.website_ssl"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Transport -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_transport'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.transport"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Internet -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_internet'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.internet"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Telephone -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_phone'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.telephone"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Electric -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_electric'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.electric"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- Papers & printing -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_papers_printing'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.papers_printing"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>

                                    <!-- My salary -->
                                    <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'">

                                        <!-- Name -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium success--text text-uppercase" v-t="'t_my_salary'"></span>
                                        </td>

                                        <!-- Price -->
                                        <td>
                                            <v-text-field outlined dense hide-details
                                                v-model="form.my_salary"
                                                :suffix="$store.state.settings.currency.symbol_native"
                                                color="indigo accent-3"
                                                placeholder="0.00"
                                                class="py-2"
                                            ></v-text-field>
                                        </td>

                                    </tr>
                                        
                                </tbody>
                                <tfoot style="border-top: 1px solid #d7d7d7">
                                    <tr>
                                        
                                        <!-- Total price -->
                                        <td :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d;' : 'border-right: 1px solid #d7d7d7;'" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                            <span class="fs-11 font-weight-medium" v-t="'t_total'"></span>
                                        </td>
                                        
                                        <td class="text-center font-weight-bold fs-12" v-text="$formatMoney(calculateFixedCharges())"></td>
                                    </tr>
                                </tfoot>
                            </template>
                        </v-simple-table>
                    </v-col>

                    <!-- Calculate results -->
                    <v-col cols="12" md="8">
                        <v-simple-table :style="$vuetify.theme.dark ? 'border: 2px solid #3d3d3d' : 'border: 2px solid #e1e1e1'">
                            <template v-slot:default>
                                <thead :style="$vuetify.theme.dark ? 'background-color: #262626' : 'background-color: #f8f8f8'">
                                    <tr>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_daily_sales'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_daily_earning'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_monthly_sales'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_monthly_earning'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_fixed_charges'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_variable_charges'"></th>
                                        <th class="text-center fs-10 font-weight-bold text-uppercase letter-spacing-1px" v-t="'t_monthly_results'"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <template v-for="(item, index) in items">
                                        <tr :style="$vuetify.theme.dark ? 'background-color: #313131' : 'background-color: #fff'" :key="index">

                                            <!-- Daily sales -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="item.daily"></span>
                                            </td>

                                            <!-- Daily profit -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="$formatMoney( Number( totalProductPrice() ) * Number( item.daily ))"></span>
                                            </td>

                                            <!-- Monthly sales -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="item.monthly"></span>
                                            </td>

                                            <!-- Monthly profit -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="$formatMoney( Number( totalProductPrice() ) * Number( item.monthly ))"></span>
                                            </td>

                                            <!-- Fixed charges / Month -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="$formatMoney(Number(calculateFixedCharges()))"></span>
                                            </td>

                                            <!-- Variable charges -->
                                            <td class="text-center" :style="$vuetify.theme.dark ? 'border-right: 1px solid #3d3d3d' : 'border-right: 1px solid #d7d7d7'">
                                                <span class="fs-11 font-weight-medium" v-text="$formatMoney( Number(calculateVariableCharges()) * Number(item.monthly ))"></span>
                                            </td>

                                            <!-- Results / Month -->
                                            <td class="text-center">

                                                <span :class="Math.sign(Number((totalProductPrice() * Number(item.monthly) )) - Number((calculateVariableCharges() * item.monthly) + (calculateFixedCharges()))) === -1 ? 'error--text' : 'success--text'" class="fs-11 font-weight-medium" v-text="$formatMoney( Number((totalProductPrice() * Number(item.monthly) )) - Number((calculateVariableCharges() * item.monthly) + (calculateFixedCharges())) )"></span>
                                            </td>

                                        </tr>
                                    </template>
                                        
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
    
</template>

<script>
    import { EventBus } from '~/utils/events'

    export default {

        name: 'calculator',
        
        data() {
            return {
                form: {
                    // Product
                    original_price: 10,
                    packaging     : 2,
                    advertising   : 2,
                    bank_fees     : 2,
                    commission    : 5,
                    my_profit     : 30,
                    sms_fees      : 2,

                    // Fixed charges
                    website_vps    : 6,
                    website_domain : 3,
                    website_ssl    : 7,
                    transport      : 50,
                    internet       : 30,
                    telephone      : 30,
                    electric       : 30,
                    papers_printing: 40,
                    my_salary      : 300
                },
                items: [
                    { daily: 1, monthly: 20 },
                    { daily: 2, monthly: 40 },
                    { daily: 3, monthly: 60 },
                    { daily: 4, monthly: 80 },
                    { daily: 5, monthly: 100 },
                    { daily: 6, monthly: 120 },
                    { daily: 7, monthly: 140 },
                    { daily: 8, monthly: 160 },
                    { daily: 9, monthly: 180 },
                    { daily: 10, monthly: 200 },
                    { daily: 15, monthly: 300 },
                    { daily: 20, monthly: 400 },
                    { daily: 25, monthly: 500 },
                    { daily: 30, monthly: 600 },
                    { daily: 40, monthly: 800 },
                    { daily: 50, monthly: 1000 },
                    { daily: 60, monthly: 1200 },
                    { daily: 70, monthly: 1400 },
                    { daily: 80, monthly: 1600 },
                    { daily: 90, monthly: 1800 },
                    { daily: 100, monthly: 2000 }
                ],
                dialog: false
            }
        },

        created() {
            EventBus.$on('open::calculator', () => {
                this.dialog = true
            })
        },

        methods: {

            // Calculate total product price
            totalProductPrice() {

                // Set empty price variable
                var price = 0

                // Calculate total price
                price += Number(this.form.original_price)
                price += Number(this.form.packaging)
                price += Number(this.form.advertising)
                price += Number(this.form.commission)
                price += Number(this.form.my_profit)
                price += Number(this.form.bank_fees)
                price += Number(this.form.sms_fees)
                
                // Return price
                return Number(price)

            },

            // Calculated fixed charges
            calculateFixedCharges() {

                // Set empty total variable
                var total = 0

                // Get total charges
                total += Number(this.form.website_vps)
                total += Number(this.form.website_domain)
                total += Number(this.form.website_ssl)
                total += Number(this.form.transport)
                total += Number(this.form.internet)
                total += Number(this.form.telephone)
                total += Number(this.form.electric)
                total += Number(this.form.papers_printing)
                total += Number(this.form.my_salary)

                // Return total
                return Number(total)

            },

            // Calculated variable charges
            calculateVariableCharges() {

                // Set empty total variable
                var total = 0

                // Get total charges
                total += Number(this.form.original_price)
                total += Number(this.form.packaging)
                total += Number(this.form.advertising)
                total += Number(this.form.commission)
                total += Number(this.form.sms_fees)
                total += Number(this.form.bank_fees)

                // Return total
                return Number(total)

            }

        }
    }
</script>