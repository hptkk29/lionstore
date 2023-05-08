import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {

    /**
     * Get list of categories
     * @param param0 
     * @returns 
     */
    public async categories({ request, response }: HttpContextContract) {

        // Get current page
        const page       = request.input('page', 1)

        // Get list of categories
        const categories = await Category
                                    .query()
                                    .orderBy('id', 'desc')
                                    .withCount('childcategories')
                                    .withCount('subcategories')
                                    .preload('translation')
                                    .preload('ogimage')
                                    .preload('icon')
                                    .paginate(page, 50)

        // Success
        return response.json(categories.toJSON())

    }

}
