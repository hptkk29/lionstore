<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row>

            <!-- Sidebar -->
            <customer-layout v-if="!$device.isMobileOrTablet" />

            <v-col :cols="$device.isMobileOrTablet ? 12 : 9">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_my_addresses'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- Create -->
                        <v-btn icon nuxt to="/customer/addresses/create">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-data-table
                        :headers="headers"
                        :items="addresses"
                        item-key="uid"
                        :no-data-text="$t('t_table_no_data_available')"
                        hide-default-footer
                        :mobile-breakpoint="0"
                        disable-pagination
                    >

                        <!-- Name -->
                        <template v-slot:[`item.name`]="{ item }">
                            <span class="fs-12 ff-default font-weight-bold" v-text="item.name"></span>
                        </template>

                        <!-- Phone -->
                        <template v-slot:[`item.phone`]="{ item }">
                            <span class="fs-12 ff-default font-weight-bold" v-text="item.phone"></span>
                        </template>

                        <!-- Address -->
                        <template v-slot:[`item.address`]="{ item }">
                            <span class="d-block fs-12 ff-default font-weight-bold" v-text="item.address"></span>
                            <span class="d-block fs-10 ff-default font-weight-medium">
                                {{ $store.state.settings.is_global ? item.country ? item.country.name : '' : '' }} 
                                {{ $store.state.settings.is_global ? '⚊' : '' }}
                                {{ item.state ? item.state : '' }} 
                                {{ item.state && item.city ? '⚊' : '' }}
                                {{ item.city }}
                                {{ item.zipcode && item.city ? '⚊' : '' }}
                                {{ item.zipcode }}</span>
                        </template>

                        <!-- Created -->
                        <template v-slot:[`item.created`]="{ item }">
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
                                        <v-list-item nuxt :to="`/customer/addresses/edit/${item.uid}`">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="$t('t_edit_address')"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <!-- Delete -->
                                        <v-list-item @click.prevent="remove(item)">
                                            <v-list-item-avatar>
                                                <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                                    <v-icon :size="20">mdi-delete</v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-text="$t('t_delete_address')"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>

                                    </v-list>
                            </v-menu>
                        </template>

                    </v-data-table>

                    <!-- Pagination -->
                    <v-pagination
                        v-if="addressesData.total > addressesData.per_page"
                        v-model="addressesData.current_page"
                        :length="addressesData.last_page"
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
export default {
    
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    auth: true,

    middleware: 'auth',

    components: {
        'customer-layout': () => import('~/pages/main/customer/layout/layout')
    },

    async asyncData({ app, $axios, redirect }) {
        // Get addresses
        let response = await $axios.get('customer/addresses')
        return {
            addressesData : response.data.meta,
            addresses     : response.data.data
        }
    },

    data() {
        return {
            selected: [],
            loading : false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_my_addresses')

        }
    },

    computed: {
        headers() {
            return [
                { text: this.$t('t_name'), value: 'name', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_phone'), value: 'phone', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_address'), value: 'address', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_created'), value: 'created', sortable: false, align: 'center'},
                { text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
            ]
        }
    },

    methods: {

        // Get pages next page
        async getNextPage(page) {

            // Enable loader
            this.loading = true

            // Send request
            await this.$axios
                        .get(`customer/addresses?page=${page}`)
                        .then(response => {

                            // Set new addresses
                            this.addressesData = response.data.meta
                            this.addresses     = response.data.data
                            
                            // Scroll top
                            this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

                        })
                        .catch(error => {

                            // Error
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                        }).finally(() => {

                            // Stop loader
                            this.loading = false

                        })

        },

        // Delete selected address
        async remove(item) {

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
                        const url    = 'customer/addresses/options/delete'

                        // Send request
                        await this.$axios.post(url, { id : item.uid })
                                        .then(response => {

                                            this.addresses.splice(this.addresses.indexOf(item), 1);

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

    }

}
</script>