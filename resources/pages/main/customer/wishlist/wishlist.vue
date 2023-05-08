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
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_my_wishlist'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-data-table
                        :headers="headers"
                        :items="wishlist"
                        item-key="id"
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
                                        <v-list-item-title class="fs-10 font-weight-regular grey--text pt-2" v-text="$t('t_items_in_stock', { stock: item.product.stock })"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </template>

                        <!-- Created -->
                        <template v-slot:[`item.created`]="{ item }">
                            <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
                        </template>

                        <!-- Options -->
                        <template v-slot:[`item.options`]="{ item }">
                            <v-btn icon @click="remove(item)">
                                <v-icon :size="24" color="grey darken-1">mdi-delete</v-icon>
                            </v-btn>
                        </template>

                    </v-data-table>

                    <!-- Pagination -->
                    <v-pagination
                        v-if="wishlistData.total > wishlistData.per_page"
                        v-model="wishlistData.current_page"
                        :length="wishlistData.last_page"
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
        // Get wishlist
        let response = await $axios.get('customer/favorites')
        return {
            wishlistData: response.data.meta,
            wishlist    : response.data.data
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
            title: this.$t('t_wishlist')

        }
    },

    computed: {
        headers() {
            return [
                { text: this.$t('t_product'), value: 'product', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_added'), value: 'created', sortable: false, align: 'center'},
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
                        .get(`customer/wishlist?page=${page}`)
                        .then(response => {

                            // Set new wishlist
                            this.wishlistData = response.data.meta
                            this.wishlist     = response.data.data
                            
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
                title: this.$t('t_remove'),
                message: this.$t('t_remove_from_wishlist_confirm'),
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
                        const url    = 'customer/favorites/options/delete'

                        // Send request
                        await this.$axios.post(url, { id : item.product.id })
                                        .then(response => {

                                            this.wishlist.splice(this.wishlist.indexOf(item), 1);

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