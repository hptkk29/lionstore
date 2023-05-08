import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subcategory from 'App/Models/Subcategory'

export default class SubcategoriesController {

    /**
     * Get list of subcategories
     * @param param0 
     * @returns 
     */
    public async subcategories({ request, response }: HttpContextContract) {

        // Get current page
        const page       = request.input('page', 1)

        // Get list of subcategories
        const subcategories = await Subcategory
                                    .query()
                                    .orderBy('id', 'asc')
                                    .withCount('childcategories')
                                    .preload('translation')
                                    .preload('ogimage')
                                    .preload('icon')
                                    .preload('parent', (query) => {
                                        query.preload('translation')
                                    })
                                    .paginate(page, 50)

        // Success
        return response.json(subcategories.toJSON())

    }

}
