import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {

    /**
     * Get latest products
     * @param param0 
     * @returns 
     */
    public async products({ request, response }: HttpContextContract) {

        // Get page
        const page     = request.input('page', 1)

        // Get products
        const products = await Product
                                .query()
                                .orderBy('id', 'desc')
                                .preload('brand', (query) => {
                                    query.preload('translation')
                                })
                                .preload('category', (query) => {
                                    query.preload('translation')
                                })
                                .preload('childcategory', (query) => {
                                    query.preload('translation')
                                })
                                .preload('subcategory', (query) => {
                                    query.preload('translation')
                                })
                                .preload('thumbnail')
                                .preload('translation')
                                .preload('flashDeal')
                                .paginate(page, 50)

        // Return products
        return response.json(products.toJSON())

    }

}