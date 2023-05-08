<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Read dialog -->
        <v-dialog v-model="dialogs.read" persistent :max-width="500" v-if="current">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_review_comment'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.read = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4" v-html="current.review_comment.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
            </v-card>
        </v-dialog>

        <!-- Edit review -->
        <v-dialog v-model="dialogs.edit" persistent :max-width="500" v-if="current">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-t="'t_edit_review'"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.edit = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Rating -->
                        <v-col cols="12">
                            <v-rating hover dense
                                v-model="form.rating"
                                empty-icon="mdi-star"
                                full-icon="mdi-star"
                                half-icon="star-half-full"
                                color="#ffab12"
                                background-color="#d7d7d7"
                                length="5"
                                :size="20"
                                :value="3"></v-rating>
                        </v-col>

                        <!-- Enable Facebook login -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_active"
                                :hide-details="!errors.is_active"
                                :placeholder="$t('t_review_status')"
                                :items="[{ text: $t('t_active'), value: 1 }, { text: $t('t_disabled'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_active"
                                :error="errors.is_active ? true : false" />
                        </v-col>

                        <!-- Review comment -->
                        <v-col cols="12">
                            <v-textarea dense outlined :height="160"
                                v-model="form.comment"
                                :hide-details="!errors.comment"
                                :placeholder="$t('t_enter_review_comment')"
                                append-icon="mdi-star-face"
                                color="indigo accent-3" 
                                :rules="errors.comment"
                                :error="errors.comment ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="update()" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-text="$t('t_update')"></span>
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

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_reviews')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Approve -->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-expand-transition>
                        <v-btn v-if="selected.length" v-on="on" key="delete" icon @click="approve(selected)">
                            <v-icon>mdi-check-underline</v-icon>
                        </v-btn>
                        </v-expand-transition>
                    </template>
                    <span v-text="$t('t_approve')"></span>
                </v-tooltip>

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

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="reviews"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
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

                <!-- Customer -->
                <template v-slot:[`item.customer`]="{ item }">
                    <span class="d-block fs-13 font-weight-medium pb-1" v-text="item.customer.username"></span>
                    <span class="d-block fs-11 font-weight-regular grey--text" v-text="item.customer.email"></span>
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

                <!-- Status -->
                <template v-slot:[`item.status`]="{ item }">
                    
                    <!-- New -->
                    <v-chip small label color="#feffd6" text-color="#a08e37" v-if="!item.is_seen && !item.is_active">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_pending') }}</span>
                    </v-chip>

                    <!-- Private -->
                    <v-chip small label color="#eceeff" text-color="#314a8f" v-if="item.is_active && item.is_private">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_private') }}</span>
                    </v-chip>

                    <!-- Active -->
                    <v-chip small label color="#d1f0d7" text-color="#378541" v-if="item.is_active && !item.is_private">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_public') }}</span>
                    </v-chip>

                    <!-- Disabled -->
                    <v-chip small label color="#ececec" text-color="#747474" v-if="!item.is_active && item.is_seen">
                        <span class="ff-default fs-10 font-weight-medium letter-spacing-05px">{{ $t('t_disabled') }}</span>
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

                                <!-- Read review -->
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

                                <!-- Edit -->
                                <v-list-item @click="edit(item)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_review')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Approve -->
                                <v-list-item @click="approve([item], true)" v-if="!item.is_seen && !item.is_active">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-check-underline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_approve_review')"></v-list-item-title>
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

    </v-container>
</template>

<script>
    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get reviews
			let response = await $axios.get('dashboard/reviews')
			return {
				reviewsData : response.data.meta,
				reviews     : response.data.data
			}
		},

        data() {
            return {
                dialogs: {
                    read: false,
                    edit: false
                },
                form: {
                    rating   : 0,
                    comment  : '',
                    is_active: 0
                },
                current : null,
                loading : false,
                selected: [],
                errors  : []
            }
        },

        head() {
			return {
                title: this.$t('t_reviews')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_product'), value: 'product', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_customer'), value: 'customer', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_rating'), value: 'rating', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_date'), value: 'date', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get reviews next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/reviews?page=${page}`)
                            .then(response => {

                                // Set new reviews
                                this.reviewsData = response.data.meta
                                this.reviews     = response.data.data
                                
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
                            const url    = 'dashboard/reviews/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.reviews.splice(this.reviews.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.reviews.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.reviews.splice(vm.reviews.indexOf(item), 1);
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

            },

            // Approve reviews
            async approve(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_approve'),
                    message: this.$t('t_confirm_approve_reviews'),
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
                            const url    = 'dashboard/reviews/options/approve'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    const index                   =  this.reviews.indexOf(items[0])
                                                    this.reviews[index].is_seen   = true
                                                    this.reviews[index].is_active = true

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.reviews.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                const index                 =  vm.reviews.indexOf(item)
                                                                vm.reviews[index].is_seen   = true
                                                                vm.reviews[index].is_active = true
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

            // Read review
            read(review) {
                this.current      = review
                this.dialogs.read = true
            },

            // Edit review
            edit(review) {
                this.current        = review
                this.form.rating    = review.rating_value
                this.form.comment   = review.review_comment
                this.form.is_active = review.is_active
                this.dialogs.edit   = true
            },

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    id       : this.current.id,
                    rating   : this.form.rating,
                    comment  : this.form.comment,
                    is_active: this.form.is_active
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/reviews/options/edit', data)
                            .then(response => {

                                // Get review index
                                const index                        = this.reviews.indexOf(this.current)
                                
                                // Update review
                                this.reviews[index].rating_value   = Number(this.form.rating)
                                this.reviews[index].review_comment = this.form.comment
                                this.reviews[index].is_active      = this.form.is_active

                                // Close dialog
                                this.dialogs.edit                  = false

                                // Reset form
                                this.form.rating                   = 0
                                this.form.comment                  = null

                                // Reset selected reveiew
                                this.current                       = null

                                // Remove errors
                                this.errors                        = []

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Scroll to top
                                this.$scrollTo('#scroll-top-admin', 300, {})

                            })
                            .catch(error => {
                                // Form errors
                                if (error.response.status === 422) {
                                    this.errors  = this.$errors(error.response.data.errors)
                                }

                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

            },

        }
        
    }
</script>