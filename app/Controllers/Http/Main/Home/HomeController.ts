import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import FlashDeal from 'App/Models/FlashDeal'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import Slider from 'App/Models/Slider'

export default class HomeController {

    /**
     * Get home page data
     * @param param0 
     * @returns 
     */
    public async home({ response }: HttpContextContract) {

        // Get catgeories with subcategories and childcategories
        // We will show these in home page (Mega Menu)
        const categories           = await Category
                                            .query()
                                            .select( 'id', 'icon_id', 'handler')
                                            .orderBy('id', 'asc')
                                            .preload('translation')
                                            .preload('icon', (builder) => {
                                                builder.select('id', 'uid', 'file_folder', 'file_name')
                                            })
                                            .preload('subcategories', (builder) => {
                                                builder
                                                    .select('id', 'parent_id', 'icon_id', 'handler')
                                                    .orderBy('id', 'asc')
                                                    .preload('icon', (builder) => {
                                                        builder.select('id', 'uid', 'file_folder', 'file_name')
                                                    })
                                                    .preload('translation')
                                                    .preload('childcategories', (query) => {
                                                        query.select(
                                                            'id',
                                                            'parent_id',
                                                            'subcategory_id',
                                                            'icon_id',
                                                            'handler'
                                                        )
                                                        .orderBy('id', 'asc')
                                                        .preload('icon', (builder) => {
                                                            builder.select('id', 'uid', 'file_folder', 'file_name')
                                                        })
                                                        .preload('translation')
                                                    })
                                            })

        // Get flash deals
        // You can add flash deals by going to products page in Dashboard
        const flash_deals          = await FlashDeal
                                                .query()
                                                .preload('product', (builder) => {
                                                    builder
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
                                                        .preload('translation')
                                                        .preload('thumbnail', (builder) => {
                                                            builder.select('id', 'uid', 'file_folder', 'file_name')
                                                        })
                                                        .orderByRaw('RAND()')
                                                })
                                                .limit(40)

        // Get home sliders
        const sliders              = await Slider
                                            .query()
                                            .orderBy('id', 'desc')
                                            .select('id', 'desktop_slider_id', 'mobile_slider_id', 'link_type', 'link_value')
                                            .preload('desktopSlider', (builder) => {
                                                builder.select('id', 'uid', 'file_folder', 'file_name')
                                            })
                                            .preload('mobileSlider', (builder) => {
                                                builder.select('id', 'uid', 'file_folder', 'file_name')
                                            })
        
        // Get categories in home
        const categoriesInHome     = await Childcategory
                                            .query()
                                            .where('is_featured', true)
                                            .select('id', 'parent_id', 'subcategory_id', 'handler', 'is_featured')
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
                                            .orderByRaw('RAND()')
        
        // Set empty var for categories with products
        var categoriesWithProducts = []
        
        // Loop trough categories in home
        for (let index = 0; index < categoriesInHome.length; index++) {

            const category           = categoriesInHome[index];
            
            // Get products in this category
            const productsInCategory = await Product
                                                .query()
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
                                                .where('childcategory_id', category.id)
                                                .where('is_active', true)
                                                .preload('translation')
                                                .preload('thumbnail', (builder) => {
                                                    builder.select('id', 'uid', 'file_folder', 'file_name')
                                                })
                                                .orderByRaw('RAND()')
            
            // Set catgeory and products
            const item = {
                category: category,
                products: productsInCategory
            }

            // Add item to categories with products
            categoriesWithProducts.push(item as never)
            
        }
        
        // Return data
        return response.json({
            categories            : categories,
            flash_deals           : flash_deals,
            sliders               : sliders,
            categoriesWithProducts: categoriesWithProducts
        })

    }

}
