import RegisterValidator from 'App/Validators/Main/Auth/RegisterValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsAuth from 'App/Models/SettingsAuth'
import Verification from 'App/Models/Verification'
import Customer from 'App/Models/Customer'
import Event from '@ioc:Adonis/Core/Event'
import Hash from '@ioc:Adonis/Core/Hash'
import randomstring from 'randomstring'
import xss from 'xss'

export default class RegisterController {

    /**
     * Create new account
     * @param param0 
     * @returns 
     */
    public async register({ request, response, auth }: HttpContextContract) {

        // Validate form
        await request.validate(RegisterValidator)

        // Get auth settings
        const settings = await SettingsAuth.first()

        // Get password from request
        const password = request.input('password')

        // Check if email verification required
        if (settings?.verification_required) {
            
            // Create new customer
            const customer                 = new Customer()
                  customer.uid             = randomstring.generate(32)
                  customer.email           = xss(request.input('email'))
                  customer.username        = xss(request.input('username'))
                  customer.password        = await Hash.make(password)
                  customer.is_verified     = false
            await customer.save()

            // Generate new verification token
            const verification             = new Verification()
                  verification.customer_id = customer.id
                  verification.token       = randomstring.generate(64)
            await verification.save()

            // Send email to customer to verify his email address
            Event.emit('customer::verify::account', {
                customer    : customer.toJSON(),
                verification: verification.token
            })

            // Send email to admin
            Event.emit('admin::pending::customer', {
                customer    : customer.toJSON()
            })

            // Return response to customer
            return response.json({
                verification: true,
                email       : customer.email
            })

        } else {

            // No need for verification
            // Create new customer
            const customer    = new Customer()
            customer.uid      = randomstring.generate(32)
            customer.email    = xss(request.input('email'))
            customer.username = xss(request.input('username'))
            customer.password = await Hash.make(password)
            await customer.save()

            // Send welcome message
            Event.emit('customer::email::welcome', {
                customer: customer.toJSON()
            })

            // Generate token
            const token       = await auth.use('api').generate(customer, { expiresIn: '7days', ip_address: request.ip() })

            // Return token
            return response.json(token.toJSON())
        }

    }

}
