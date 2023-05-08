import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from "@ioc:Adonis/Core/Event";
import Wishlist from 'App/Models/Wishlist';
import Product from 'App/Models/Product'
import xss from "xss";

export default class HomeController {

    /**
     * Get product
     * @param param0 
     * @returns 
     */
    public async product({ request, response, auth }: HttpContextContract) {

        // Get product
        const product    = await Product
                                    .query()
                                    .where('handler', xss(request.input('handler')))
                                    .where('is_active', true)
                                    .select(
                                        'id',
                                        'uid',
                                        'pid',
                                        'media_medium_id',
                                        'is_product_zoomer',
                                        'handler',
                                        'tags',
                                        'stock',
                                        'video_provider',
                                        'video_link',
                                        'discount_type',
                                        'discount_value',
                                        'category_id',
                                        'subcategory_id',
                                        'childcategory_id',
                                        'rating',
                                        'brand_id',
                                        'price',
                                        'purchase_unit',
                                        'shipping_type',
                                        'shipping_cost',
                                        'product_barcode',
                                    )
                                    .preload('translation')
                                    .preload('category', (builder) => {
                                        builder
                                            .select('id', 'handler')
                                            .preload('translation')
                                    })
                                    .preload('subcategory', (builder) => {
                                        builder
                                            .select('id', 'handler')
                                            .preload('translation')
                                    })
                                    .preload('childcategory', (builder) => {
                                        builder
                                            .select('id', 'handler')
                                            .preload('translation')
                                    })
                                    .preload('preview', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .preload('gallery', (builder) => {
                                        builder
                                            .select(
                                                'id',
                                                'product_id',
                                                'large_images',
                                                'medium_images',
                                                'small_images'
                                            )
                                    })
                                    .preload('brand', (builder) => {
                                        builder
                                            .preload('logo', (query) => {
                                                query.select('id', 'uid', 'file_folder')
                                            })
                                            .preload('translation', (query) => {
                                                query.select('id', 'brand_id', 'name')
                                            })
                                    })
                                    .preload('flashDeal')
                                    .preload('seo')
                                    .preload('variants')
                                    .preload('variants_attributes')
                                    .withCount('reviews', (builder) => {
                                        builder.where('is_active', true)
                                    })
                                    .firstOrFail()

        // Fire product tracking event
        Event.emit('product::track', {
            productId : product.id,
            ipAddress : request.ip(),
            userAgent : request.header('User-Agent'),
            acceptLang: request.header('Accept-Language'),
            referer   : request.header('Referer'),
            requestUrl: request.url()
        })

        // Get similar products
        const similar    = await Product
                                    .query()
                                    .whereHas('seo', (builder) => {
                                        builder.where('title', 'like', `%${product.seo.title}%`)
                                                .orWhere('description', 'like', `%${product.seo.description}%`)
                                    })
                                    .orWhere('tags', 'like', `%${product.tags}%`)
                                    .orWhere('category_id', product.category_id)
                                    .orWhere('subcategory_id', product.subcategory_id)
                                    .orWhere('childcategory_id', product.childcategory_id)
                                    .orWhere('handler', 'like', `%${product.handler}%`)
                                    .select(
                                        'id',
                                        'media_small_id',
                                        'handler',
                                        'rating',
                                        'price',
                                        'purchase_unit',
                                        'shipping_type',
                                        'discount_type',
                                        'discount_value'
                                    )
                                    .where('is_active', true)
                                    .where('id', '!=', product.id)
                                    .preload('translation')
                                    .preload('thumbnail', (builder) => {
                                        builder.select('id', 'uid', 'file_folder', 'file_name')
                                    })
                                    .orderByRaw('RAND()')
                                    .limit(40)

        // Check if this product in customer's wishlist or not
        try {
            
            await auth.use('api').authenticate()

            var inWishlist = await this.inWishlist(product.id, auth.user?.id) as any

        } catch (error) {
            
            // Customer not authenticated
            var inWishlist = false as any

        }

        // Return all product data
        return response.json({
            product   : product,
            similar   : similar,
            inWishlist: inWishlist
        })

    }



    /**
     * Check if this product in customer's wishlist
     * @param id 
     * @param auth 
     * @returns 
     */
    public async inWishlist(id, customerId) {
            
        // Check if product in wishlist
        const wishlist = await Wishlist
                                    .query()
                                    .where('customer_id', customerId)
                                    .where('product_id', id)
                                    .first()
        
        // Return True / False if product IN/NOT IN customer's wishlist
        return wishlist ? true : false

    }

}