import CreateValidator from 'App/Validators/Admin/Countries/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'
import randomstring from 'randomstring'
import xss from 'xss'

export default class CreateController {

    /**
     * Create new country
     * @param param0 
     * @returns 
     */
    public async create({ request, response }: HttpContextContract) {

        // Validate form
        await request.validate(CreateValidator)

        // Create new country
        const country       = new Country()
        country.uid         = randomstring.generate()
        country.name        = xss(request.input('name'))
        country.code        = xss(request.input('code'))
        country.is_active   = request.input('is_active')
        await country.save()

        // Success
        return response.noContent()

    } 

}
