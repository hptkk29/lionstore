import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'

export default class BrandsController {

    /**
     * Get list of brands
     * @param param0 
     * @returns 
     */
    public async brands({ request, response }: HttpContextContract) {

        // Get current page
        const page   = request.input('page', 1)

        // Get list of brands
        const brands = await Brand
                                .query()
                                .orderBy('handler', 'asc')
                                .preload('logo')
                                .preload('translation')
                                .paginate(page, 50)

        // Success
        return response.json(brands.toJSON())

    }

}
