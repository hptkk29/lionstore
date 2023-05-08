import CreateValidator from 'App/Validators/Admin/Customers/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Customer from 'App/Models/Customer'
import Hash from '@ioc:Adonis/Core/Hash'

export default class CreateController {

    /**
     * Create new customer
     * @param param0 
     * @returns 
     */
    public async create({ request, response }: HttpContextContract) {

        // Validate request
        await request.validate(CreateValidator)

        // Create customer
        const customer             = new Customer()
              customer.uid         = string.generateRandom(32)
              customer.email       = request.input('email')
              customer.username    = request.input('username')
              customer.password    = await Hash.make(request.input('password'))
              customer.is_verified = request.input('is_verified', true)
        await customer.save()

        // Success
        return response.noContent()

    }

}