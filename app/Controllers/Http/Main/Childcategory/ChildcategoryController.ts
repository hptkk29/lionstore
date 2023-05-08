import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import Product from 'App/Models/Product'

export default class ChildcategoryController {

    /**
     * Get products in childcategory
     * @param param0 
     * @returns 
     */
    public async childcategory({ request, response }: HttpContextContract) {

        // Get current page
        const page            = request.input('page', 1)

        // Get childcategory
        const childcategory   = await Childcategory
                                        .query()
                                        .where('handler', request.input('handler'))
                                        .preload('translation', (builder) => {
                                            builder.select('childcategory_id', 'title', 'description')
                                        })
                                        .preload('ogimage', (builder) => {
                                            builder.select('id', 'uid', 'file_folder')
                                        })
                                        .preload('subcategory', (builder) => {
                                            builder
                                                .select('id', 'handler')
                                                .preload('translation', (query) => {
                                                    query.select('id', 'subcategory_id', 'title')
                                                })
                                        })
                                        .preload('category', (builder) => {
                                            builder
                                                .select('id', 'handler')
                                                .preload('translation', (query) => {
                                                    query.select('id', 'title')
                                                })
                                        })
                                        .select('id', 'parent_id', 'subcategory_id', 'handler', 'og_image_id')
                                        .firstOrFail()

        // Run a product query
        const query           = Product.query()

        // Get sort by value
        const sort_by         = request.input('sort_by', false)

        // Get max price
        const max_price       = request.input('max_price', false)

        // Get min price
        const min_price       = request.input('min_price', false)

        // Check if max price exists
        if (max_price) {
            query.where('price', '<=', Number(max_price))
        }

        // Check if min price exists
        if (min_price) {
            query.where('price', '>=', Number(min_price))
        }

        // Check sort by value
        switch (sort_by) {

            // Top rated products
            case 'top_rated':
                query.orderBy('rating', 'desc')
                break;
            
            // New products first
            case 'newest':
                query.orderBy('id', 'desc')
                break;

            // Old products first
            case 'oldest':
                query.orderBy('id', 'asc')
                break;
            
            // Popular products
            case 'popular':
                query.orderBy('visits', 'desc')
                break;

            // Cheap price first
            case 'cheap_price':
                query.orderBy('price', 'asc')
                break;

            // High price first
            case 'high_price':
                query.orderBy('price', 'desc')
                break;
        
            default:
                query.orderBy('id', 'desc')
                break;
        }

        // Select products
        const results         =  await query
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
                                            .where('childcategory_id', childcategory.id)
                                            .where('is_active', true)
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'product_id', 'title')
                                            })
                                            .preload('thumbnail', (builder) => {
                                                builder.select('id', 'uid', 'file_folder')
                                            })
                                            .paginate(page, 20)

        // Success, now return data
        return response.json({
            results      : results.toJSON(),
            childcategory: childcategory.toJSON()
        })

    }

}