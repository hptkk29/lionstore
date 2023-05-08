<template>
<div>

    <!-- Mobile bottom menu -->
    <div class="product-mobile-checkout-btns" :class="!$store.state.settings.checkout.is_whatsapp_order || !$store.state.settings.checkout.whatsapp_btn_mobile ? 'product-mobile-checkout-btns-two' : ''" v-if="$device.isMobileOrTablet">

        <!-- Buy now -->
        <div class="pmcb-item indigo accent-3" @click="buyNow()">
            <v-icon color="#fff">mdi-shopping</v-icon>
            <span style="color: #fff" v-t="'t_buy_now'"></span>
        </div>
        
        <!-- Add to cart -->
        <div class="pmcb-item" style="background-color: #e7ebff" @click="addToCart(true)">
            <v-icon color="#3d5afe">mdi-cart-plus</v-icon>
            <span style="color: #3d5afe" v-t="'t_add_to_cart'"></span>
        </div>

        <!-- Buy on WhatsApp -->
        <a target="_blank" class="pmcb-item" style="background-color: #25d366" v-if="$store.state.settings.checkout.is_whatsapp_order && $store.state.settings.checkout.whatsapp_btn_mobile" :href="whatsappOrderLink()">
            <v-icon color="#fff">mdi-whatsapp</v-icon>
            <span style="color: #fff" v-t="'t_buy_on_whatsapp'"></span>
        </a>

    </div>

    <v-container fluid grid-list-xl>

        

        <!-- Loading -->
        <loading :value="loading.app" />

        <!-- Product reviews -->
        <product-reviews :product="product.pid" />

        <!-- Mobile view -->
        <v-row v-if="$device.isMobileOrTablet">

            <!-- Media carousel -->
            <v-col cols="12">
                <v-card flat class="mb-3 home-sliders-mobile">
                    <client-only>
                        <v-carousel
                            continuous
                            cycle
                            :show-arrows="true"
                            hide-delimiter-background
                            :height="250"
                            prev-icon="mdi-chevron-left"
                            next-icon="mdi-chevron-right"
                            delimiter-icon="mdi-circle-medium"
                            >
                            <v-carousel-item
                                v-for="(slide, i) in $gallery(product.gallery).normal_size"
                                :key="`mobile-product-slider-${i}`"
                                :src="slide.url"
                                ></v-carousel-item>
                        </v-carousel>
                    </client-only>
                </v-card>
            </v-col>

            <!-- Product details -->
            <v-col cols="12">

                <!-- Product title & info -->
                <v-card flat class="product-page-card px-6 py-8 mb-4">

                    <!-- Product title -->
                    <div class="mb-3">
                        <h1 class="fs-17 ff-default font-weight-black" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="productTitle"></h1>
                    </div>

                    <!-- Quick actions -->
                    <div class="quick-actions">

                        <!-- Rating -->
                        <div class="action-item action-rating">
                            <div class="action-rating-stars">
                                <v-rating :value="product.rating" :length="5" readonly dense :size="15" half-increments
                                    background-color="grey"
                                    full-icon="mdi-star"
                                    empty-icon="mdi-star"
                                    half-icon="mdi-star-half-full"
                                    color="orange"></v-rating>
                            </div>
                            <div class="action-rating-label" v-text="`( ${ product.rating } )`" v-if="product.rating > 0"></div>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div @click="openReviews()" v-bind="attrs" v-on="on" class="action-rating-reviews cursor-pointer" v-text="product.meta.reviews_count === 1 ? $t('t_review_count', { counter: (product.meta.reviews_count).toLocaleString($i18n.locale) }) : $t('t_reviews_count', { counter: (product.meta.reviews_count).toLocaleString($i18n.locale) })"></div>
                                </template>
                                <span v-t="'t_click_to_view_all_reviews'"></span>
                            </v-tooltip>

                        </div>

                        <!-- Wishlist -->
                        <div class="action-item cursor-pointer tiktok-add-to-wishlist-event" @click="inWishlist ? removeFromWishlist() : addToWishlist()">
                            <div class="action-icon">
                                <v-icon>{{ inWishlist ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                            </div>
                            <div class="action-text" v-t="inWishlist ? 't_remove_from_wishlist' : 't_add_to_wishlist'"></div>
                        </div>

                    </div>

                    <v-divider class="mt-1" />

                    <!-- Product price -->
                    <div class="product-price-header mt-6">

                        <!-- Product with discount -->
                        <div class="price-value" v-if="product.discount_type && product.discount_value">

                            <!-- Price before discount -->
                            <div class="price-before-discount">
                                {{ $formatMoney(product.price) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                            </div>

                            <!-- Price after discount -->
                            <div class="price-after-discount">
                                
                                <!-- Percentage discount -->
                                <template v-if="product.discount_type === 'percentage'">
                                    {{ $formatMoney( Number(product.price) - Number( Number(product.price) * Number(product.discount_value) / 100 ) ) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                                </template>

                                <!-- Money discount -->
                                <template v-else>
                                    {{ $formatMoney( Number(product.price) - Number(product.discount_value) ) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                                </template>
                            </div>

                        </div>

                        <!-- Product without discount -->
                        <div class="price-value" v-else>
                            <div class="price-after-discount">
                                {{ $formatMoney(product.price) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- Flash deal -->
                    <div class="product-flash-deal" v-if="product.flashDeal">
                        <client-only>
                            <countdown :end-time="product.flashDeal.ends_at">
                                <template v-slot:process="{ timeObj }">
                                    <ul class="fill-width justify-space-between">
                                        <li><span v-text="timeObj.d"></span><div v-t="'t_days'"></div></li>
                                        <li><span v-text="timeObj.h"></span><div v-t="'t_hours'"></div></li>
                                        <li><span v-text="timeObj.m"></span><div v-t="'t_minutes'"></div></li>
                                        <li><span v-text="timeObj.s"></span><div v-t="'t_seconds'"></div></li>
                                    </ul>
                                </template>
                            </countdown>
                        </client-only>
                    </div>

                    <!-- Brand -->
                    <div class="sku-wrap mt-4 d-block" v-if="product.brand">
                        <div class="sku-property sku-image">
                            <div class="sku-title" v-t="'t_brand'"></div>
                            <ul class="sku-property-list px-0">
                                <li class="sku-property-item">
                                    <div class="sku-property-text">
                                        <nuxt-link class="d-flex" :to="`/brand/${ product.brand.handler }`">
                                            <img :src="brandLogo">
                                        </nuxt-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Product variants -->
                    <div class="product-variants text-left mb-4 mt-6" v-if="product.variants">
                        <div class="product-sku">
                            <div class="sku-wrap">
                                <template v-for="(variant, index) in product.variants">

                                    <!-- Radio variant -->
                                    <div class="sku-property mb-4" :key="`variants-${index}`" v-if="variant.type === 'radio'">
                                        <div class="sku-title" v-text="variant.name"></div>
                                        <ul class="sku-property-list sku-property-radio px-0">
                                            <template v-for="(option, index) in variant.options.split(',')">
                                                <li class="sku-property-item" :key="`radio-variant-${index}`" @click="addVariant(variant, option)" :class="isVariantSelected(variant, option) ? 'sku-property-item-selected' : ''">
                                                    <div class="sku-property-text"><span>{{ option }}</span></div>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>

                                    <!-- Color variant -->
                                    <div class="sku-property mb-4" :key="`variants-${index}`" v-if="variant.type === 'color'">
                                        <div class="sku-title" v-text="variant.name"></div>
                                        <ul class="sku-property-list sku-colors-property px-0">
                                            <template v-for="(color, index) in JSON.parse(variant.options.split(','))">
                                                <li class="sku-property-item sku-property-item-color" :key="`color-variant-${index}`" @click="addVariant(variant, color)">
                                                    
                                                    <div class="sku-property-text" :style="`background-color: ${color.color}`">
                                                        <v-icon v-if="isVariantSelected(variant, color.color)">mdi-check-bold</v-icon>
                                                    </div>

                                                </li>
                                            </template>
                                        </ul>
                                    </div>

                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- Order Quantity -->
                    <div class="product-quantity mb-4 clearfix">
                        <div class="product-quantity-title" v-t="'t_quantity'"></div>
                        <span class="next-number-picker next-number-picker-inline next-medium zoro-ui-number-picker number-picker product-number-picker"><span class="next-input-group"><span class="next-input-group-addon next-before">

                            <!-- Decrement quantity -->
                            <button @click="decrementQuantity()" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-minus next-xs next-btn-icon next-icon-alone">mdi-minus</v-icon></button>

                            </span>

                            <!-- Product quantity -->
                            <span class="next-input next-medium next-input-group-auto-width">
                                <input height="100%" autocomplete="off" v-model="form.quantity" />
                            </span>
                            
                            <span class="next-input-group-addon next-after">

                            <!-- Increment quantity -->    
                            <button @click="incrementQuantity()" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-add next-xs next-btn-icon next-icon-alone">mdi-plus</v-icon></button></span></span>
                        </span>
                        
                        <div class="product-quantity-info ml-0 mr-4" v-if="isReadyToOrder()">
                            <div class="product-quantity-tip">
                                <span v-html="`${$t('t_total_price')} <b class='font-weight-bold ${ $vuetify.theme.dark ? 'white--text' : 'black--text' }'>${ getTotalPrice() }</b>`"></span>
                            </div>
                        </div>
                            
                    </div>

                </v-card>

            </v-col>

            <!-- Tags & Video -->
            <v-col cols="12">
                <!-- Tags & Video -->
                <v-card flat class="product-page-card px-4 py-6 mb-4">

                    <!-- Tags -->
                    <div v-if="product.tags">
                        <template v-for="(tag, t) in product.tags.split(',')">
                            <v-chip :key="`tags-${t}`" nuxt small class="mr-2 font-weight-medium fs-11" :to="`/search?q=${tag}`">
                                {{ tag }}
                            </v-chip>
                        </template>
                    </div>

                    <v-divider class="my-4" v-if="product.video_provider"></v-divider>

                    <!-- Youtube video -->
                    <iframe v-if="product.video_provider === 'youtube'" width="100%" height="180" :src="`https://www.youtube.com/embed/${youtubeId(product.video_link)}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>

                    <!-- Vimeo video -->
                    <iframe v-else-if="product.video_provider === 'vimeo'" :src="`https://player.vimeo.com/video/${vimeoId(product.video_link)}`" width="100%" height="180" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="true"></iframe>

                    <!-- Facebook video -->
                    <iframe v-else-if="product.video_provider === 'facebook'" :src="`https://www.facebook.com/plugins/video.php?height=720&href=${product.video_link}%2F&show_text=false&width=100%`" width="100%" height="180" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

                </v-card>
            </v-col>

            <!-- Product description -->
            <v-col cols="12">
                <v-card flat class="product-page-card ql-editor px-4 py-6 mb-4">
                    <v-card-text v-html="productDescription"></v-card-text>
                </v-card>
            </v-col>

            <!-- Social media -->
            <v-col cols="12" class="text-center mb-4">
                <template v-for="(share, index) in shareIcons">

                    <v-btn depressed dark small :color="share.color" :key="`social-icon-${index}`" :href="share.href" target="_blank" class="mx-3 mb-3">
                        <v-icon left :size="share.size">{{ share.icon }}</v-icon>
                        <span class="fs-11 font-weight-medium text-capitalize" v-t="share.title"></span>
                    </v-btn>

                </template>
            </v-col>

            <!-- Related product -->
            <client-only>
                <!-- Section title -->
                <v-col cols="12" class="mt-12">
                    <div class="section-title">
                        <v-row align="center" justify="space-between" class="mx-0">
                            <div>
                                <div class="section-title-h1">
                                    <h1 v-t="'t_similar_products'"></h1>
                                </div>
                            </div>
                            <div class="slider-arrows" v-if="$vuetify.rtl">
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="relatedPrevSlider()">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="relatedNextSlider()">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                            </div>
                            <div class="slider-arrows" v-else>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="relatedNextSlider()">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="relatedPrevSlider()">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                    </div>
                </v-col>

                <!-- Products list -->
                <v-col cols="12">
                    <swiper ref="relatedProductsSwiper" class="swiper" :options="{slidesPerView: $device.isMobileOrTablet ? 2 : 6, spaceBetween: $device.isMobileOrTablet ? 25 : 25,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }}">
                        <template v-for="p in similar_products">
                            <swiper-slide :key="p.uid" v-if="product.id !== p.id">
                                <product-card :product="p"></product-card>
                            </swiper-slide>
                        </template>
                    </swiper>
                </v-col>
            </client-only>

        </v-row>

        <!-- Desktop view -->
        <v-row v-else>

            <!-- Product breadcrumbs -->
            <v-col cols="12" class="product-breadcrumbs">
                <ul class="v-breadcrumbs px-0 mb-0 d-flex">

                    <!-- Home -->
                    <li class="d-flex">
                        <nuxt-link to="/" class="v-breadcrumbs__item px-4 justify-center align-center" style="margin-top: 0px;display: flex;height: 36px;">
                            <v-icon :size="20" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-2'">mdi-home</v-icon>
                        </nuxt-link>
                    </li>

                    <!-- Arrow -->
                    <li class="v-breadcrumbs__divider" v-if="product.category">
                        <v-icon :size="17" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-2'">{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                    </li>

                    <!-- Parent category -->
                    <li v-if="product.category">
                        <nuxt-link :to="`/category/${product.category.handler}`" class="v-breadcrumbs__item ff-default fs-11 font-weight-bold" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-3'">
                            {{ categoryTitle }}
                        </nuxt-link>
                    </li>

                    <!-- Arrow -->
                    <li class="v-breadcrumbs__divider" v-if="product.subcategory && product.category">
                        <v-icon :size="17" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-2'">{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                    </li>

                    <!-- Subcategory -->
                    <li v-if="product.subcategory && product.category">
                        <nuxt-link :to="`/category/${product.category.handler}/${product.subcategory.handler}`" class="v-breadcrumbs__item ff-default fs-11 font-weight-bold" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-3'">
                            {{ subcategoryTitle }}
                        </nuxt-link>
                    </li>

                    <!-- Arrow -->
                    <li class="v-breadcrumbs__divider" v-if="product.childcategory && product.subcategory && product.category">
                        <v-icon :size="17" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-2'">{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                    </li>

                    <!-- Childcategory -->
                    <li v-if="product.childcategory && product.subcategory && product.category">
                        <nuxt-link :to="`/category/${product.category.handler}/${product.subcategory.handler}/${product.childcategory.handler}`" class="v-breadcrumbs__item ff-default fs-11 font-weight-bold" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-3'">
                            {{ childcategoryTitle }}
                        </nuxt-link>
                    </li>

                    <!-- Arrow -->
                    <li class="v-breadcrumbs__divider">
                        <v-icon :size="17" :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-2'">{{ $vuetify.rtl ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                    </li>

                    <!-- Title -->
                    <li style="margin-top: 5px;">
                        <span :class="$vuetify.theme.dark ? 'grey--text text--lighten-1' : 'grey--text text--darken-3'" class="v-breadcrumbs__item v-breadcrumbs__item--disabled ff-default fs-12 font-weight-medium" style="display: inline-block; max-width: 500px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis;">
                            {{ productTitle }}
                        </span>
                    </li>
                </ul>
            </v-col>

            <!-- Product media -->
            <v-col cols="6">

                <!-- Media carousel -->
                <v-card flat class="product-page-card pa-12 mb-8">
                    <client-only>
                        <ProductZoomer
                            :base-images="$gallery(product.gallery, product.is_product_zoomer)"
                            :base-zoomer-options="zoomerOptions"
                            />
                    </client-only>
                </v-card>

                <!-- Tags & Video -->
                <v-card flat class="product-page-card pa-12 mb-8">

                    <!-- Tags -->
                    <div v-if="product.tags">
                        <template v-for="(tag, t) in product.tags.split(',')">
                            <v-chip :key="`tags-${t}`" nuxt small class="mr-2 font-weight-medium fs-11" :to="`/search?q=${tag}`">
                                {{ tag }}
                            </v-chip>
                        </template>
                    </div>

                    <v-divider class="mt-8 mb-8" v-if="product.video_provider"></v-divider>

                    <!-- Youtube video -->
                    <iframe v-if="product.video_provider === 'youtube'" width="100%" height="360" :src="`https://www.youtube.com/embed/${youtubeId(product.video_link)}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>

                    <!-- Vimeo video -->
                    <iframe v-else-if="product.video_provider === 'vimeo'" :src="`https://player.vimeo.com/video/${vimeoId(product.video_link)}`" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="true"></iframe>

                    <!-- Facebook video -->
                    <iframe v-else-if="product.video_provider === 'facebook'" :src="`https://www.facebook.com/plugins/video.php?height=720&href=${product.video_link}%2F&show_text=false&width=100%`" width="100%" height="360" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

                </v-card>

            </v-col>

            <!-- Product details -->
            <v-col cols="6">

                <!-- Product title & info -->
                <v-card flat class="product-page-card pa-12 mb-4">

                    <!-- Product title -->
                    <div class="mb-3">
                        <h1 class="fs-22 ff-default font-weight-black" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-text="productTitle"></h1>
                    </div>

                    <!-- Quick actions -->
                    <div class="quick-actions">

                        <!-- Rating -->
                        <div class="action-item action-rating">
                            <div class="action-rating-stars">
                                <v-rating :value="product.rating" :length="5" readonly dense :size="15" half-increments
                                    background-color="grey"
                                    full-icon="mdi-star"
                                    empty-icon="mdi-star"
                                    half-icon="mdi-star-half-full"
                                    color="orange"></v-rating>
                            </div>
                            <div class="action-rating-label" v-text="`( ${ product.rating } )`" v-if="product.rating > 0"></div>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div @click="openReviews()" v-bind="attrs" v-on="on" class="action-rating-reviews cursor-pointer" v-text="product.meta.reviews_count === 1 ? $t('t_review_count', { counter: (product.meta.reviews_count).toLocaleString($i18n.locale) }) : $t('t_reviews_count', { counter: (product.meta.reviews_count).toLocaleString($i18n.locale) })"></div>
                                </template>
                                <span v-t="'t_click_to_view_all_reviews'"></span>
                            </v-tooltip>

                        </div>

                        <!-- Wishlist -->
                        <div class="action-item cursor-pointer tiktok-add-to-wishlist-event" @click="inWishlist ? removeFromWishlist() : addToWishlist()">
                            <div class="action-icon">
                                <v-icon>{{ inWishlist ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                            </div>
                            <div class="action-text" v-t="inWishlist ? 't_remove_from_wishlist' : 't_add_to_wishlist'"></div>
                        </div>

                        <!-- Free shipping -->
                        <div class="action-item" v-if="product.shipping_type === 'free'">
                            <div class="action-icon">
                                <v-icon color="success">mdi-truck-fast</v-icon>
                            </div>
                            <div class="action-text success--text" v-t="'t_free_shipping'"></div>
                        </div>

                    </div>

                    <v-divider class="mt-1" />

                    <!-- Product price -->
                    <div class="product-price-header mt-6">

                        <!-- Product with discount -->
                        <div class="price-value" v-if="product.discount_type && product.discount_value">

                            <!-- Price before discount -->
                            <div class="price-before-discount">
                                {{ $formatMoney(product.price) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                            </div>

                            <!-- Price after discount -->
                            <div class="price-after-discount">
                                
                                <!-- Percentage discount -->
                                <template v-if="product.discount_type === 'percentage'">
                                    {{ $formatMoney( Number(product.price) - Number( Number(product.price) * Number(product.discount_value) / 100 ) ) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                                </template>

                                <!-- Money discount -->
                                <template v-else>
                                    {{ $formatMoney( Number(product.price) - Number(product.discount_value) ) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                                </template>
                            </div>

                        </div>

                        <!-- Product without discount -->
                        <div class="price-value" v-else>
                            <div class="price-after-discount">
                                {{ $formatMoney(product.price) }} <span class="purchase-unit" v-if="product.purchase_unit">{{ `/ ${ product.purchase_unit }` }}</span>
                            </div>
                        </div>

                    </div>

                    <!-- Flash deal -->
                    <div class="product-flash-deal" v-if="product.flashDeal">
                        <client-only>
                            <countdown :end-time="product.flashDeal.ends_at">
                                <template v-slot:process="{ timeObj }">
                                    <ul>
                                        <li><span v-text="timeObj.d"></span><div v-t="'t_days'"></div></li>
                                        <li><span v-text="timeObj.h"></span><div v-t="'t_hours'"></div></li>
                                        <li><span v-text="timeObj.m"></span><div v-t="'t_minutes'"></div></li>
                                        <li><span v-text="timeObj.s"></span><div v-t="'t_seconds'"></div></li>
                                    </ul>
                                </template>
                            </countdown>
                        </client-only>
                    </div>

                    <!-- Brand -->
                    <div class="sku-wrap mt-4 d-block" v-if="product.brand">
                        <div class="sku-property sku-image">
                            <div class="sku-title" v-t="'t_brand'"></div>
                            <ul class="sku-property-list px-0">
                                <li class="sku-property-item">
                                    <div class="sku-property-text">
                                        <nuxt-link class="d-flex" :to="`/brand/${ product.brand.handler }`">
                                            <img :src="brandLogo">
                                        </nuxt-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Product variants -->
                    <div class="product-variants text-left mb-4 mt-6" v-if="product.variants">
                        <div class="product-sku">
                            <div class="sku-wrap">
                                <template v-for="(variant, index) in product.variants">

                                    <!-- Radio variant -->
                                    <div class="sku-property mb-4" :key="`variants-${index}`" v-if="variant.type === 'radio'">
                                        <div class="sku-title" v-text="variant.name"></div>
                                        <ul class="sku-property-list sku-property-radio px-0">
                                            <template v-for="(option, index) in variant.options.split(',')">
                                                <li class="sku-property-item" :key="`radio-variant-${index}`" @click="addVariant(variant, option)" :class="isVariantSelected(variant, option) ? 'sku-property-item-selected' : ''">
                                                    <div class="sku-property-text"><span>{{ option }}</span></div>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>

                                    <!-- Color variant -->
                                    <div class="sku-property mb-4" :key="`variants-${index}`" v-if="variant.type === 'color'">
                                        <div class="sku-title" v-text="variant.name"></div>
                                        <ul class="sku-property-list sku-colors-property px-0">
                                            <template v-for="(color, index) in JSON.parse(variant.options.split(','))">
                                                <li class="sku-property-item sku-property-item-color" :key="`color-variant-${index}`" @click="addVariant(variant, color)">
                                                    
                                                    <div class="sku-property-text" :style="`background-color: ${color.color}`">
                                                        <v-icon v-if="isVariantSelected(variant, color.color)">mdi-check-bold</v-icon>
                                                    </div>

                                                </li>
                                            </template>
                                        </ul>
                                    </div>

                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- Order Quantity -->
                    <div class="product-quantity mb-4 clearfix">
                        <div class="product-quantity-title" v-t="'t_quantity'"></div>
                        <span class="next-number-picker next-number-picker-inline next-medium zoro-ui-number-picker number-picker product-number-picker"><span class="next-input-group"><span class="next-input-group-addon next-before">

                            <!-- Decrement quantity -->
                            <button @click="decrementQuantity()" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-minus next-xs next-btn-icon next-icon-alone">mdi-minus</v-icon></button>

                            </span>

                            <!-- Product quantity -->
                            <span class="next-input next-medium next-input-group-auto-width">
                                <input height="100%" autocomplete="off" v-model="form.quantity" />
                            </span>
                            
                            <span class="next-input-group-addon next-after">

                            <!-- Increment quantity -->    
                            <button @click="incrementQuantity()" class="next-btn next-medium next-btn-normal" role="button"><v-icon class="next-icon next-icon-add next-xs next-btn-icon next-icon-alone">mdi-plus</v-icon></button></span></span>
                        </span>
                        
                        <div class="product-quantity-info ml-0 mr-4" v-if="isReadyToOrder()">
                            <div class="product-quantity-tip">
                                <span v-html="`${$t('t_total_price')} <b class='font-weight-bold ${ $vuetify.theme.dark ? 'white--text' : 'black--text' }'>${ getTotalPrice() }</b>`"></span>
                            </div>
                        </div>
                            
                    </div>

                    <!-- Product checkout buttons -->
                    <div class="product-checkout mt-8">
                        
                        <v-row align="center" justify="space-between">

                            <!-- Buy now -->
                            <v-col :cols="$store.state.settings.checkout.is_whatsapp_order && $store.state.settings.checkout.whatsapp_btn_desktop ? 5 : 7" class="pb-0">
                                <v-btn :disabled="loading.buy" :loading="loading.buy" block :dark="!loading.buy" depressed color="indigo accent-3" class="product-add-to-cart tiktok-add-to-cart-event" @click="buyNow()">
                                    <v-icon left :size="18" class="pl-2">mdi-shopping</v-icon>
                                    {{ $t('t_buy_now') }}
                                </v-btn>
                            </v-col>

                            <!-- Add to cart -->
                            <v-col :cols="$store.state.settings.checkout.is_whatsapp_order && $store.state.settings.checkout.whatsapp_btn_desktop ? 2 : 5" class="pb-0">
                                <v-btn :disabled="loading.cart" :loading="loading.cart" block :dark="!loading.cart" depressed color="blue lighten-5 blue--text text--darken-3" class="product-add-to-cart tiktok-add-to-cart-event" @click="addToCart(true)">
                                    <v-icon class="mx-0" :size="18">mdi-cart-plus</v-icon>
                                </v-btn>
                            </v-col>

                            <!-- Buy on Whatsapp -->
                            <v-col cols="5" class="pb-0" v-if="$store.state.settings.checkout.is_whatsapp_order && $store.state.settings.checkout.whatsapp_btn_desktop">
                                <v-btn dark block depressed color="#25d366" class="product-add-to-cart" :href="whatsappOrderLink()" target="_blank">
                                    <v-icon left :size="18" class="pl-2">mdi-whatsapp</v-icon>
                                    {{ $t('t_buy_on_whatsapp') }}
                                </v-btn>
                            </v-col>

                        </v-row>
                    </div>

                </v-card>

                <!-- Social media -->
                <div class="text-center mt-12">
                    <template v-for="(share, index) in shareIcons">

                        <v-btn depressed dark small :color="share.color" :key="`social-icon-${index}`" :href="share.href" target="_blank" class="mx-3 mb-3">
                            <v-icon left :size="share.size">{{ share.icon }}</v-icon>
                            <span class="fs-11 font-weight-medium text-capitalize" v-t="share.title"></span>
                        </v-btn>

                    </template>
                </div>

            </v-col>

            <!-- Product description -->
            <v-col cols="12">
                <v-card flat class="product-page-card ql-editor pa-12 mb-8">
                    <v-card-text v-html="productDescription"></v-card-text>
                </v-card>
            </v-col>

            <!-- Related product -->
            <client-only>
                <!-- Section title -->
                <v-col cols="12" class="mt-12">
                    <div class="section-title">
                        <v-row align="center" justify="space-between" class="mx-0">
                            <div>
                                <div class="section-title-h1">
                                    <h1 v-t="'t_similar_products'"></h1>
                                </div>
                            </div>
                            <div class="slider-arrows" v-if="$vuetify.rtl">
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="relatedPrevSlider()">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="relatedNextSlider()">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                            </div>
                            <div class="slider-arrows" v-else>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4 mr-1" @click="relatedNextSlider()">
                                    <v-icon :size="15">mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn depressed x-small dark color="indigo accent-3" class="rounded py-4" @click="relatedPrevSlider()">
                                    <v-icon :size="15">mdi-chevron-right</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                    </div>
                </v-col>

                <!-- Products list -->
                <v-col cols="12">
                    <swiper ref="relatedProductsSwiper" class="swiper" :options="{slidesPerView: $device.isMobileOrTablet ? 2 : 6, spaceBetween: $device.isMobileOrTablet ? 25 : 25,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }}">
                        <template v-for="p in similar_products">
                            <swiper-slide :key="p.uid" v-if="product.id !== p.id">
                                <product-card :product="p"></product-card>
                            </swiper-slide>
                        </template>
                    </swiper>
                </v-col>
            </client-only>

        </v-row>

    </v-container>

</div>
</template>

<script>
import { EventBus } from '~/utils/events'
import 'swiper/swiper-bundle.css'

export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    async asyncData({ app, $axios, params }) {
        // Send request to server
        let response = await $axios.post('product', { handler: params.handler })

        return {
            product         : response.data.product,
            similar_products: response.data.similar,
            inWishlist      : response.data.inWishlist,

            // Zoomer options	
            zoomerOptions: {
                zoomFactor                : response.data.product.is_product_zoomer ? 3 : 1,
                pane                      : 'container-round',
                namespace                 : "inline-round-zoomer",
                hoverDelay                : 100,
                move_by_click             : true,
                scroll_items              : 6,
                choosed_thumb_border_color: "#bbdefb",
                scroller_button_style     : "line",
                scroller_position         : 'left'
            },
        }
    },

    data() {
        return {

            // Form to add product to cart
            form: {
                variants: [],
                quantity: 1
            },

            // Product attributes
            attributes: [],

            // Loading spinners
            loading: {
                app     : false,
                wishlist: false,
                buy     : false,
                cart    : false,
                reviews : false
            },

            // Dialogs
            dialog: {
                reviews: false
            },

            // Reviews
            reviewsData  : [],
            reviews      : [],
            reviewsLoaded: false,

        }
    },

    jsonld() {
        const items = this.jsonBreadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@id': item.url,
                name: item.text,
            },
        }));

        return [
            {
                "@context"       : "https://schema.org/", 
                "@type"          : "Product", 
                "name"           : this.productTitle,
                "image"          : this.preview,
                "description"    : this.product.seo ? this.product.seo.description : '',
                "brand"          : {
                    "@type": "Brand",
                    "name" : this.brandName ? this.brandName : this.$store.state.settings.site_title
                },
                "sku"            : this.product.product_barcode,
                "mpn"            : `${this.product.product_barcode}${Math.floor(Math.random()*100) + 1}`,
                "offers"         : {
                    "@type"          : "Offer",
                    "url"            : this.$clientIndex(`product/${this.product.handler}`),
                    "priceCurrency"  : this.$store.state.settings.currency.code,
                    "price"          : this.product.price,
                    "priceValidUntil": new Date().setDate(new Date().getDate()+365),
                    "availability"   : "https://schema.org/InStock",
                    "itemCondition"  : "https://schema.org/NewCondition"
                },
                "aggregateRating": {
                    "@type"      : "AggregateRating",
                    "ratingValue": isNaN(this.rating) || Number(this.rating) === 0 ? 5 : Math.trunc(this.rating),
                    "bestRating" : "5",
                    "worstRating": "1",
                    "ratingCount": !Number(this.product.meta.reviews_count) ? Math.floor(Math.random()*100) + 1 : this.product.meta.reviews_count
                },
                "review": [
                    {
                        "@type"        : "Review",
                        "author"       : this.$store.state.settings.site_title,
                        "datePublished": `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                        "reviewBody"   : this.$store.state.settings.site_description,
                        "name"         : "Good",
                        "reviewRating" : {
                            "@type": "Rating",
                            "bestRating": "5",
                            "ratingValue": "5",
                            "worstRating": "1"
                        }
                    }
                ]
            },
            {
                '@context'     : 'https://schema.org',
                '@type'        : 'BreadcrumbList',
                itemListElement: items,
            }
        ]
    },

    head () {
        return {
            title: this.productTitle,
            titleTemplate: `%s ${this.$store.state.settings.title_separator} ${this.$store.state.settings.site_title}`,

            meta: [
                { hid: 'description', name: 'description', content: this.product.seo.description },

                // OG Meta Tags
                { hid: 'og:title', property: 'og:title', content: this.productTitle},
                { hid: 'og:description', property: 'og:description', content: this.product.seo.description },
                { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },
                { hid: 'og:url', property: 'og:url', content: this.$clientIndex(`product/${this.product.handler}`)},
                { hid: 'og:image', property: 'og:image', content: this.preview},
                { hid: 'og:type', property: 'og:type', content: 'product'},
                { hid: 'fb:app_id', property: 'fb:app_id', content: this.$store.state.settings.seo.facebook_app_id},
                { hid: 'product:price:amount', property: 'product:price:amount', content: this.product.price},
                { hid: 'product:price:currency', property: 'product:price:currency', content: this.$store.state.settings.currency.code},
                { hid: 'product:condition', property: 'product:condition', content: 'new'},
                { hid: 'product:availability', property: 'product:availability', content: 'in stock'},
                { hid: 'product:retailer_item_id', property: 'product:retailer_item_id', content: this.product.pid},
                { hid: 'fb:page_id', property: 'fb:page_id', content: this.$store.state.settings.seo.facebook_page_id },

                // Twitter card
                { hid: 'twitter:title', name: 'twitter:title', content: this.productTitle },
                { hid: 'twitter:description', name: 'twitter:description', content: this.product.seo.description },
                { hid: 'twitter:image', name: 'twitter:image', content: this.preview },
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.productTitle },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { hid: 'twitter:site', name: 'twitter:site', content: `@${this.$store.state.settings.seo.twitter_username}` },
            ],

            // Set links tags
            link: [
                { rel: 'canonical', href: this.$clientIndex(`product/${this.product.handler}`) }
            ]
        }
    },

    components: {
        'product-reviews': () => import('~/components/main/partials/reviews')
    },

    watch: {

        // Watch quantity
        'form.quantity': {
            handler: function(newValue) {
                
                // Check if value is false
                if (!Number(newValue)) {
                    
                    // Reset value to 1
                    this.form.quantity = 1
                    
                }

                // Check if value more than stock
                if (Number(newValue) > this.product.stock) {
                    
                    // Reset to stock quantity
                    this.form.quantity = this.product.stock

                }

            },
            deep: true
        },

    },

    computed: {

        // Get product title
        productTitle() {
            // Get current locale
            const locale = this.$i18n.locale

            // Decode product title
            const title  = JSON.parse(this.product.translation.title)

            // Return title
            return title[locale]
        },

        // Get product description
        productDescription() {
            
            // Get current locale
            const locale = this.$i18n.locale

            // Return content depends on current locale
            switch (locale) {
                case 'ar':
                    return this.product.translation.description_ar
                    break;

                case 'az':
                    return this.product.translation.description_az
                    break;

                case 'cn':
                    return this.product.translation.description_cn
                    break;

                case 'de':
                    return this.product.translation.description_de
                    break;

                case 'en':
                    return this.product.translation.description_en
                    break;

                case 'es':
                    return this.product.translation.description_es
                    break;

                case 'fr':
                    return this.product.translation.description_fr
                    break;

                case 'hi':
                    return this.product.translation.description_hi
                    break;

                case 'hu':
                    return this.product.translation.description_hu
                    break;

                case 'jp':
                    return this.product.translation.description_jp
                    break;

                case 'nl':
                    return this.product.translation.description_nl
                    break;

                case 'po':
                    return this.product.translation.description_po
                    break;

                case 'pt':
                    return this.product.translation.description_pt
                    break;

                case 'ro':
                    return this.product.translation.description_ro
                    break;

                case 'ru':
                    return this.product.translation.description_ru
                    break;

                case 'th':
                    return this.product.translation.description_th
                    break;

                case 'tr':
                    return this.product.translation.description_tr
                    break;

                case 'ua':
                    return this.product.translation.description_ua
                    break;
            
                default:
                    return this.product.translation.description_en
                    break;
            }

        },

        // Get parent category title
        categoryTitle() {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode category title
            const title  = JSON.parse(this.product.category.translation.title)

            // Return title
            return title[locale]

        },

        // Get subcategory title
        subcategoryTitle() {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode subcategory title
            const title  = JSON.parse(this.product.subcategory.translation.title)

            // Return title
            return title[locale]

        },

        // Get childcategory title
        childcategoryTitle() {

            // Get current locale
            const locale = this.$i18n.locale

            // Decode childcategory title
            const title  = JSON.parse(this.product.childcategory.translation.title)

            // Return title
            return title[locale]

        },

        // Get brand name
        brandName() {

            if (this.product.brand) {
                // Get current locale
                const locale = this.$i18n.locale

                // Decode brand name
                const name   = JSON.parse(this.product.brand.translation.name)

                return name[locale]
            } else {
                return false
            }

        },

        // Get brand logo
        brandLogo() {

            // Check if product has a brand
            if (this.product.brand) {
                return this.$clientIndex(`uploads/${ this.product.brand.logo.file_folder }/${ this.product.brand.logo.uid }.webp`)
            }

        },

        // Product preview
        preview() {
            
            // Check if product has a preview
            if (this.product.preview) {
                
                // Return preview
                return this.$clientIndex(`uploads/${ this.product.preview.file_folder }/${ this.product.preview.uid }.webp`)

            } else {

                // Product has no preview
                // Return default image
                return this.$clientIndex('images/default/thumbnail.svg')

            }
        },

        // Social media share icons
        shareIcons() {
            return [

                // Facebook
                { 
                    icon : 'mdi-facebook', 
                    size : '16px',
                    color: '#4267B2',
                    title: 't_share',
                    href : `https://facebook.com/sharer/sharer.php?u=${this.$clientIndex(`product/${this.product.handler}`)}` 
                },

                // Twitter
                { 
                    icon : 'mdi-twitter', 
                    size : '16px',
                    color: '#55acee',
                    title: 't_tweet',
                    href : `https://twitter.com/intent/tweet/?text=${this.productTitle}&url=${this.$clientIndex(`product/${this.product.handler}`)}` 
                },

                // Whatsapp
                { 
                    icon : 'mdi-whatsapp', 
                    size : '16px',
                    color: '#25d366',
                    title: 't_share',
                    href : `whatsapp://send?text=${this.$clientIndex(`product/${this.product.handler}`)}` 
                },

                // Telegram
                { 
                    icon : 'mdi-telegram', 
                    size : '16px',
                    color: '#0088cc',
                    title: 't_share',
                    href : `https://t.me/share/url?url=${this.$clientIndex(`product/${this.product.handler}`)}&text=${this.productTitle}` 
                },

                // Messenger
                { 
                    icon : 'mdi-facebook-messenger', 
                    size : '16px', 
                    color: '#00B2FF',
                    title: 't_send',
                    href : `https://www.facebook.com/dialog/send?link=${ this.$clientIndex(`product/${this.product.handler}`) }&app_id=${ this.$store.state.settings.seo.facebook_app_id }&redirect_uri=${ this.$clientIndex(`product/${this.product.handler}`) }`
                },

                // Pinterest
                { 
                    icon : 'mdi-pinterest', 
                    size : '16px', 
                    color: '#CB2027',
                    title: 't_pin',
                    href : `https://pinterest.com/pin/create/button/?url=${this.$clientIndex(`product/${this.product.handler}`)}&media=${this.preview}&description=${this.productTitle}`
                },

                // Gmail
                { 
                    icon : 'mdi-gmail', 
                    size : '16px', 
                    color: '#D44638',
                    title: 't_send',
                    href : `https://mail.google.com/mail/u/0/?view=cm&to&su=${this.productTitle}&body=${this.$clientIndex(`product/${this.product.handler}`)}&bcc&cc&fs=1&tf=1`
                },

            ]
        },

        // JSON LD
        jsonBreadcrumbs(){
            return [
                {
                    url: this.$clientIndex(),
                    text: this.$t('t_home'),
                },
                {
                    url: this.$clientIndex(`product/${ this.product.handler }`),
                    text: this.productTitle,
                }
            ]
        }

    },

    methods: {

        buyNow() {

            // Check if product ready to order
            if (!this.isReadyToOrder()) {
                // Error
                this.$message(this.$t('t_please_select_product_options'), 'shopping', 'info')
                if (this.$device.isMobileOrTablet) {
                    this.$scrollTo('#select-product-options', 300, {})
                }
                return
            }

            // Add product to cart
            let isProductAdded = this.addToCart()

            // Run analytics tools
            if (process.client) {
                
                // Snapchat Pixel
                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                    window.snaptr('track', 'ADD_CART',  { 
                        'price'      : this.getTotalPrice(true),
                        'currency'   : this.$store.state.settings.currency.code,
                        'description': this.productTitle,
                        'item_ids'   : [this.product.pid]
                    });
                }

                // Facebook Pixel
                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                    window._fbq('track', 'AddToCart', {
                        'value'       : this.getTotalPrice(true),
                        'currency'    : this.$store.state.settings.currency.code,
                        'content_name': this.productTitle,
                        'content_type': 'product',
                        'content_ids' : [this.product.pid]
                    })
                }

            }

            // Check if product added
            if (isProductAdded) {
                
                // Go to cart page
                this.$router.push('/checkout/cart')
            }

        },

        // Add product to cart
        async addToCart(direct = false) {
            
            // Check if product ready to order
            if (!this.isReadyToOrder()) {
                // Error
                this.$message(this.$t('t_please_select_product_options'), 'shopping', 'info')
                if (this.$device.isMobileOrTablet) {
                    this.$scrollTo('#select-product-options', 300, {})
                }
                return
            }

            // Check if user clicked add to cart button not buy now
            if (direct) {
                this.loading.cart = true
            }else{
                this.loading.buy = true
            }

            // Check if product has variants
            if (Array.isArray(this.product.variants)) {
                
                // Check if quantity positive and variants are selected
                if (this.form.variants.length === this.product.variants.length && this.form.quantity >= 1) {
                    
                    // Set product details
                    const item = {
                        productId: this.product.pid,
                        quantity : this.form.quantity,
                        variants : this.form.variants
                    }

                    // Add to cart
                    await this.$store.dispatch('cart/addToCart', item)

                    // Run analytics tools
                    if (process.client) {
                        
                        // Snapchat Pixel
                        if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                            window.snaptr('track', 'ADD_CART',  { 
                                'price'      : this.getTotalPrice(true),
                                'currency'   : this.$store.state.settings.currency.code,
                                'description': this.productTitle,
                                'item_ids'   : [this.product.pid]
                            });
                        }

                        // Facebook Pixel
                        if (this.$store.state.settings.analytics.facebook_pixel_id) {
                            window._fbq('track', 'AddToCart', {
                                'value'       : this.getTotalPrice(true),
                                'currency'    : this.$store.state.settings.currency.code,
                                'content_name': this.productTitle,
                                'content_type': 'product',
                                'content_ids' : [this.product.pid]
                            })
                        }

                    }

                    // Stop loading
                    if (direct) {
                        this.loading.cart = false
                    }else{
                        this.loading.buy  = false
                    }

                    // Open basket
                    if (direct) {
                        this.$nuxt.$emit('open_shopping_cart')
                    }

                    // Success
                    return true

                }else{

                    // Check if quantity not positive number
                    if (!this.form.quantity > 0) {
                        
                        // Please select product quantity
                        this.$message(this.$t('t_please_select_product_quantity'), 'alert-octagon', 'info')

                        // Error
                        return false

                    } else {

                        // Please select product variants
                        this.$message(this.$t('t_please_select_product_options'), 'shopping', 'info')

                        // Error
                        return false

                    }

                }
                
            } else {
                
                // Product has not variants, check quantity
                if (!this.form.quantity > 0) {
                        
                    // Please select product quantity
                    this.$message(this.$t('t_please_select_product_quantity'), 'alert-decagram-outline', 'info')

                    // Error
                    return false

                }else{

                    // Set product details
                    const item = {
                        productId: this.product.product_id,
                        quantity : this.form.quantity,
                        variants : this.form.variants
                    }

                    // Add to cart
                    await this.$store.dispatch('cart/addToCart', item)

                    // Open basket
                    if (direct) {
                        this.$nuxt.$emit('open_shopping_cart')
                    }

                    // Fire Facebook Pixel
                    if (process.client) {

                        // Snapchat Pixel
                        if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                            window.snaptr('track', 'ADD_CART',  { 
                                'price'      : this.getTotalPrice(true),
                                'currency'   : this.$store.state.settings.currency.code,
                                'description': this.productTitle,
                                'item_ids'   : [this.product.pid]
                            });
                        }

                        // Facebook Pixel
                        if (this.$store.state.settings.analytics.facebook_pixel_id) {
                            window._fbq('track', 'AddToCart', {
                                'value'       : this.getTotalPrice(true),
                                'currency'    : this.$store.state.settings.currency.code,
                                'content_name': this.productTitle,
                                'content_type': 'product',
                                'content_ids' : [this.product.pid]
                            })
                        }
                    }

                }

            }

        },

        // Add product to wishlist
        async addToWishlist() {

            // Check if user logged in
            if (!this.$auth.loggedIn) {

                this.$message(this.$t('t_toast_login_to_add_wishlist'), 'alert-rhombus', 'info')

                return

            }

            // Loading
            this.loading.app = true

            // Send request to server
            await this.$axios.post('customer/favorites/options/create', {
                        id: this.product.id
                    })
                    .then(response => {

                        // Add to wishlist
                        this.inWishlist = true

                        // Run analytics tools
                        if (process.client) {
                            
                            // Snapchat Pixel
                            if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                window.snaptr('track', 'ADD_TO_WISHLIST',  { 
                                    'price'      : this.getTotalPrice(true),
                                    'currency'   : this.$store.state.settings.currency.code,
                                    'description': this.productTitle,
                                    'item_ids'   : [this.product.pid]
                                });
                            }

                            // Facebook Pixel
                            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                window._fbq('track', 'AddToWishlist', {
                                    'value'       : this.getTotalPrice(true),
                                    'currency'    : this.$store.state.settings.currency.code,
                                    'content_name': this.productTitle,
                                    'content_type': 'product',
                                    'content_ids' : [this.product.pid]
                                })
                            }

                        }

                    })
                    .catch(error => {

                        // Error
                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                    })
                    .finally(() => {
                        // Stop loading
                        this.loading.app = false
                    })

        },

        // Remove product from wishlist
        async removeFromWishlist() {

            // Check if user logged in
            if (!this.$auth.loggedIn) {

                return

            }

            // Loading
            this.loading.app = true

            // Send request to server
            await this.$axios.post('customer/favorites/options/delete', {
                        id: this.product.id
                    })
                    .then(response => {
                        
                        // Remove from wishlist
                        this.inWishlist = false

                    })
                    .catch(error => {

                        // Error
                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                    })
                    .finally(() => {
                        // Stop loading
                        this.loading.app = false
                    })

        },

        // Get youtube id
        youtubeId(url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match  = url.match(regExp);
            return (match&&match[7].length==11) ? match[7] : false;
        },

        // Vimeo Id
        vimeoId(url) {
            var m = url.match(/^.+vimeo.com\/(.*\/)?([^#\?]*)/);
            return m ? m[2] || m[1] : null;
        },

        // Check if variant selected
        isVariantSelected(variant, value) {
            
            // Find variant in form
            const exists = this.form.variants.find(item => {
                            return  item.variant_id === variant.id &&  item.variant_value === value.trim() && item.variant_name === variant.name && item.variant_type === variant.type
                        })

            // Check if exists
            return exists ? exists : false

        },

        // Related products next slider
        relatedNextSlider() {
            this.$refs.relatedProductsSwiper.$swiper.slideNext()
        },

        // Related products prev slider
        relatedPrevSlider() {
            this.$refs.relatedProductsSwiper.$swiper.slidePrev()
        },

        // Check if variant already exists
        isVariantExists(variant) {

            // Find variant in form
            let exists = this.form.variants.find(item => {
                return item.variant_id === variant.variant_id
            })

            // Check if variant already exists
            return exists ? exists : false

        },

        // Add product variant to cart
        addVariant(variant, value) {
            
            // Check if variant is radio
            if (variant.type === 'radio') {
                
                // Generate variant data
                let data  = { 
                    variant_id   : variant.id, 
                    variant_type : 'radio',
                    variant_name : variant.name,
                    variant_value: value.trim()
                }
                
                // Find variant in form
                let exists = this.isVariantExists(data)

                // Check if variant already exists
                if (exists) {

                    // Update variant value
                    for (let index = 0; index < this.form.variants.length; index++) {

                        const element = this.form.variants[index];

                        if (element.variant_id == exists.variant_id) {
                            element.variant_value = value.trim()
                            break;
                        }
                        
                    }
                    
                } else {

                    // Variant not exist in form
                    this.form.variants.push(data)

                }

            }

            // Check if variant is color
            if (variant.type === 'color') {
                
                // Generate variant data
                let data  = { 
                    variant_id   : variant.id, 
                    variant_type : 'color',
                    variant_name : variant.name,
                    variant_value: value.color
                }
                
                // Find variant in form
                let exists = this.isVariantExists(data)

                // Check if variant already exists
                if (exists) {

                    // Update variant value
                    for (let index = 0; index < this.form.variants.length; index++) {

                        const element = this.form.variants[index];

                        if (element.variant_id == exists.variant_id) {
                            element.variant_value = value.color
                            break;
                        }
                        
                    }
                    
                } else {

                    // Variant not exist in form
                    this.form.variants.push(data)

                }

            }

            // Run analytics tools
            if (process.client) {

                // Facebook Pixel
                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                    window._fbq('track', 'CustomizeProduct')
                }

            }

        },

        // Check if product is ready to make orders
        isReadyToOrder() {
            
            // Check if product has variants
            if (Array.isArray(this.product.variants)) {

                // Check if customer select product variants
                if (this.form.variants.length === this.product.variants.length) {

                    return true

                }else{

                    // Customer not yet select product variants
                    return false

                }
                
            }else{

                // Product has no variants, customer can make order
                return true

            }

        },

        // Increment order quantity
        incrementQuantity() {

            // Check if current quantity is a number
            if (Number(this.form.quantity)) {
                
                // Update quantity
                this.form.quantity += 1

            }else{

                // Current quantity is not a number
                this.form.quantity  = 1

            }

        },

        // Decrement order quantity
        decrementQuantity() {

            // Check if current quantity is a number
            if (Number(this.form.quantity)) {
                
                // Update quantity
                this.form.quantity -= 1

            }else{

                // Current quantity is not a number
                this.form.quantity  = 1

            }

        },

        // Get total price
        getTotalPrice(unformatted = false) {

            // Check if product has variants
            if (Array.isArray(this.product.variants) && Array.isArray(this.form.variants)) {
            
                // Check if selected form variants length = product variants length
                if (this.form.variants.length > 0 && this.product.variants.length > 0 && (this.form.variants.length === this.product.variants.length)) {

                    // Set current values
                    var values = []

                    // Loop through form variants
                    for (let v = 0; v < this.form.variants.length; v++) {

                        const element = this.form.variants[v];

                        // Add form value to list
                        values.push(element.variant_value)
                        
                    }

                    for (let a = 0; a < this.attributes.length; a++) {
                        const attribute = this.attributes[a];
                        
                        if (attribute.value.every(v => values.includes(v))) {
                            
                            // Update currenct form stock value
                            if (this.form.quantity > attribute.stock[0]) {
                                this.form.quantity = attribute.stock[0]
                            }

                            // Update product stock
                            this.product.stock   = attribute.stock[0]

                            // Update product SKU
                            this.product.barcode = attribute.sku[0]

                            if (unformatted) {
                                return attribute.price[0] * this.form.quantity
                            }

                            // We found the value return price
                            return this.$formatMoney( Number(attribute.price[0]) * Number(this.form.quantity) )

                            break

                        }
                        
                    }


                }else{

                    // Check if product has discount
                    if (this.product.discount_type && this.product.discount_value) {
                        // Money discount
                        if (this.product.discount_type === 'money') {
                            
                            // Calculate total price 
                            const total  = this.form.quantity * ( Number(this.product.price) - Number(this.product.discount_value) )

                            if (unformatted) {
                                return total
                            }

                            return this.$formatMoney(total)

                        } else if (this.product.discount_type === 'percentage') {

                            // Calculate total price 
                            const total  = this.form.quantity * ( Number(this.product.price) - Number( Number(this.product.price) * Number(this.product.discount_value) / 100 ) )

                            if (unformatted) {
                                return total
                            }

                            return this.$formatMoney(total)

                        }

                    }

                    // Not all variants selected yet, return general price
                    const total  = this.form.quantity * this.product.price

                    if (unformatted) {
                        return total
                    }

                    return this.$formatMoney(total)

                }

            } else {

                // Check if product has discount
                if (this.product.discount_type && this.product.discount_value) {
                    // Money discount
                    if (this.product.discount_type === 'money') {
                        
                        // Calculate total price 
                        const total  = this.form.quantity * ( Number(this.product.price) - Number(this.product.discount_value) )

                        if (unformatted) {
                            return total
                        }

                        return this.$formatMoney(total)

                    } else if (this.product.discount_type === 'percentage') {

                        // Calculate total price 
                        const total  = this.form.quantity * ( Number(this.product.price) - Number( Number(this.product.price) * Number(this.product.discount_value) / 100 ) )

                        if (unformatted) {
                            return total
                        }

                        return this.$formatMoney(total)

                    }

                }

                // Calculate total price 
                const total  = this.form.quantity * this.product.price

                if (unformatted) {
                    return total
                }

                return this.$formatMoney(total)

            }

        },

        // Open reviews
        openReviews() {
            EventBus.$emit('open::reviews::dialog')
        },

        // Open order by whatsapp
        whatsappOrderLink() {

            // Get phone number
            const phone = this.$store.state.settings.checkout.whatsapp_number

            // Set text
            const text  = this.$t('t_hello_i_want_to_purchase_product', { link: this.$clientIndex(`product/${ this.product.handler }`) })

            // Check if desktop
            if (this.$device.isDesktop) {
                // Return url
                return `https://web.whatsapp.com/send?phone=${ phone }&text=${ text }`
            }
            
            // Mobile url
            return `https://api.whatsapp.com/send?phone=${ phone }&text=${ text }`

        }

    },

    mounted() {

        let vm = this
        
        // Set empty array for variants attributes
        var variants_attributes = []
                
        // Loop through product variants attributes
        for (let a = 0; a < vm.product.variants_attributes.length; a++) {

            const element = vm.product.variants_attributes[a];
            
            const item    = Object.entries(JSON.parse(element.attributes))
            
            variants_attributes.push(Object.fromEntries(item))
            
        }

        // Set an empty array
        var list                 = []

        // Loop through variants attributes array
        for (let b = 0; b < variants_attributes.length; b++) {
            const element = variants_attributes[b];

            let t         = Object.assign({}, element)

            let s         = Object.values(t)

            let result    = {}

            s.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push(item[key]);
                })
            })

            list.push(result)
            
        }

        // Add attributes group
        for (let c = 0; c < list.length; c++) {

            const element = list[c];

            vm.attributes.push(element)
            
        }

        // Run analytics tools
        if (process.client) {
            
            // Snapchat Pixel
            if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                window.snaptr('track', 'VIEW_CONTENT',  { 
                    'price'      : this.getTotalPrice(true),
                    'currency'   : this.$store.state.settings.currency.code,
                    'description': this.productTitle,
                    'item_ids'   : [this.product.pid]
                });
            }

            // Facebook Pixel
            if (this.$store.state.settings.analytics.facebook_pixel_id) {
                window._fbq('track', 'PageView', {
                    'value'       : this.getTotalPrice(true),
                    'currency'    : this.$store.state.settings.currency.code,
                    'content_name': this.productTitle,
                    'content_type': 'product',
                    'content_ids' : [this.product.pid]
                })
            }

        }

    }
}
</script>