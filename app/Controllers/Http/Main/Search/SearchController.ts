import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchHistory from 'App/Models/SearchHistory'
import Childcategory from 'App/Models/Childcategory'
import Subcategory from 'App/Models/Subcategory'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import randomstring from 'randomstring'
import Brand from 'App/Models/Brand'
import Ws from 'App/Services/Ws'
import xss from 'xss'

export default class SearchController {

    /**
     * Search for product live
     * Search form results
     * @param param0 
     */
    public async ajax({ request, response }: HttpContextContract) {

        try {

            // Get search query
            const keyword  = xss(request.input('q'))

            // Get products
            const products = await Product
                                        .query()
                                        .where('tags', 'like', `%${keyword}%`)
                                        .orWhere('handler', 'like', `%${keyword}%`)
                                        .whereHas('translation', (builder) => {
                                            builder.where('title', 'like', `%${keyword}%`)
                                            builder.orWhere('description_ar', 'like', `%${keyword}%`)
                                            builder.orWhere('description_az', 'like', `%${keyword}%`)
                                            builder.orWhere('description_cn', 'like', `%${keyword}%`)
                                            builder.orWhere('description_de', 'like', `%${keyword}%`)
                                            builder.orWhere('description_en', 'like', `%${keyword}%`)
                                            builder.orWhere('description_es', 'like', `%${keyword}%`)
                                            builder.orWhere('description_fr', 'like', `%${keyword}%`)
                                            builder.orWhere('description_hi', 'like', `%${keyword}%`)
                                            builder.orWhere('description_hu', 'like', `%${keyword}%`)
                                            builder.orWhere('description_jp', 'like', `%${keyword}%`)
                                            builder.orWhere('description_nl', 'like', `%${keyword}%`)
                                            builder.orWhere('description_po', 'like', `%${keyword}%`)
                                            builder.orWhere('description_pt', 'like', `%${keyword}%`)
                                            builder.orWhere('description_ro', 'like', `%${keyword}%`)
                                            builder.orWhere('description_ru', 'like', `%${keyword}%`)
                                            builder.orWhere('description_th', 'like', `%${keyword}%`)
                                            builder.orWhere('description_tr', 'like', `%${keyword}%`)
                                            builder.orWhere('description_ua', 'like', `%${keyword}%`)
                                        })
                                        .select(
                                            'id',
                                            'handler',
                                            'price',
                                            'purchase_unit',
                                            'discount_type',
                                            'discount_value',
                                            'media_small_id',
                                            'category_id',
                                            'subcategory_id',
                                            'childcategory_id'
                                        )
                                        .preload('translation')
                                        .preload('thumbnail', (builder) => {
                                            builder.select('id', 'uid', 'file_folder', 'file_name')
                                        })
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
                                        .limit(10)
                                        
            // Get tags
            const tags     = await Product
                                        .query()
                                        .where('tags', 'like', `%${keyword}%`)
                                        .select('tags')
                                        .limit(20)
            
            // Get similar brands
            const brands   = await Brand
                                        .query()
                                        .where('handler', 'like', `%${keyword}%`)
                                        .orWhereHas('translation', (builder) => {
                                            builder
                                                .where('name', 'like', `%${keyword}%`)
                                                .orWhere('description', 'like', `%${keyword}%`)
                                        })
                                        .preload('translation')
                                        .select('id', 'handler')
                                        .limit(10)

            // Get tags
            const serializeTags = this.tags(tags)
            
            // Fire the event
            Ws.io.emit('live::search', { 
                products: products,
                tags    : serializeTags,
                brands  : brands
            })

            // Success
            return response.noContent()

        } catch (error) {
            console.log(error)
        }

    }


