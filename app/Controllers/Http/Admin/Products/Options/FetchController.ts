import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Brand from 'App/Models/Brand'

export default class FetchController {

    /**
     * Pre-fetch data to create a product
     * @param param0 
     * @returns 
     */
    public async fetch({ response }: HttpContextContract) {

        // Fetch all categories
        const categories = await Category
                                    .query()
                                    .preload('translation')
                                    .orderBy('handler', 'asc')

        // Fetch brands
        const brands     = await Brand
                                    .query()
                                    .preload('translation')
                                    .preload('logo')
                                    .orderBy('handler', 'asc')

        // Return data
        return response.json({
            categories: categories,
            brands    : brands
        })

    }

}