import EditValidator from 'App/Validators/Admin/Customers/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Hash from '@ioc:Adonis/Core/Hash'

export default class EditController {

    /**
     * Get customer to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get customer id
        const id       = request.input('id')

        // Get customer
        const customer = await Customer
                                    .query()
                                    .where('uid', id)
                                    .withScopes((scopes) => scopes.notAdmin())
                                    .firstOrFail()

        // Success
        return response.json(customer.toJSON())

    }


    /**
     * Update customer
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Get customer
        const customer = await Customer
                                    .query()
                                    .withScopes((scopes) => scopes.notAdmin())
                                    .where('id', request.input('id'))
                                    .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Check if password change required
        if (request.input('password')) {
            customer.password = await Hash.make(request.input('password'))
        }

        // Update customer
        customer.email       = request.input('email')
        customer.username    = request.input('username')
        customer.is_verified = request.input('is_verified')
        await customer.save()

        // Success
        return response.noContent()

    }

}