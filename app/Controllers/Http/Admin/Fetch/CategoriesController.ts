import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import Subcategory from 'App/Models/Subcategory'
import Category from 'App/Models/Category'

export default class CategoriesController {

    /**
     * Fetch all parent categories
     * @param param0 
     * @returns 
     */
    public async categories({ response }: HttpContextContract) {

        // Get all parent categories
        const categories = await Category
                                    .query()
                                    .preload('translation')
                                    .orderBy('handler', 'asc')

        // Return categories
        return response.json(categories)

    }

    
    /**
     * Fetch subcategories in parent category
     * @param param0 
     * @returns 
     */
    public async subcategories({ request, response }: HttpContextContract) {

        // Get parent category id from request
        const id            = request.input('id')

        // Get all subcategories
        const subcategories = await Subcategory
                                        .query()
                                        .where('parent_id', id)
                                        .preload('translation')

        // Return subcategories
        return response.json(subcategories)

    }


    /**
     * Fetch childcategories in subcategory
     * @param param0 
     * @returns 
     */
     public async childcategories({ request, response }: HttpContextContract) {

        // Get subcategory id from request
        const id              = request.input('id')

        // Get all childcategories
        const childcategories = await Childcategory
                                        .query()
                                        .where('subcategory_id', id)
                                        .preload('translation')

        // Return childcategories
        return response.json(childcategories)

    }

}
