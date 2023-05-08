<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row>

            <!-- Top countries -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_countries')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 py-1" v-if="top_countries.length > 0">
                        <template v-for="(country, index) in top_countries">
                            <v-row class="py-3 px-4" :key="`top-countries-${ index }`">
                                <v-col cols="7" class="d-flex">
                                    <img :src="`/images/flags/${ country.country_code }.png`" />
                                    <span class="ff-default font-weight-bold fs-12" :class="$vuetify.rtl ? 'pr-4' : 'pl-4'" v-text="country.country"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="country.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-countries-${ index }`" v-if="index !== top_countries.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top states -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_states')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 px-0 py-1" v-if="top_states.length > 0">
                        <template v-for="(region, index) in top_states">
                            <v-row class="py-3 px-4" :key="`top-states-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-bold fs-12" v-text="region.region"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="region.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-states-${ index }`" v-if="index !== top_states.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top cities -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_cities')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 px-0 py-1" v-if="top_cities.length > 0">
                        <template v-for="(city, index) in top_cities">
                            <v-row class="py-3 px-4" :key="`top-cities-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-bold fs-12" v-text="city.city"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="city.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-cities-${ index }`" v-if="index !== top_cities.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top UTM Medium -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_utm_medium')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 px-0 py-1" v-if="top_utm_medium.length > 0">
                        <template v-for="(utm_medium, index) in top_utm_medium">
                            <v-row class="py-3 px-4" :key="`top-cities-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-bold fs-12" v-text="utm_medium.utm_medium"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="utm_medium.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-cities-${ index }`" v-if="index !== top_utm_medium.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top UTM Campaign -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_utm_campaign')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 px-0 py-1" v-if="top_utm_campaign.length > 0">
                        <template v-for="(utm_campaign, index) in top_utm_campaign">
                            <v-row class="py-3 px-4" :key="`top-cities-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-bold fs-12" v-text="utm_campaign.utm_campaign"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="utm_campaign.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-cities-${ index }`" v-if="index !== top_utm_campaign.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top UTM Source -->
            <v-col cols="12" md="4">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-0">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_utm_source')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-0 px-0 py-1" v-if="top_utm_source.length > 0">
                        <template v-for="(utm_source, index) in top_utm_source">
                            <v-row class="py-3 px-4" :key="`top-cities-${ index }`">
                                <v-col cols="7">
                                    <span class="ff-default font-weight-bold fs-12" v-text="utm_source.utm_source"></span>
                                </v-col>
                                <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                                    <strong class="fs-11 ff-default" v-text="utm_source.meta.total"></strong>
                                </v-col>
                            </v-row>
                            <div :key="`top-cities-${ index }`" v-if="index !== top_utm_source.length - 1">
                                <v-divider />
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-text class="text-center px-0 py-4" v-else>
                        <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')"></span>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Browsers -->
            <v-col cols="12" md="6">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_browsers')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6 text-center">
                        <client-only>
                         <v-chart autoresize :option="browsersOptions" class="browsers-chart" v-if="top_browsers.length > 0" />
                            <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')" v-else></span>
                        </client-only>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- OS -->
            <v-col cols="12" md="6">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_os')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6 text-center">
                        <client-only>
                         <v-chart autoresize :option="osOptions" class="os-chart" v-if="top_os.length > 0"/>
                            <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')" v-else></span>
                        </client-only>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top devices -->
            <v-col cols="12">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_devices')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6 text-center">
                        <client-only>
                         <v-chart autoresize :option="devicesOptions" class="devices-chart" v-if="top_devices.length > 0"/>
                            <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')" v-else></span>
                        </client-only>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Top devices names -->
            <v-col cols="12">
                <v-card class="c-card mb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_top_devices_name')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6 text-center">
                        <client-only>
                         <v-chart autoresize :option="devicesNamesOptions" class="devices-chart" v-if="top_devices_names.length > 0"/>
                            <span class="text-uppercase font-weight-bold letter-space-05 ff-default fs-10" v-text="$t('t_no_data_to_show_right_now')" v-else></span>
                        </client-only>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Load more data -->
            <v-col cols="12" class="mt-6">
                <v-btn dark depressed block large color=" indigo accent-3" v-if="!analyticsLoaded" @click="fetchAnalytics()">
                    <span class="ff-default fs-12 font-weight-bold letter-spacing-05" v-text="$t('t_load_more_data')"></span>
                </v-btn>
            </v-col>

            <v-col cols="12" id="visits-content" v-if="analyticsLoaded">
                <v-card class="c-card">
                    <v-toolbar flat>

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_more_statistics_details')"></v-toolbar-title>

                    </v-toolbar>
                    
                    <v-data-table
                        :headers="headers"
                        :items="visits"
                        item-key="uid"
                        :no-data-text="$t('t_table_no_data_available')"
                        hide-default-footer
                        :mobile-breakpoint="0"
                        disable-pagination
                    >

                        <!-- Geolocation -->
                        <template v-slot:[`item.geolocation`]="{ item }">
                            <div class="d-flex py-4">
                                <img v-if="item.country_code" :src="`/images/flags/${item.country_code}.png`" />
                                <img v-else :src="`/images/flags/unknown.png`" />
                                <span class="ff-default font-weight-bold fs-11" :class="$vuetify.rtl ? 'pr-3' : 'pl-3'" style="margin-top: 5px" v-if="item.country || item.region || item.city">
                                    {{ item.country ? item.country : '' }}
                                    {{ item.country && item.region ? '—' : '' }}
                                    {{ item.region ? item.region : '' }}
                                    {{ item.region && item.city ? '—' : '' }}
                                    {{ item.city ? item.city : '' }}
                                </span>
                                <span class="ff-default font-weight-bold fs-11" :class="$vuetify.rtl ? 'pr-3' : 'pl-3'" style="margin-top: 5px" v-else v-t="'t_unknown'"></span>
                            </div>
                        </template>

                        <!-- Google maps -->
                        <template v-slot:[`item.map`]="{ item }">
                            <v-btn icon text color="indigo accent-3" v-if="item.latitude && item.longitude && item.latitude !== '0' && item.longitude !== '0'" :href="`https://maps.google.com/?q=${item.latitude},${item.longitude}`" target="_blank">
                                <v-icon>mdi-map-marker-radius</v-icon>
                            </v-btn>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Browser -->
                        <template v-slot:[`item.browser`]="{ item }">

                            <v-tooltip top v-if="item.browser_name">
                                <template v-slot:activator="{ on }">
                                    <span class="ff-default fs-11 font-weight-bold" v-on="on">{{ item.browser_name }}</span>
                                </template>
                                <span>{{ item.browser_name }} {{ item.browser_version }}</span>
                                </v-tooltip>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Browser language -->
                        <template v-slot:[`item.browser_language`]="{ item }">
                            <v-menu
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-y
                                v-if="item.browser_language"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="indigo accent-3"
                                        dark
                                        depressed
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        >
                                        <v-icon>mdi-web</v-icon>
                                    </v-btn>
                                </template>
                                <v-card class="m-card">
                                    <v-list dense>
                                        <template v-for="(lang, index) in getBrowserLanguage(item.browser_language)">
                                            <v-list-item :key="index">
                                                <v-list-item-content>
                                                    <v-list-item-title class="ff-default fs-11 font-weight-black grey--text">{{ lang.language }}</v-list-item-title>
                                                </v-list-item-content>
                                                <v-list-item-action>
                                                    <span class="ff-default ff-11">{{ lang.percentage }}%</span>
                                                </v-list-item-action>
                                            </v-list-item>
                                        </template>
                                    </v-list>
                                </v-card>
                            </v-menu>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Operating system -->
                        <template v-slot:[`item.os`]="{ item }">

                            <v-tooltip top v-if="item.os_name">
                                <template v-slot:activator="{ on }">
                                    <span class="ff-default font-weight-bold fs-11" v-on="on">{{ item.os_name }}</span>
                                </template>
                                <span>{{ item.os_name }} {{ item.os_version }}</span>
                                </v-tooltip>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Device -->
                        <template v-slot:[`item.device_type`]="{ item }">
                            <v-btn icon text color="indigo accent-3" v-if="item.device_type">
                                
                                <!-- Desktop device -->
                                <v-tooltip top v-if="item.device_type === 'desktop'">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" :size="20">mdi-laptop-windows</v-icon>
                                    </template>
                                    <span v-text="$t('t_desktop')"></span>
                                </v-tooltip>

                                <!-- Cellphone device -->
                                <v-tooltip top v-else-if="item.device_type === 'phone'">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" :size="20">mdi-cellphone</v-icon>
                                    </template>
                                    <span v-text="$t('t_mobile')"></span>
                                </v-tooltip>

                                <!-- Tablet device -->
                                <v-tooltip top v-else-if="item.device_type === 'tablet'">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" :size="20">mdi-tablet</v-icon>
                                    </template>
                                    <span v-text="$t('t_tablet')"></span>
                                </v-tooltip>

                                <!-- Robot device -->
                                <v-tooltip top v-else-if="item.device_type === 'bot'">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-bind="attrs" v-on="on" :size="20">mdi-robot</v-icon>
                                    </template>
                                    <span v-text="$t('t_bot')"></span>
                                </v-tooltip>
                                
                            </v-btn>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Device name -->
                        <template v-slot:[`item.device_name`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.device_name">{{ item.device_name }} {{ item.device_model ? '-' : '' }} {{ item.device_model }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- UTM medium -->
                        <template v-slot:[`item.utm_medium`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.utm_medium">{{ item.utm_medium }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- UTM campaign -->
                        <template v-slot:[`item.utm_campaign`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.utm_campaign">{{ item.utm_campaign }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- UTM source -->
                        <template v-slot:[`item.utm_source`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.utm_source">{{ item.utm_source }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- URL queries -->
                        <template v-slot:[`item.url_queries`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.url_queries">{{ item.url_queries }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Visit from -->
                        <template v-slot:[`item.visit_from`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.visit_from">{{ item.visit_from }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- Referrer -->
                        <template v-slot:[`item.referrer`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold" v-if="item.referrer">{{ item.referrer }}</span>
                            <span class="ff-default fs-11 font-weight-bold error--text" v-else>{{ $t('t_n_a') }}</span>
                        </template>

                        <!-- First visit -->
                        <template v-slot:[`item.first_visit`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold">{{ $ago(item.first_visit) }}</span>
                        </template>

                        <!-- Last visit -->
                        <template v-slot:[`item.last_visit`]="{ item }">
                            <span class="ff-default fs-11 font-weight-bold">{{ $ago(item.last_visit) }}</span>
                        </template>

                    </v-data-table>

                    <!-- Pagination -->
                    <v-pagination
                        v-if="visitsData.total > visitsData.per_page"
                        v-model="visitsData.current_page"
                        :length="visitsData.last_page"
                        @input="fetchAnalytics"
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
import VChart from 'vue-echarts'
const parser  = require('accept-language-parser');
import ISO6391 from 'iso-639-1'

export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

    middleware: 'admin',

    async asyncData({ app, $axios, params }) {
        // Send request to server
        let response = await $axios.post('dashboard/products/options/analytics', { id: params.id })

        return {
            product          : response.data.product,
            top_countries    : response.data.top_countries,
            top_states       : response.data.top_states,
            top_cities       : response.data.top_cities,
            top_utm_medium   : response.data.top_utm_medium,
            top_utm_campaign : response.data.top_utm_campaign,
            top_utm_source   : response.data.top_utm_source,
            top_browsers     : response.data.top_browsers,
            top_os           : response.data.top_os,
            top_devices      : response.data.top_devices,
            top_devices_names: response.data.top_devices_names,
        }
    },

    data() {
        return {
            loading        : false,
            analyticsLoaded: false,
            visitsData     : {},
            visits         : []
        }
    },

    components: {
        'v-chart': VChart
    },

    head() {
        return {
            title: this.$t('t_product_analytics')
        }
    },

    computed: {

        headers() {
            return [
                { text: this.$t('t_geolocation'), value: 'geolocation', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_google_maps'), value: 'map', sortable: false, align: 'center'},
                { text: this.$t('t_browser'), value: 'browser', sortable: false, align: 'center'},
                { text: this.$t('t_browser_language'), value: 'browser_language', sortable: false, align: 'center'},
                { text: this.$t('t_os'), value: 'os', sortable: false, align: 'center'},
                { text: this.$t('t_device_type'), value: 'device_type', sortable: false, align: 'center'},
                { text: this.$t('t_device_name'), value: 'device_name', sortable: false, align: 'center'},
                { text: this.$t('t_utm_medium'), value: 'utm_medium', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_utm_campaign'), value: 'utm_campaign', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_utm_source'), value: 'utm_source', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_url_queries'), value: 'url_queries', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_visit_from'), value: 'visit_from', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_referrer'), value: 'referrer', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_first_visit'), value: 'first_visit', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_last_visit'), value: 'last_visit', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
            ]
        },

        // Browsers Chart Options
        browsersOptions() {

            // Set empty data variable
            var data = []

            // Loop through top browsers
            for (let index = 0; index < this.top_browsers.length; index++) {

                const item = this.top_browsers[index];

                // Add browser to list
                data.push({
                    value: item.meta.total,
                    name : item.browser_name
                })
                
            }

            return {
                backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                textStyle : {
                    fontFamily: ['Droid Arabic Kufi', 'Roboto']
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: this.$t('t_total_visits'),
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },

        // OS Chart Options
        osOptions() {

            // Set empty data variable
            var data = []

            // Loop through top OS
            for (let index = 0; index < this.top_os.length; index++) {

                const item = this.top_os[index];

                // Add OS to list
                data.push({
                    value: item.meta.total,
                    name : item.os_name
                })
                
            }

            return {
                backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                textStyle : {
                    fontFamily: ['Droid Arabic Kufi', 'Roboto']
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: this.$t('t_total_visits'),
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },

        // Devices Chart Options
        devicesOptions() {

            // Count visits from desktop
            const desktop = this.top_devices.find(item => {
                return item.device_type === 'desktop'
            })

            // Count visits from mobile
            const mobile = this.top_devices.find(item => {
                return item.device_type === 'phone'
            })

            // Count visits from tablet
            const tablet = this.top_devices.find(item => {
                return item.device_type === 'tablet'
            })

            // Count visits from bots
            const bot   = this.top_devices.find(item => {
                return item.device_type === 'bot'
            })
            
            return {
                backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                textStyle : {
                    fontFamily: ['Droid Arabic Kufi', 'Roboto']
                },
                xAxis: {
                    type: 'category',
                    data: [this.$t('t_desktop'), this.$t('t_mobile'), this.$t('t_tablet'), this.$t('t_bot')]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [desktop ? desktop.meta.total : 0, mobile ? mobile.meta.total : 0, tablet ? tablet.meta.total : 0, bot ? bot.meta.total : 0],
                    type: 'bar'
                }]
            }
        },

        // Devices Names Chart Options
        devicesNamesOptions() {

            // Set empty data variable
            var data = []

            // Loop through top Devices names
            for (let index = 0; index < this.top_devices_names.length; index++) {

                const item = this.top_devices_names[index];

                // Add Device name to list
                data.push({
                    value: item.meta.total,
                    name : item.device_name
                })
                
            }

            return {
                backgroundColor: this.$vuetify.theme.dark ? '#2A2A2A': '',
                textStyle : {
                    fontFamily: ['Droid Arabic Kufi', 'Roboto']
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: this.$t('t_total_visits'),
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }

    },

    methods: {

        // Fetch more data
        async fetchAnalytics(page = 1) {

            // Enable loader
            this.loading = true

            // Send request
            await this.$axios
                        .get(`dashboard/products/options/analytics?page=${ page }&id=${ this.product.uid }`)
                        .then(response => {

                            // Set new reviews
                            this.visitsData      = response.data.meta,
                            this.visits          = response.data.data

                            // Data loading
                            this.analyticsLoaded = true
                            
                            // Scroll to top
                            this.$scrollTo('#visits-content', 300, {})

                        })
                        .catch(error => {

                            // Error
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                        }).finally(() => {

                            // Stop loader
                            this.loading = false

                        })

        },

        // Get browser default language
        getBrowserLanguage(acceptLang) {
            var languages = parser.parse(acceptLang);
            var detected  = []

            for (let index = 0; index < languages.length; index++) {
                const element = languages[index];
                detected.push({
                    language  : ISO6391.getNativeName(element.code),
                    percentage: element.quality * 100
                })
            }

            // Delete duplicated langs
            return [...new Map(detected.map(item => [item['language'], item])).values()]
        }

    }

}
</script>

<style>
    .browsers-chart, .os-chart, .devices-chart {
        width: 100%;
        height: 450px;
    }
</style>