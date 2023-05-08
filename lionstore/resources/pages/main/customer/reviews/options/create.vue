<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row justify="center">

            <v-col :cols="$device.isMobileOrTablet ? 12 : 6">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_write_review'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <!-- Product -->
                            <v-col cols="12">
                                <v-list two-line outlined class="py-0">
                                    <v-list-item nuxt :to="`/product/${product.handler}`">
                                        <v-list-item-avatar rounded>
                                            <v-img :src="thumbnail(product)"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="fs-12 font-weight-medium" v-text="title(product)"></v-list-item-title>
                                            <v-list-item-subtitle class="fs-11 font-weight-regular grey--text pt-1" v-text="product.pid"></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-col>

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

                            <!-- Mark it as private -->
                            <v-col cols="12">
                                <v-switch inset dense v-model="form.private" color="indigo accent-3" :ripple="false" hide-details class="mt-0">
                                    <template v-slot:label>
                                        <span class="fs-12 font-weight-medium" v-t="'t_mark_review_private'"></span>
                                    </template>
                                </v-switch>
                            </v-col>

                            <!-- Submit -->
                            <v-col cols="12">
                                <v-btn rounded color="indigo accent-3" depressed block @click="create" :loading="loading" :disabled="loading" :dark="!loading" class="tiktok-review-event">
                                    <span class="fs-11 font-weight-medium" v-t="'t_write_review'" v-if="!loading"></span>
                                    <template v-slot:loader>
                                        <v-progress-circular
                                            :width="1"
                                            :size="20"
                                            color="#6c6c6c"
                                            indeterminate />
                                    </template>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>
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

    async asyncData({ app, $axios, query, redirect }) {
        // Send request to server
        let response = await $axios.post('customer/reviews/options/fetch', { order: query.order, product: query.product })

        // Check if success
        if (response.data && response.data.success) {
            return {
                order_number: response.data.order,
                product     : response.data.product
            }
        } else {
            redirect('/')
        }
    },

    data() {
        return {
            form: {
                rating: null,
                comment: null,
                private: false
            },
            errors : [],
            loading: false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_write_review')

        }
    },

    methods: {

        // Create
        async create() {

            // Start loading
            this.loading = true

            // Get data
            let data     = {
                order_number: this.order_number,
                product_id  : this.product.pid,
                rating      : Number(this.form.rating),
                comment     : this.form.comment,
                private     : Boolean(this.form.private)
            }

            // Send request to server
            await this.$axios
                        .post('customer/reviews/options/create', data)
                        .then(response => {

                            // Success
                            this.$message(this.$t('t_review_created_need_review'))

                            // Run analytics tools
                            if (process.client) {

                                // Snapchat Pixel
                                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                    window.snaptr('track', 'RATE',  { 
                                        'description': `review-${ this.order_number }`

                                    });
                                }

                                // Facebook Pixel
                                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                    window._fbq('track', 'Lead', {
                                        'content_name': `review-${ this.order_number }`
                                    })
                                }

                            }

                            // Return to reviews list
                            this.$router.push('/customer/reviews')

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

    }

}
</script>