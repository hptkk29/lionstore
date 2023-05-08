import EditValidator from 'App/Validators/Admin/Countries/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import xss from 'xss'

export default class EditController {

    /**
     * Get country to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get country id
        const country_id = request.input('id')

        // Get country
        const country    = await Country
                                    .query()
                                    .where('uid', country_id)
                                    .firstOrFail()

        // Return country
        return response.json(country.toJSON())

    }


    /**
     * Update country
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Validate request
        await request.validate(EditValidator)

        // Get country id
        const id            = request.input('id')

        // Get country
        const country       = await Country
                                        .query()
                                        .where('id', id)
                                        .firstOrFail()

        // Update country
        country.name        = xss(request.input('name'))
        country.code        = xss(request.input('code'))
        country.is_active   = request.input('is_active')
        await country.save()

        // Success
        return response.noContent()

    }

}
