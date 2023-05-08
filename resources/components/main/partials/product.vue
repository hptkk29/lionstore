<template>
    <v-card flat class="product-card">
        <div class="pa-0">

            <!-- Product preview -->
            <nuxt-link :to="`/product/${ product.handler }`" class="d-block tiktok-events-product-details">
                <v-img :src="thumbnail()" :height="$device.isMobileOrTablet ? 190 : 240" class="align-end">

                    <!-- Lazy load progress -->
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center"  justify="center">
                            <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>

                </v-img>
            </nuxt-link>

            <!-- Product details -->
            <v-card-text class="pt-2 px-0 pb-1">
                <div class="product-desc px-2">


                    <!-- Title -->
                    <p class="product-title mb-0">
                        <nuxt-link :to="`/product/${ product.handler }`" v-text="productTitle()" :title="productTitle()" class="d-inline-block fill-width tiktok-events-product-details"></nuxt-link>
                    </p>

                    <!-- Product price -->
                    <div class="pc-price text-center">

                        <!-- Price with discount -->
                        <div v-if="product.discount_type && product.discount_value">

                            <!-- Percentage discount -->
                            <template v-if="product.discount_type === 'percentage'">
                                <span class="pc-main-price">
                                    {{ $formatMoney( Number(product.price) - Number( Number(product.price) * Number(product.discount_value) / 100 ) ) }}
                                    <div class="pc-unit" v-if="product.purchase_unit">
                                        {{ `/ ${ product.purchase_unit }` }}
                                    </div>
                                </span>
                            </template>

                            <!-- Money discount -->
                            <template v-else>
                                <span class="pc-main-price">
                                    {{ $formatMoney( Number(product.price) - Number(product.discount_value) ) }}
                                    <div class="pc-unit" v-if="product.purchase_unit">
                                        {{ `/ ${ product.purchase_unit }` }}
                                    </div>
                                </span>
                            </template>

                            <!-- Price before discount -->
                            <del class="pc-regular-price">
                                {{ $formatMoney(product.price) }}
                                <div class="pc-unit" v-if="product.purchase_unit">
                                    {{ `/ ${ product.purchase_unit }` }}
                                </div>
                            </del>

                        </div>

                        <!-- Price without discount -->
                        <div v-else>

                            <span class="pc-main-price">
                                {{ $formatMoney( Number(product.price) ) }}
                                <div class="pc-unit" v-if="product.purchase_unit">
                                    {{ `/ ${ product.purchase_unit }` }}
                                </div>
                            </span>

                        </div>

                    </div>

                    <v-rating dense readonly
                        :value="product.rating === 0 ? 5 : Number(product.rating)"
                        empty-icon="mdi-star"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half-full"
                        class="mx-auto fill-width text-center mt-2 pb-3"
                        background-color="#c2c2c2"
                        color="#ffad18"
                        length="5"
                        size="17"
                        half-increments
                        ></v-rating>
                    
                    <!-- Flash deal -->
                    <div class="pc-flash-deal" v-if="flashDeal">
                        <v-icon>mdi-fire</v-icon>
                        <span v-t="'t_flash_deal'"></span>
                    </div>

                </div>
            </v-card-text>
        </div>

    </v-card>
</template>

<script>
export default {
    
    props: {
        product: Object,
        flashDeal: false
    },

    computed: {

        // Get price after discount
        priceAfterDiscount() {

            // Check if discount percentage
            if (this.product.discount_type === 'percentage') {
                
                const price = this.product.discount_value * this.product.price / 100

                return this.$formatMoney(this.product.price - price)

            } else {

                const price = this.product.price - this.product.discount_value

                return this.$formatMoney(price)

            }

        }

    },

    methods: {
        
        // Product thumbnail
        thumbnail() {
            
            // Check if product has a thumbnail
            if (this.product.thumbnail) {
                
                // Return thumbnail
                return this.$clientIndex(`uploads/${ this.product.thumbnail.file_folder }/${ this.product.thumbnail.uid }.webp`)

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

        // Get product title
        productTitle() {
            
            // Get current locale
            const locale = this.$i18n.locale

            // Decode product title
            const title  = JSON.parse(this.product.translation.title)

            // Return title
            return title[locale] ? title[locale] : title[this.$store.state.settings.default_language]

        }

    }

}
</script>