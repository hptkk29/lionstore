import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsAuth from 'App/Models/SettingsAuth'
import Customer from 'App/Models/Customer'
import randomstring from 'randomstring'
import axios from 'axios'

export default class FacebookController {

    /**
     * Handle Facebook login callback
     * @param param0 
     * @returns 
     */
    public async facebook({ request, response, auth }: HttpContextContract) {

        // Get authentication settings
        const settings = await SettingsAuth.first()

        // Check if facebook login enabled
        if (settings?.enable_facebook_login) {
            
            try {
                
                // Get access token
                const access_token = request.input('access_token')

                // Set Facebook request url
                const url          = `https://graph.facebook.com/me?fields=email,name&access_token=${ access_token }`

                // Request user profile
                await axios
                        .get(url)
                        .then(async (res) => {

                            // Create new customer
                            const customer = await this.create(res.data)

                            // Generate token
                            const token    = await auth.use('api').generate(customer, { expiresIn: '7days', ip_address: request.ip() })

                            // Return token
                            return response.json(token.toJSON())

                        })
                        .catch(error => {
                            return response.badRequest(error)
                        })

            } catch (error) {
                
                // Something went wrong
                return response.badRequest(error)

            }

        } else {

            // Facebook login not enabled
            return response.badRequest()

        }

    }


    /**
     * Get or create new customer
     * @param profile 
     * @returns 
     */
    public async create(profile) {

        // Create new customer
        const customer = await Customer.firstOrCreate(
            {
                provider_name: 'facebook',
                provider_id  : profile.id
            },
            {
                uid          : randomstring.generate(32),
                username     : `${ profile.name.replace(/\s/g, '_') }_${ randomstring.generate({ length: 4, charset: 'numeric' }) }`,
                email        : profile.email,
                is_verified  : true
            }
        )

        // Return customer
        return customer

    }

}
