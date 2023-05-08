import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {

    /**
     * Get list of customers
     * @param param0 
     * @returns 
     */
    public async customers({ request, response }: HttpContextContract) {

        // Get current page
        const page      = request.input('page', 1)

        // Get customers
        const customers = await Customer
                                    .query()
                                    .orderBy('id', 'desc')
                                    .withScopes((scopes) => scopes.notAdmin())
                                    .paginate(page, 50)

        // Success
        return response.json(customers.toJSON())

    }

}