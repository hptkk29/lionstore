<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Read dialog -->
        <v-dialog v-model="selected.dialog" persistent :max-width="500" v-if="selected.review">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_review_comment'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="selected.dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4" v-html="selected.review.review_comment.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
            </v-card>
        </v-dialog>

        <v-row>

            <!-- Sidebar -->
            <customer-layout v-if="!$device.isMobileOrTablet" />

            <v-col :cols="$device.isMobileOrTablet ? 12 : 9">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_reviews'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-data-table
                        :headers="headers"
                        :items="reviews"
                        item-key="id"
                        :no-data-text="$t('t_table_no_data_available')"
                        hide-default-footer
                        :mobile-breakpoint="0"
                        disable-pagination
                    >

                        <!-- Product -->
                        <template v-slot:[`item.product`]="{ item }">
                            <v-list class="transparent">
                                <v-list-item :ripple="false" color="transparent" class="px-0" nuxt :to="`/product/${ item.product.handler }`">
                                    <v-list-item-avatar rounded>
                                        <v-img :alt="title(item.product)" :src="thumbnail(item.product)"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="fs-11 font-weight-medium" v-text="title(item.product)"></v-list-item-title>
                                        <v-list-item-title class="fs-10 font-weight-regular grey--text pt-2" v-text="item.product.pid"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </template>

                        <!-- Rating -->
                        <template v-slot:[`item.rating`]="{ item }">
                            <v-rating dense readonly
                                :value="Number(item.rating_value)"
                                empty-icon="mdi-star"
                                full-icon="mdi-star"
                                half-icon="mdi-star-half-full"
                                class="mx-auto fill-width text-center mt-2 pb-3"
                                background-color="#c2c2c2"
                                color="#ffad18"
                                length="5"
                                size="14"
                                half-increments
                                ></v-rating>
                        </template>

                        <!-- Privacy -->
                        <template v-slot:[`item.privacy`]="{ item }">
                    
                            <!-- Private -->
                            <v-chip small label color="#fadada" text-color="#8f2121" v-if="item.is_private">
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_private') }}</span>
                            </v-chip>

                            <!-- Public -->
                            <v-chip small label color="#d7eedd" text-color="#1c6457" v-else>
                                <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_public') }}</span>
                            </v-chip>

                        </template>

                        <!-- Created -->
                        <template v-slot:[`item.date`]="{ item }">
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

                                <!-- Read -->
                                <v-list-item @click="read(item)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-star-face</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_read_review')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_review')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

                    </v-data-table>

                    <!-- Pagination -->
                    <v-pagination
                        v-if="reviewsData.total > reviewsData.per_page"
                        v-model="reviewsData.current_page"
                        :length="reviewsData.last_page"
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
        // Get reviews
        let response = await $axios.get('customer/reviews')
        return {
            reviewsData : response.data.meta,
            reviews     : response.data.data
        }
    },

    data() {
        return {
            selected: {
                dialog: false,
                review: null
            },
            errors  : [],
            loading : false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_reviews')

        }
    },

    computed: {

        headers() {
            return [
                { text: this.$t('t_product'), value: 'product', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
                { text: this.$t('t_rating'), value: 'rating', sortable: false, align: 'center'},
                { text: this.$t('t_privacy'), value: 'privacy', sortable: false, align: 'center'},
                { text: this.$t('t_date'), value: 'date', sortable: false, align: 'center'},
                { text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'}
            ]
        }

    },

    methods: {

        // Read review
        read(review) {
            this.selected.review = review
            this.selected.dialog = true
        },

        // Product thumbnail
        thumbnail(product) {
            
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

        // Delete review
        async remove(review) {

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
                        const url    = 'customer/reviews/options/delete'

                        // Send request
                        await this.$axios.post(url, { id: review.uid })
                                        .then(response => {

                                            // Remove item from list (Single select)
                                            this.reviews.splice(this.reviews.indexOf(review), 1);

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

    }

}
</script>