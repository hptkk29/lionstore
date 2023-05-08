<template>
    <v-dialog v-model="dialog" persistent max-width="650px">
        <loading :value="loading" />
        <v-card class="c-card" id="scroll-top-reviews">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_reviews')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pt-8 pb-5 px-8">
                <v-row>

                    <!-- Reviews -->
                    <v-col cols="12" v-if="reviews.length">
                        <v-row>
                            <template v-for="(review, index) in reviews">
                                <v-col cols="12" :key="index">
                                    <v-card class="product-review-box c-card mb-4">
                                        <v-card-title class="pb-3">
                                            <v-row align="center" class="mx-0">

                                                <!-- Customer -->
                                                <div class="product-rating-counter" :class="$vuetify.theme.dark ? 'text--lighten-5' : 'text--darken-2'" v-text="review.customer"></div>

                                                <span class="dot px-3">•</span>

                                                <!-- Review date -->
                                                <div class="product-rating-counter fs-10 font-weight-regular" :class="$vuetify.theme.dark ? 'text--lighten-5' : 'text--darken-2'" v-text="$ago(review.date)"></div>

                                            </v-row>
                                            <v-spacer></v-spacer>

                                            <!-- Rating -->
                                            <v-rating
                                                    color="#F6B01E"
                                                    background-color="#C7C7CD"
                                                    empty-icon="mdi-star"
                                                    :size="15"
                                                    :value="review.rating"
                                                    readonly
                                                    dense
                                                    ></v-rating>
                                        </v-card-title>
                                        <v-card-text>
                                            <p class="ff-open fs-11 grey--text mb-0" v-html="review.comment.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                                        </v-card-text>
                                        <v-card-actions class="pa-4">
                                            <v-spacer></v-spacer>
                                            <div class="success--text">
                                                <v-icon :size="16" color="success">mdi-truck-check</v-icon>
                                                <span class="ff-open fs-10 font-weight-bold text-uppercase pl-1" v-t="'t_verified_purchase'"></span>
                                            </div>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </template>

                            <!-- Pagination -->
                            <div class="text-center ma-auto">
                                <v-pagination
                                    v-if="reviewsData.total > reviewsData.per_page"
                                    v-model="reviewsData.current_page"
                                    :length="reviewsData.last_page"
                                    @input="fetchReviews"
                                    :total-visible="7"
                                    prev-icon="mdi-menu-left"
                                    next-icon="mdi-menu-right"
                                    color="indigo accent-3"
                                    class="pa-4"
                                    ></v-pagination>
                            </div>

                        </v-row>
                    </v-col>

                    <!-- No reviews yet -->
                    <v-col cols="12" v-else>
                        <v-alert border="left" icon="mdi-information-variant" text color="indigo accent-3">
                            <span class="ff-open fs-11 font-weight-bold" v-t="'t_no_reviews_right_now'"></span>
                        </v-alert>
                    </v-col>

                </v-row>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script>
import { EventBus } from '~/utils/events'

export default {
    
    props: {
        product: String | Number
    },

    data() {
        return {
            reviews    : [],
            reviewsData: {},
            dialog     : false,
            isLoaded   : false,
            loading    : false
        }
    },

    watch: {
        dialog: {
            deep: true,
            async handler(newValue) {
                
                // Check if reviews not yet loaded
                if (newValue === true && !this.isLoaded) {
                    await this.getNextPage()
                }

            }
        }
    },

    created() {

        // Listen to open dialog event
        EventBus.$on('open::reviews::dialog', () => {
            this.dialog = true
        })
        
    },

    methods: {

        // Get pages next page
        async getNextPage(page = 1) {

            // Enable loader
            this.loading = true

            // Send request
            await this.$axios
                        .get(`reviews?page=${page}&product=${ this.product }`)
                        .then(response => {

                            // Set new reviews
                            this.reviewsData = response.data.meta
                            this.reviews     = response.data.data

                            // Set data as loaded
                            this.isLoaded    = true
                            
                            // Scroll top
                            this.$scrollTo('#scroll-top-reviews', 300, {})

                        })
                        .catch(error => {

                            // Error
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                        }).finally(() => {

                            // Stop loader
                            this.loading = false

                        })

        }

    }

}
</script>