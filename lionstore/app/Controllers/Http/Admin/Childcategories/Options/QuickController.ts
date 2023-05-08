import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'

export default class CreateController {

    /**
     * Show/Hide childcategory from home page
     * @param param0 
     * @returns 
     */
    public async featured({ request, response }: HttpContextContract) {

        // Get childcategory
        const childcategory       = await Childcategory.findBy('id', request.input('id')) as any

        // Change featured status
        childcategory.is_featured = childcategory?.is_featured ? false : true
        await childcategory.save()

        // Success
        return response.noContent()

    }

}