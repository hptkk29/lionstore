<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_flash_deals')"></v-toolbar-title>

                <v-spacer></v-spacer>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="deals"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
            >

                <!-- Product -->
                <template v-slot:[`item.product`]="{ item }">
                    <v-list class="transparent">
                        <v-list-item color="transparent" class="px-0">
                            <v-list-item-avatar rounded>
                                <v-img :alt="title(item.product)" :src="thumb(item.product)"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="fs-11 font-weight-medium" v-text="title(item.product)"></v-list-item-title>
                                <v-list-item-title class="fs-10 font-weight-regular grey--text pt-2" v-text="item.product.pid"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>

                <!-- Expiry date -->
                <template v-slot:[`item.expiry`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$fulltime(item.ends_at)"></span>
                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">
                    <v-btn icon @click="remove(item)">
                        <v-icon :size="22" color="grey darken-1">mdi-delete</v-icon>
                    </v-btn>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="dealsData.total > dealsData.per_page"
                v-model="dealsData.current_page"
                :length="dealsData.last_page"
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
			// Get deals
			let response = await $axios.get('dashboard/deals')
			return {
				dealsData : response.data.meta,
				deals     : response.data.data
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
                title: this.$t('t_flash_deals')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_product'), value: 'product', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_expiry_date'), value: 'expiry', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
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
                            .get(`dashboard/deals?page=${page}`)
                            .then(response => {

                                // Set new deals
                                this.dealsData = response.data.meta
                                this.deals     = response.data.data
                                
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
            async remove(deal) {

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
                            const url    = '/dashboard/deals/delete'

                            // Send request
                            await this.$axios.post(url, { id: deal.id })
                                            .then(response => {

                                                // Delete deal
                                                this.deals.splice(this.deals.indexOf(deal), 1)

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

            // Product title
            title(product) {
                
                // Get current locale
                const locale = this.$i18n.locale

                // Decode product title
                const title  = JSON.parse(product.translation.title)

                // Return title
                return title[locale]

            },

            // product thumbnail
            thumb(product) {

                // Check if product has a thumbnail
                if (product.thumbnail) {
                    
                    // Return thumbnail
                    return this.$clientIndex(`uploads/${ product.thumbnail.file_folder }/${ product.thumbnail.uid }.webp`)

                } else {

                    // Product has no thumbnail
                    // Return default image
                    if (this.$vuetify.theme.dark) {
                        return this.$clientIndex('images/default/thumbnail-dark.svg')
                    } else {
                        return this.$clientIndex('images/default/thumbnail.svg')
                    }

                }

            }

        }
        
    }
</script>