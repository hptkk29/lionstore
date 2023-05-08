<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_coupons')"></v-toolbar-title>

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
                <v-btn icon nuxt to="/dashboard/coupons/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="coupons"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Coupon code -->
                <template v-slot:[`item.code`]="{ item }">
                    <span class="fs-11 ff-default font-weight-light letter-space-1 indigo--text text--accent-3" v-text="item.coupon_code"></span>
                </template>

                <!-- Discount -->
                <template v-slot:[`item.discount`]="{ item }">
                    <span class="fs-11 fw-600 error--text" v-if="item.coupon_type === 'percentage'">{{ item.discount_value }} %</span>
                    <span class="fs-11 fw-600 success--text" v-else v-text="$formatMoney(item.discount_value, 'en-US', 'USD')"></span>
                </template>

                <!-- Usage -->
                <template v-slot:[`item.usage`]="{ item }">
                    <span class="fs-12 font-weight-medium" v-if="item.is_unlimited" v-text="`${item.used_times} / ~`"></span>
                    <span class="fs-12 font-weight-medium" v-else v-text="`${item.used_times} / ${item.usage_times}`"></span>
                </template>

                <!-- Date -->
                <template v-slot:[`item.date`]="{ item }">
                    <span class="fs-11 fw-600 letter-spacing-05px" v-text="`${$momentLL(item.start_date)} ⚊ ${$momentLL(item.ends_date)}`"></span>
                </template>

                <!-- Status -->
                <template v-slot:[`item.status`]="{ item }">
                    <!-- Active -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="light-green lighten-4" text-color="light-green darken-2" v-if="item.is_active">{{ $t('t_active') }}</v-chip>
                    <!-- Unverified -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="red lighten-4" text-color="red darken-2" v-else>{{ $t('t_inactive') }}</v-chip>
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
                                <v-list-item nuxt :to="`/dashboard/coupons/edit/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_coupon')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_coupon')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="couponsData.total > couponsData.per_page"
                v-model="couponsData.current_page"
                :length="couponsData.last_page"
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
			// Get coupons
			let response = await $axios.get('dashboard/coupons')
			return {
				couponsData : response.data.meta,
				coupons     : response.data.data
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
                title: this.$t('t_coupons')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_coupon_code'), value: 'code', sortable: false, align: 'center'},
		          	{ text: this.$t('t_coupon_discount'), value: 'discount', sortable: false, align: 'center'},
		          	{ text: this.$t('t_coupon_usage'), value: 'usage', sortable: false, align: 'center'},
		          	{ text: this.$t('t_coupon_date'), value: 'date', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get coupons next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/coupons?page=${page}`)
                            .then(response => {

                                // Set new coupons
                                this.couponsData = response.data.meta
                                this.coupons     = response.data.data
                                
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
                            const url    = '/dashboard/coupons/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.coupons.splice(this.coupons.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.coupons.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.coupons.splice(vm.coupons.indexOf(item), 1);
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