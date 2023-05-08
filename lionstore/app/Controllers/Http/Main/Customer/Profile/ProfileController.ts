import EditValidator from 'App/Validators/Main/Customer/Profile/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Hash from '@ioc:Adonis/Core/Hash'
import xss from 'xss'

export default class ProfileController {

    /**
     * Get customer profile
     * @param param0 
     * @returns 
     */
    public async edit({ response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get customer
        const customer = {
            id       : auth.use('api').user!.uid,
            username : auth.use('api').user!.username,
            email    : auth.use('api').user!.email,
            is_social: auth.use('api').user?.provider_name ? true : false
        }

        // Return customer details
        return response.json(customer)

    }


    /**
     * Update customer profile
     * @param param0 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Validate request
        await request.validate(EditValidator)

        // Get customer profile to update it
        const customer = await Customer
                                    .query()
                                    .where('id', auth.use('api').user!.id)
                                    .firstOrFail()

        // Check if customer registered from social media
        if (!customer.provider_name) {
            
            // Validate current password
            if (! await Hash.verify(customer.password, request.input('current_password'))) {
                
                // Incorrect password
                return response.unauthorized('WRONG_PASSWORD')

            }

        }

        
        // Update details
        customer.email    = xss(request.input('email'))
        customer.username = xss(request.input('username'))
        
        // Check for new password
        if (request.input('new_password')) {
            
            customer.password = await Hash.make(request.input('new_password'))

        }

        // Save profile
        await customer.save()

        // Success
        return response.noContent()

    }

}
