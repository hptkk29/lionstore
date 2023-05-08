import LoginValidator from 'App/Validators/Main/Auth/LoginValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginController {

    /**
     * Login to your account
     * @param param0 
     * @returns 
     */
     public async login({ request, response, auth }: HttpContextContract) {

        // Validate form
        await request.validate(LoginValidator)

        try {

            const email    = request.input('email')
            const password = request.input('password')

            // Get customer
            const customer = await Customer
                                        .query()
                                        .where('email', email)
                                        .first()

            // Check if customer exists
            if (customer) {
                
                // Verify password
                if (!(await Hash.verify(customer.password, password))) {
                    return response.unauthorized('INVALID_CREDENTIALS')
                }

                // Check if customer verified
                if (customer.is_verified) {
                    
                    // Validate credentials
                    const token = await auth.use('api').generate(customer, { expiresIn: '7days', ip_address: request.ip() })

                    // Return token
                    return response.json(token.toJSON())

                } else {

                    // Customer pending active
                    return response.json({
                        verification: true
                    })

                }

            } else {

                // No customer found
                return response.unauthorized('INVALID_CREDENTIALS')

            }

        } catch (error) {
            
            // Invalid credentials
            return response.unauthorized('INVALID_CREDENTIALS')

        }

    }

}
