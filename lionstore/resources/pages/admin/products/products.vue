<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Flash deal -->
        <v-dialog v-model="flash.dialog" persistent :max-width="500" v-if="flash.product">
            <v-card class="c-card date-picker">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_set_flash_deal'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="flash.dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Expiry date -->
                        <v-col cols="12">
                            <v-datetime-picker :date-picker-props="{ headerColor: 'indigo accent-3', class: 'date-picker' }" :text-field-props="{ dense: true, outlined: true, hideDetails: true, appendIcon:  'mdi-calendar-clock', color: 'indigo accent-3', placeholder: $t('t_select_expiry_date') }" v-model="flash.expiry">

                                <template slot="dateIcon">
                                    <v-icon>mdi-calendar-month-outline</v-icon>
                                </template>
                                <template slot="timeIcon">
                                    <v-icon>mdi-clock</v-icon>
                                </template>

                                <template slot="actions" slot-scope="{ parent }">
                                    <div class="fill-width pt-8 pb-4 text-right">
                                        <v-btn text color="indigo accent-3" @click.native="parent.clearHandler" class="fs-10 font-weight-medium px-4" v-t="'t_cancel'"></v-btn>
                                        <v-btn depressed dark color="indigo accent-3" @click="parent.okHandler" class="fs-10 font-weight-medium px-12" v-t="'t_done'"></v-btn>
                                    </div>
                                </template>
                                
                            </v-datetime-picker>
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="setFlashDeal()" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-text="$t('t_set')"></span>
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

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_products')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Create -->
                <v-btn icon link href="/dashboard/products/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                :headers="headers"
                :items="products"
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
                                <v-img :alt="title(item)" :src="thumb(item)"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="fs-11 font-weight-medium" v-text="title(item)"></v-list-item-title>
                                <v-list-item-title class="fs-10 font-weight-regular grey--text pt-2" v-text="item.pid"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>

                <!-- Price -->
                <template v-slot:[`item.price`]="{ item }">

                    <!-- Product with purchase unit -->
                    <div v-if="item.purchase_unit">
                        <div v-if="item.discount_value">
                            <span class="ff-default fs-13 font-weight-bold d-block pb-1" v-html="`${priceAfterDiscount(item)} ${ item.purchase_unit ? ` <span class='fs-10 grey--text font-weight-regular'>/ ${item.purchase_unit}</span>` : '' }`"></span>
                            <del class="ff-default fs-10 font-weight-bold d-block" v-html="`${$formatMoney(item.price)} ${ item.purchase_unit ? ` <span class='fs-10 grey--text font-weight-regular'>/ ${item.purchase_unit}</span>` : '' }`"></del>
                        </div>
                        <div v-else>
                            <span class="ff-default fs-13 font-weight-bold" v-html="`${$formatMoney(item.price)} ${ item.purchase_unit ? ` <span class='fs-10 grey--text font-weight-regular'>/ ${item.purchase_unit}</span>` : '' }`"></span>
                        </div>
                    </div>

                    <!-- Product without purchase unit -->
                    <div v-else>
                        <div v-if="item.discount_value">
                            <span class="ff-default fs-13 font-weight-bold d-block pb-1" v-text="priceAfterDiscount(item)"></span>
                            <del class="ff-default fs-10 font-weight-bold d-block" v-text="`${$formatMoney(item.price, $store.state.settings.currency.locale, $store.state.settings.currency.code)}`"></del>
                        </div>
                        <div v-else>
                            <span class="ff-default fs-13 font-weight-bold" v-text="`${$formatMoney(item.price, $store.state.settings.currency.locale, $store.state.settings.currency.code)}`"></span>
                        </div>
                    </div>

                </template>

                <!-- Sales -->
                <template v-slot:[`item.sales`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.sales"></span>
                </template>

                <!-- Visits -->
                <template v-slot:[`item.visits`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.visits"></span>
                </template>

                <!-- Rating -->
                <template v-slot:[`item.rating`]="{ item }">
                    <v-rating dense x-small readonly empty-icon="mdi-star" color="amber" background-color="grey" :value="item.rating"></v-rating>
                </template>

                <!-- Shipping -->
                <template v-slot:[`item.shipping`]="{ item }">
                    <!-- Free Shipping -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="amber lighten-5" text-color="#a06a41" v-if="item.shipping_type === 'free'">{{ $t('t_free_shipping') }}</v-chip>
                    <!-- Flat shipping -->
                    <span class="ff-default font-weight-bold fs-11" v-else>{{ $formatMoney(item.shipping_cost, $store.state.settings.currency.locale, $store.state.settings.currency.code) }}</span>
                </template>

                <!-- Status -->
                <template v-slot:[`item.status`]="{ item }">
                    <!-- Active -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="light-green lighten-5" text-color="light-green darken-2" v-if="item.is_active && !item.flashDeal">{{ $t('t_active') }}</v-chip>
                    <!-- Inactive -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="red lighten-4" text-color="red darken-2" v-if="!item.is_active && !item.flashDeal">{{ $t('t_inactive') }}</v-chip>
                    <!-- Flash deal -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="amber lighten-4" text-color="amber darken-3" v-if="item.flashDeal">{{ $t('t_flash_deal') }}</v-chip>
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

                                <!-- Preview -->
                                <v-list-item link target="_blank" :href="`/product/${item.handler}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-open-in-new</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_preview_product')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Edit -->
                                <v-list-item link :href="`/dashboard/products/edit/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_product')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Flash deal -->
                                <v-list-item @click="showFlashDeal(item)" v-if="!item.flashDeal">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="23">mdi-fire</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_flash_deal')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Analytics -->
                                <v-list-item nuxt :to="`/dashboard/products/analytics/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-chart-areaspline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_product_analytics')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_product')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="productsData.total > productsData.per_page"
                v-model="productsData.current_page"
                :length="productsData.last_page"
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
    import moment from 'moment'

    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get products
			let response = await $axios.get('dashboard/products')
			return {
				productsData : response.data.meta,
				products     : response.data.data
			}
		},

        data() {
            return {
                loading: false,
                flash: {
                    dialog : false,
                    product: null,
                    expiry : null,
                    menu   : false
                }
            }
        },

        head() {
			return {
                title: this.$t('t_products')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_product'), value: 'product', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_price'), value: 'price', sortable: false, align: 'center'},
		          	{ text: this.$t('t_sales'), value: 'sales', sortable: false, align: 'center'},
		          	{ text: this.$t('t_visits'), value: 'visits', sortable: false, align: 'center'},
		          	{ text: this.$t('t_rating'), value: 'rating', sortable: false, align: 'center'},
		          	{ text: this.$t('t_shipping'), value: 'shipping', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_created'), value: 'created', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get products next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/products?page=${page}`)
                            .then(response => {

                                // Set new products
                                this.productsData = response.data.meta
                                this.products     = response.data.data
                                
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
            async remove(product) {

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
                            const url    = '/dashboard/products/options/delete'

                            // Send request
                            await this.$axios.post(url, { id: product.id })
                                            .then(response => {

                                                this.products.splice(this.products.indexOf(product), 1);

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

            // Brand title
            brandTitle(brand) {

                // Get current locale
                const locale = this.$i18n.locale

                // Decode brand title
                const title  = JSON.parse(brand.translation.name)

                // Return title
                return title[locale]

            },

            // Category title
            categoryTitle(category) {

                // Get current locale
                const locale = this.$i18n.locale

                // Decode category title
                const title  = JSON.parse(category.translation.title)

                // Return title
                return title[locale]

            },

            // Subcategory title
            subcategoryTitle(subcategory) {

                // Get current locale
                const locale = this.$i18n.locale

                // Decode subcategory title
                const title  = JSON.parse(subcategory.translation.title)

                // Return title
                return title[locale]

            },

            // Childcategory title
            childcategoryTitle(childcategory) {

                // Get current locale
                const locale = this.$i18n.locale

                // Decode childcategory title
                const title  = JSON.parse(childcategory.translation.title)

                // Return title
                return title[locale]

            },

            // product thumbnail
            thumb(product) {

                // Check if product has thumbnail
                if (product.thumbnail) {
                    
                    return this.$clientIndex(`/uploads/${ product.thumbnail.file_folder }/${ product.thumbnail.uid }.webp`)

                } else {

                    // Return default thumbnail
                    return this.$clientIndex('/images/default/icon.svg')

                }

            },

            // Get price after discount
            priceAfterDiscount(product) {

                // Check if discount percentage
                if (product.discount_type === 'percentage') {
                    
                    const price = product.discount_value * product.price / 100

                    return this.$formatMoney(product.price - price)

                } else {

                    const price = product.price - product.discount_value

                    return this.$formatMoney(price)

                }

            },

            // Show flash deal dialog
            showFlashDeal(product) {

                // Set product
                this.flash.product = product
                this.flash.dialog  = true

            },

            // Set a flash deal
            async setFlashDeal() {

                // Check if set expiry date
                if (this.flash.expiry) {
                    
                    // Get today date
                    const today  = moment().format('YYYY-MM-DD HH:mm')

                    // Get expiry date
                    const expiry = moment(this.flash.expiry)

                    // Validate time
                    if (expiry.isAfter(today)) {
                        
                        // Slart loading
                        this.loading = true

                        // Send request to server
                        await this.$axios.post('dashboard/products/options/flash', { id: this.flash.product.id, expiry: this.flash.expiry })
                                     .then(response => {

                                        // Change message status
                                        this.products[this.products.indexOf(this.flash.product)].flashDeal = true

                                        // Close dialog
                                        this.flash.dialog = false

                                        // Reset expiry date
                                        this.flash.expiry = null

                                        // Reset selected product
                                        this.flash.product = null

                                     })
                                     .catch(error => {
                                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                     })
                                     .finally(async () => {
                                        // Stop loading
                                        this.loading = false
                                     })

                    } else {

                        // Please select a valid date in future
                        this.$message(this.$t('t_please_select_future_date'), 'clock', 'error')
                        return

                    }


                }

            }

        }
        
    }
</script>