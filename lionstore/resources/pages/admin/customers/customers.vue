<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_customers')"></v-toolbar-title>

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

                <!-- Create -->
                <v-btn icon nuxt to="/dashboard/customers/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="customers"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Username -->
                <template v-slot:[`item.username`]="{ item }">
                    <span class="fs-12 ff-default" v-text="item.username"></span>
                </template>

                <!-- Email -->
                <template v-slot:[`item.email`]="{ item }">
                    <span class="fs-12 ff-default" v-text="item.email"></span>
                </template>

                <!-- Signup provider -->
                <template v-slot:[`item.provider`]="{ item }">
                    <!-- Facebook -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#4267B2" text-color="#fff" v-if="item.provider_name === 'facebook'">{{ $t('t_facebook') }}</v-chip>
                    <!-- Google -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#DB4437" text-color="#fff" v-else-if="item.provider_name === 'google'">{{ $t('t_google') }}</v-chip>
                    <!-- Twitter -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#1DA1F2" text-color="#fff" v-else-if="item.provider_name === 'twitter'">{{ $t('t_twitter') }}</v-chip>
                    <!-- E-mail address -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#000" text-color="#fff" v-else>{{ $t('t_email') }}</v-chip>
                </template>

                <!-- Status -->
                <template v-slot:[`item.status`]="{ item }">
                    <!-- Verified -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="light-green lighten-4" text-color="light-green darken-2" v-if="item.is_verified">{{ $t('t_verified') }}</v-chip>
                    <!-- Unverified -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="red lighten-4" text-color="red darken-2" v-else>{{ $t('t_unverified') }}</v-chip>
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
                                <v-list-item nuxt :to="`/dashboard/customers/edit/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_customer')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_customer')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="customersData.total > customersData.per_page"
                v-model="customersData.current_page"
                :length="customersData.last_page"
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
			// Get customers
			let response = await $axios.get('dashboard/customers')
			return {
				customersData : response.data.meta,
				customers     : response.data.data
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
                title: this.$t('t_customers')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_username'), value: 'username', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_email'), value: 'email', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_signup_provider'), value: 'provider', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get customers next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/customers?page=${page}`)
                            .then(response => {

                                // Set new customers
                                this.customersData = response.data.meta
                                this.customers     = response.data.data
                                
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
                            const url    = '/dashboard/customers/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.customers.splice(this.customers.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.customers.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.customers.splice(vm.customers.indexOf(item), 1);
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

            }

        }
        
    }
</script>