import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'

export default class ChildcategoriesController {

    /**
     * Get list of childcategories
     * @param param0 
     * @returns 
     */
    public async childcategories({ request, response }: HttpContextContract) {

        // Get current page
        const page       = request.input('page', 1)

        // Get list of childcategories
        const childcategories = await Childcategory
                                    .query()
                                    .orderBy('id', 'desc')
                                    .preload('category', (query) => {
                                        query.preload('translation')
                                    })
                                    .preload('subcategory', (query) => {
                                        query.preload('translation')
                                    })
                                    .preload('translation')
                                    .preload('ogimage')
                                    .preload('icon')
                                    .paginate(page, 50)

        // Success
        return response.json(childcategories.toJSON())

    }

}