    /**
     * Search for products
     * By keywords
     * @param param0 
     */
    public async results({ request, response }: HttpContextContract) {

        // Get search keyword
        const keyword = xss(request.input('q'))

        // Get current page
        const page    = request.input('page', 1)

        // Check if keyword lenght less than 60 characters
        if (page === 1 && typeof keyword === 'string' && keyword.length <= 60) {
            
            // Save search keyword
            await this.saveKeyword(keyword)

        }

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

            // Get brands
            var brands          = await Brand
                                            .query()
                                            .orderBy('handler', 'desc')
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'brand_id', 'name')
                                            }) as any

        } else {

            // No need to load them again
            var categories      = [] as any
            var subcategories   = [] as any
            var childcategories = [] as any
            var brands          = [] as any

        }

        // Run a product query
        const query           = Product.query()

        // Match title and description
        query
            .orWhereHas('translation', (builder) => {
                builder.where('title', 'like', `%${keyword}%`)
                builder.orWhere('description_ar', 'like', `%${keyword}%`)
                builder.orWhere('description_az', 'like', `%${keyword}%`)
                builder.orWhere('description_cn', 'like', `%${keyword}%`)
                builder.orWhere('description_de', 'like', `%${keyword}%`)
                builder.orWhere('description_en', 'like', `%${keyword}%`)
                builder.orWhere('description_es', 'like', `%${keyword}%`)
                builder.orWhere('description_fr', 'like', `%${keyword}%`)
                builder.orWhere('description_hi', 'like', `%${keyword}%`)
                builder.orWhere('description_hu', 'like', `%${keyword}%`)
                builder.orWhere('description_jp', 'like', `%${keyword}%`)
                builder.orWhere('description_nl', 'like', `%${keyword}%`)
                builder.orWhere('description_po', 'like', `%${keyword}%`)
                builder.orWhere('description_pt', 'like', `%${keyword}%`)
                builder.orWhere('description_ro', 'like', `%${keyword}%`)
                builder.orWhere('description_ru', 'like', `%${keyword}%`)
                builder.orWhere('description_th', 'like', `%${keyword}%`)
                builder.orWhere('description_tr', 'like', `%${keyword}%`)
                builder.orWhere('description_ua', 'like', `%${keyword}%`)
            })
            .orWhere('tags', 'like', `%${keyword}%`)

        // Get list of selected categories
        const cats            = request.input('categories', false)

        // Get list of selected subcatgeories
        const subs            = request.input('subcategories', false)

        // Get list of selected childcategories
        const childs          = request.input('childcategories', false)

        // Get brand
        const brand           = request.input('brands', false)

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

        // Check if brand exists in request
        if (brand) {
            query.whereIn('brand_id', [brand])
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
                                            .where('is_active', true)
                                            .preload('translation', (builder) => {
                                                builder.select('id', 'product_id', 'title')
                                            })
                                            .preload('thumbnail', (builder) => {
                                                builder.select('id', 'uid', 'file_folder')
                                            })
                                            .paginate(page, 20)
        // Return data
        return response.json({
            categories     : categories,
            subcategories  : subcategories,
            childcategories: childcategories,
            brands         : brands,
            results        : results
        })

    }


    /**
     * Save new search keyword
     * @param keyword 
     */
    public async saveKeyword(keyword) {

        // Get keyword if its already exists
        const search = await SearchHistory
                                .query()
                                .where('keyword', keyword)
                                .first()

        // Check if keyword exists
        if (search) {
            
            // Update keyword counter
            search.counter = Number(search.counter) + Number(1)
            await search.save()

        } else {

            // Save new search keyword
            const history         = new SearchHistory()
                  history.uid     = randomstring.generate(32)
                  history.keyword = keyword
                  history.counter = 1
            await history.save()

        }

    }



    /**
     * Get tags as keywords
     * @param tags 
     * @returns 
     */
     public tags(tags) {
        try {
            
            // Set empty variable
            var data = []

            for (let index = 0; index < tags.length; index++) {
                const tag = tags[index];
                data.push(tag.tags as never)
            }

            var duplicate = []

            for (let index = 0; index < data.length; index++) {
                const element = data[index] as string
                duplicate.push(element.split(',') as never)
            }

            var merged = [].concat.apply([], duplicate);

            return [...new Set(merged)]

        } catch (error) {
            return tags
        }
    }

}