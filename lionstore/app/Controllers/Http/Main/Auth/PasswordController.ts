import UpdateValidator from 'App/Validators/Main/Auth/Password/UpdateValidator'
import ResetValidator from 'App/Validators/Main/Auth/Password/ResetValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordToken from 'App/Models/PasswordToken'
import Customer from 'App/Models/Customer'
import Event from '@ioc:Adonis/Core/Event'
import Hash from '@ioc:Adonis/Core/Hash'
import randomstring from 'randomstring'
import moment from 'moment'
import xss from 'xss'

export default class PasswordController {

    /**
     * Send customer a password link reset email
     * @param param0 
     * @returns 
     */
    public async reset({ request, response }: HttpContextContract) {

        // Validate form
        await request.validate(ResetValidator)

        try {
            
            // Get email address
            const email    = xss(request.input('email'))

            // Get customer
            const customer = await Customer
                                        .query()
                                        .where('email', email)
                                        .where('is_verified', true)
                                        .first()

            // Check if customer exists
            if (customer) {

                // Generate password reset token
                const token = randomstring.generate({ length: 64, charset: 'alphanumeric', capitalization: 'uppercase' })

                // Insert token in database
                await PasswordToken.create({
                    token: token,
                    email: email,
                    ip   : request.ip()
                })

                // Send email to customer
                Event.emit('main::reset::password', { customer: customer.toJSON(), token: token, email: email })

                // Success
                return response.noContent()

            } else {

                // No user found
                return response.noContent()

            }

        } catch (e) {
            console.log(e)
        }

    }


    /**
     * Verify password reset token
     * @param param0 
     * @returns 
     */
    public async verify({ request, response }: HttpContextContract) {

        // Check if token valid
        const token     = await PasswordToken
                                    .query()
                                    .where('token', xss(request.input('token')))
                                    .where('email', xss(request.input('email')))
                                    .firstOrFail()
                   
        // Check if token expired
        const isExpired = moment()
                            .subtract(60, 'minutes')
                            .isAfter( moment(token.toJSON().created_at) )
                                 
        // Token expired
        if (isExpired) {
            
            return response.unauthorized('PASSWORD_TOKEN_EXPIRED')
            
        } else {
            
            // Token is valid 
            return response.json({
                email: token.email,
                token: token.token
            })

        }

    }


    /**
     * Update customer token
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Validate form
        await request.validate(UpdateValidator)

        // Check token
        const token     = await PasswordToken
                                    .query()
                                    .where('token', xss(request.input('token')))
                                    .where('email', xss(request.input('email')))
                                    .firstOrFail()

        // Check if token expired
        const isExpired = moment()
                            .subtract(60, 'minutes')
                            .isAfter( moment(token.toJSON().created_at) )

        // Token expired
        if (isExpired) {
            
            return response.unauthorized('PASSWORD_TOKEN_EXPIRED')

        } else {

            // Token is valid, update customer password
            await Customer
                        .query()
                        .where('email', token.email)
                        .update({
                            password: await Hash.make(request.input('password'))
                        })

            // Delete token
            await token.delete()
            
            // Notify customer that his password updated
            Event.emit('customer::password::updated', { email: token.email })

            // Password changed
            return response.noContent()
            
        }

    }

}
