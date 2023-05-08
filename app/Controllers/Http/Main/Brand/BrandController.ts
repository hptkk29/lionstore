import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import Subcategory from 'App/Models/Subcategory'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import Brand from 'App/Models/Brand'

export default class BrandController {

    /**
     * Get product in selected brand
     * @param param0 
     * @returns 
     */
    public async brand({ request, response }: HttpContextContract) {

        // Get current page
        const page            = request.input('page', 1)

        // Get brand
        const brand           = await Brand
                                        .query()
                                        .where('handler', request.input('handler'))
                                        .preload('translation', (builder) => {
                                            builder.select('brand_id', 'name', 'description')
                                        })
                                        .select('id', 'handler', 'logo_id')
                                        .firstOrFail()

        // Check if request requires to load categories again
        if ( !Boolean(request.input('preload', false)) ) {
            
            // Get parent categories
            var categories      = await Category
                                            .query()
                                            .orderBy('handler', 'desc')
                                            .select('id', 'handler')
                                            .preload('translation', (builder) => {
                                                builder.select('category_id', 'id', 'title')
                                            }) as any

            // Get subcatgeories
            var subcategories   = await Subcategory
                                            .query()
                                            .orderBy('handler', 'desc')
                                            .select('id', 'handler')
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'subcategory_id', 'title')
                                            }) as any

            // Get childcategories
            var childcategories = await Childcategory
                                            .query()
                                            .orderBy('handler', 'desc')
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'childcategory_id', 'title')
                                            }) as any

        } else {

            // No need to load them again
            var categories      = [] as any
            var subcategories   = [] as any
            var childcategories = [] as any

        }

        // Run a product query
        const query           = Product.query()

        // Get list of selected categories
        const cats            = request.input('categories', false)

        // Get list of selected subcatgeories
        const subs            = request.input('subcategories', false)

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

        // Check if categories exists in request
        if (cats) {
            query.whereIn('category_id', [cats])
        }

        // Check if subcategories exists in request
        if (subs) {
            query.whereIn('subcategory_id', [subs])
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
                                            .where('brand_id', brand.id)
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
            brand          : brand.toJSON(),
            results        : results.toJSON(),
            categories     : categories,
            subcategories  : subcategories,
            childcategories: childcategories,
        })

    }

}