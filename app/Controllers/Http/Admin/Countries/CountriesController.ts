import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'

export default class CountriesController {

    /**
     * Get list of countries
     * @param param0 
     * @returns 
     */
    public async countries({ request, response }: HttpContextContract) {

        // Get page
        const page      = request.input('page', 1)

        // Get countries
        const countries = await Country
                                    .query()
                                    .orderBy('name', 'asc')
                                    .paginate(page, 50)

        // Success
        return response.json(countries)

    }

}
