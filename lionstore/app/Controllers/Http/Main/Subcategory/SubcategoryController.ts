import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import Subcategory from 'App/Models/Subcategory'
import Product from 'App/Models/Product'

export default class SubcategoryController {

    /**
     * Get products in subcategory
     * @param param0 
     * @returns 
     */
    public async subcategory({ request, response }: HttpContextContract) {

        // Get current page
        const page            = request.input('page', 1)

        // Get subcategory
        const subcategory     = await Subcategory
                                        .query()
                                        .where('handler', request.input('handler'))
                                        .preload('translation', (builder) => {
                                            builder.select('subcategory_id', 'title', 'description')
                                        })
                                        .preload('ogimage', (builder) => {
                                            builder.select('id', 'uid', 'file_folder')
                                        })
                                        .preload('parent', (builder) => {
                                            builder
                                                .select('id', 'handler')
                                                .preload('translation', (query) => {
                                                    query.select('id', 'category_id', 'title')
                                                })
                                        })
                                        .preload('childcategories', (builder) => {
                                            builder
                                                .select('id', 'subcategory_id', 'icon_id', 'handler')
                                                .orderBy('id', 'asc')
                                                .preload('icon', (builder) => {
                                                    builder.select('id', 'uid', 'file_folder', 'file_name')
                                                })
                                                .preload('translation')
                                        })
                                        .select('id', 'parent_id', 'handler', 'og_image_id')
                                        .firstOrFail()

        // Check if request requires to load categories again
        if ( !Boolean(request.input('preload', false)) ) {

            // Get childcategories
            var childcategories = await Childcategory
                                            .query()
                                            .orderBy('handler', 'desc')
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'childcategory_id', 'title')
                                            }) as any

        } else {

            // No need to load them again
            var childcategories = [] as any

        }

        // Run a product query
        const query           = Product.query()

        // Get list of selected childcategories
        const childs          = request.input('childcategories', false)

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

        // Check if childcategories exists in request
        if (childs) {
            query.whereIn('childcategory_id', [childs])
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
                                            .where('subcategory_id', subcategory.id)
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
            results        : results.toJSON(),
            childcategories: childcategories,
            subcategory    : subcategory.toJSON()
        })

    }

}