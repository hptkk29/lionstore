<template>
    <v-container grid-list-xl>

        <!-- Welcome -->
        <v-row align-center class="mx-0 mb-6">
            <v-flex xs6>
                <div class="mr-5">
                    <h2 :class="$vuetify.rtl ? 'fs-24 font-weight-medium' : 'fs-32 font-weight-black'" class="ff-default" v-t="'t_welcome_back'"></h2>
                    <p class="mb-0 fs-12 font-weight-regular grey--text ff-default" v-t="'t_your_dashboard_analytics'"></p>
                </div>
            </v-flex>
            <v-flex xs6 :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                <v-btn  depressed dark color="indigo accent-3" class="mt-3" :href="$clientIndex(`dashboard/products/create`)">
                    <span class="font-weight-medium fs-11" v-t="'t_create_product'"></span>
                </v-btn>
            </v-flex>
        </v-row>

        <!-- Quick Stats -->
        <v-row>

            <!-- Total orders -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_orders'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatNumber(total_orders[0] ? total_orders[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_orders'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path d="M18.1446364,11.84388 L17.4471627,16.0287218 C17.4463569,16.0335568 17.4455155,16.0383857 17.4446387,16.0432083 C17.345843,16.5865846 16.8252597,16.9469884 16.2818833,16.8481927 L4.91303792,14.7811299 C4.53842737,14.7130189 4.23500006,14.4380834 4.13039941,14.0719812 L2.30560137,7.68518803 C2.28007524,7.59584656 2.26712532,7.50338343 2.26712532,7.4104669 C2.26712532,6.85818215 2.71484057,6.4104669 3.26712532,6.4104669 L16.9929851,6.4104669 L17.606173,3.78251876 C17.7307772,3.24850086 18.2068633,2.87071314 18.7552257,2.87071314 L20.8200821,2.87071314 C21.4717328,2.87071314 22,3.39898039 22,4.05063106 C22,4.70228173 21.4717328,5.23054898 20.8200821,5.23054898 L19.6915238,5.23054898 L18.1446364,11.84388 Z" fill="#000000" opacity="0.3"/>
                                            <path d="M6.5,21 C5.67157288,21 5,20.3284271 5,19.5 C5,18.6715729 5.67157288,18 6.5,18 C7.32842712,18 8,18.6715729 8,19.5 C8,20.3284271 7.32842712,21 6.5,21 Z M15.5,21 C14.6715729,21 14,20.3284271 14,19.5 C14,18.6715729 14.6715729,18 15.5,18 C16.3284271,18 17,18.6715729 17,19.5 C17,20.3284271 16.3284271,21 15.5,21 Z" fill="#000000"/>
                                        </g>
                                    </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Total products -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_products'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatNumber(total_products[0] ? total_products[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_products'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M14,9 L14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 L10,9 L8,9 L8,8 C8,5.790861 9.790861,4 12,4 C14.209139,4 16,5.790861 16,8 L16,9 L14,9 Z M14,9 L14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 L10,9 L8,9 L8,8 C8,5.790861 9.790861,4 12,4 C14.209139,4 16,5.790861 16,8 L16,9 L14,9 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> <path d="M6.84712709,9 L17.1528729,9 C17.6417121,9 18.0589022,9.35341304 18.1392668,9.83560101 L19.611867,18.671202 C19.7934571,19.7607427 19.0574178,20.7911977 17.9678771,20.9727878 C17.8592143,20.9908983 17.7492409,21 17.6390792,21 L6.36092084,21 C5.25635134,21 4.36092084,20.1045695 4.36092084,19 C4.36092084,18.8898383 4.37002252,18.7798649 4.388133,18.671202 L5.86073316,9.83560101 C5.94109783,9.35341304 6.35828794,9 6.84712709,9 Z" fill="#000000"/> </g> </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Total customers -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_customers'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatNumber(total_customers[0] ? total_customers[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_customers'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon points="0 0 24 0 24 24 0 24"/> <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/> </g> </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Total profit -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_profit'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatMoney(total_profit[0] ? total_profit[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_profit_delivered'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <circle fill="#000000" opacity="0.3" cx="20.5" cy="12.5" r="1.5"/> <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 6.500000) rotate(-15.000000) translate(-12.000000, -6.500000) " x="3" y="3" width="18" height="7" rx="1"/> <path d="M22,9.33681558 C21.5453723,9.12084552 21.0367986,9 20.5,9 C18.5670034,9 17,10.5670034 17,12.5 C17,14.4329966 18.5670034,16 20.5,16 C21.0367986,16 21.5453723,15.8791545 22,15.6631844 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,9.33681558 Z" fill="#000000"/> </g> </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Total stock -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_stock'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatNumber(total_stock[0] ? total_stock[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_stock'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M20.4061385,6.73606154 C20.7672665,6.89656288 21,7.25468437 21,7.64987309 L21,16.4115967 C21,16.7747638 20.8031081,17.1093844 20.4856429,17.2857539 L12.4856429,21.7301984 C12.1836204,21.8979887 11.8163796,21.8979887 11.5143571,21.7301984 L3.51435707,17.2857539 C3.19689188,17.1093844 3,16.7747638 3,16.4115967 L3,7.64987309 C3,7.25468437 3.23273352,6.89656288 3.59386153,6.73606154 L11.5938615,3.18050598 C11.8524269,3.06558805 12.1475731,3.06558805 12.4061385,3.18050598 L20.4061385,6.73606154 Z" fill="#000000" opacity="0.3"/> <polygon fill="#000000" points="14.9671522 4.22441676 7.5999999 8.31727912 7.5999999 12.9056825 9.5999999 13.9056825 9.5999999 9.49408582 17.25507 5.24126912"/> </g> </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Total messages -->
            <v-col md="4" cols="12">
                <v-card flat class="c-card report-card">
                    <v-card-text>
                        <v-row justify="center" class="d-flex">
                            <v-col class="col">
                                <p class="gery--text mb-0 pb-2 font-weight-medium fs-13 ff-default" v-t="'t_messages'"></p>
                                <h3 class="m-0 fs-20 pb-2 font-weight-black ff-default" :class="$vuetify.theme.dark ? 'white--text' :  'black-text'" v-text="$formatNumber(total_messages[0] ? total_messages[0].meta.total : '')"></h3>
                                <p class="mb-0 ff-default fs-11 text-truncate text-muted" v-t="'t_total_messages'"></p>
                            </v-col>
                            <div class="col-auto align-self-center">
                                <div class="report-main-icon">
                                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L5,18 C3.34314575,18 2,16.6568542 2,15 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z M6.16794971,10.5547002 C7.67758127,12.8191475 9.64566871,14 12,14 C14.3543313,14 16.3224187,12.8191475 17.8320503,10.5547002 C18.1384028,10.0951715 18.0142289,9.47430216 17.5547002,9.16794971 C17.0951715,8.86159725 16.4743022,8.98577112 16.1679497,9.4452998 C15.0109146,11.1808525 13.6456687,12 12,12 C10.3543313,12 8.9890854,11.1808525 7.83205029,9.4452998 C7.52569784,8.98577112 6.90482849,8.86159725 6.4452998,9.16794971 C5.98577112,9.47430216 5.86159725,10.0951715 6.16794971,10.5547002 Z" fill="#000000"/> </g> </svg></span>
                                </div>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>

        <!-- More analytics -->
        <v-row>

            <!-- Order last week -->
            <v-col cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_last_week_orders'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-chart ref="chartOrdersLastWeek" :theme="$vuetify.theme.dark ? 'dark': ''" autoresize :option="chartOrdersLastWeek()" />
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top selling products -->
            <v-col md="6" cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13 px-4" v-t="'t_top_selling_products'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="px-0 px-0 py-1" v-if="top_selling_products.length > 0">
                        <template v-for="(product, index) in top_selling_products">
                            <v-row class="py-3 px-8" :key="`top-products-${ index }`">
                                <v-col cols="7">
                                    <a :href="$clientIndex(`product/${ product.handler }`)" target="_blank" class="ff-default font-weight-regulars fs-12 d-flex text-truncate grey--text" v-text="productTitle(product)" :title="productTitle(product)"></a>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-13 ff-default font-weight-regular" v-text="product.sales"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-products-${ index }`" v-if="index !== top_selling_products.length - 1">
                                <v-divider class="custom-hr" />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Latest customers -->
            <v-col md="6" cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13 px-4" v-t="'t_latest_customers'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="px-0 px-0 py-1" v-if="latest_customers.length > 0">
                        <template v-for="(customer, index) in latest_customers">
                            <v-row class="py-3 px-8" :key="`latest-customers-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-regulars fs-12 d-flex text-truncate grey--text" v-text="customer.email" :title="customer.email"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-13 ff-default font-weight-regular" v-text="$ago(customer.created_at)"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`latest-customers-${ index }`" v-if="index !== latest_customers.length - 1">
                                <v-divider class="custom-hr" />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Orders top sources -->
            <v-col md="5" cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_top_orders_sources'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <client-only>
                            <v-chart ref="chartOrdersSources" :theme="$vuetify.theme.dark ? 'dark': ''" autoresize :option="chartOrdersSources()" />
                        </client-only>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Memory Usage -->
            <v-col md="7" cols="12">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_system_memory_usage'"></v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-chart ref="memoryChart" :theme="$vuetify.theme.dark ? 'dark': ''" autoresize :option="memoryChart()" />
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
    import VChart from 'vue-echarts'
    
    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ $axios }) {
            // Send request to api
            let response = await $axios.post('dashboard/analytics')
            return {
                total_orders        : response.data.total_orders,
                total_products      : response.data.total_products,
                total_customers     : response.data.total_customers,
                total_profit        : response.data.total_profit,
                total_stock         : response.data.total_stock,
                total_messages      : response.data.total_messages,
                top_selling_products: response.data.top_selling_products,
                orders_last_week    : response.data.orders_last_week,
                top_orders_sources  : response.data.top_orders_sources,
                latest_customers    : response.data.latest_customers,
                free_memory         : response.data.free_memory,
                total_memory        : response.data.total_memory
            }

        },

        head() {
			return {
                title: this.$t('t_home'),
			}
		},

        components: {
            'v-chart': VChart
        },

        methods: {

            // Product title
            productTitle(product) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]
            },

            // Set orders last week chart
            chartOrdersLastWeek() {
                try {
                    
                    // Set empty var for dates
                    var dates  = []

                    // Set empty var for chart values
                    var values = []

                    // Loop throug orders last week
                    for (let index = 0; index < this.orders_last_week[0].length; index++) {
                        const element = this.orders_last_week[0][index];
                        dates.push(this.$momentLL(element.time))
                        values.push(element.total)
                    }

                    // Return chart options
                    return {

                        backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                        textStyle : {
                            fontFamily: ['Droid Arabic Kufi', 'Roboto']
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type     : 'category',
                            axisLabel: { interval: 0, rotate: 30 },
                            data     : dates
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data  : values,
                            type  : 'line',
                            smooth: true,
                            itemStyle: {
                                color: '#3d5afe'
                            }
                        }]

                    }

                } catch (error) {
                    return
                }
            },

             // Set orders top sources
            chartOrdersSources() {
                if (process.client) {
                    try {
    
                        // Set empty vars
                        var total_from_desktop = 0
                        var total_from_mobile  = 0
    
                        // Loop throug top sources
                        for (let index = 0; index < this.top_orders_sources.length; index++) {
    
                            const element = this.top_orders_sources[index];
    
                            // Check if desktop source
                            if (element.order_source_name === 'desktop') {
                                total_from_desktop = element.meta.total
                            }
    
                            // Check if mobile source
                            if (element.order_source_name === 'mobile') {
                                total_from_mobile = element.meta.total
                            }
                            
                        }
                        
                        return {
                            backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                            textStyle : {
                                fontFamily: ['Droid Arabic Kufi', 'Roboto']
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                data: [this.$t('t_desktop'), this.$t('t_mobile')]
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [total_from_desktop, total_from_mobile],
                                type: 'bar',
                                itemStyle: {
                                    color: '#3d5afe'
                                }
                            }]
                        }
    
                    } catch (error) {
                        return
                    }
                }
            },

            // System meomory usage
            memoryChart() {
                return {
                    backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                    textStyle : {
                        fontFamily: ['Droid Arabic Kufi', 'Roboto']
                    },
                    series: [{
                        type: 'gauge',
                        axisLine: {
                            lineStyle: {
                                width: 10,
                                color: [
                                    [1, '#3d5afe']
                                ]
                            }
                        },
                        pointer: {
                            itemStyle: {
                                color: 'inherit'
                            }
                        },
                        axisTick: {
                            distance: -30,
                            length: 2,
                            lineStyle: {
                                color: '#fff',
                                width: 2
                            }
                        },
                        splitLine: {
                            distance: -30,
                            length: 30,
                            lineStyle: {
                                color: '#fff',
                                width: 4
                            }
                        },
                        axisLabel: {
                            color: 'inherit',
                            distance: 20,
                            fontSize: 12,
                            formatter: '{value} Gb'
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value} ' + this.$t('t_gb_used'),
                            color: 'inherit',
                            fontSize: 14
                        },
                        data: [{
                            value: Number(this.total_memory) - Number(this.free_memory)
                            
                        }],
                        min: 0,
                        max: Number(this.total_memory),
                        splitNumber: Number(this.total_memory) / 2,
                    }]
                }
            }

        }

    }
</script>

<style>
.echarts {
    width: 100%;
    min-height: 500px;
}
</style>