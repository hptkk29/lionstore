import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const NodeGoogleLogin = require('node-google-login')
import SettingsAuth from 'App/Models/SettingsAuth'
import Customer from 'App/Models/Customer'
import randomstring from 'randomstring'
import Env from '@ioc:Adonis/Core/Env'

export default class GoogleController {

    /**
     * Redirect google login
     * @param param0 
     * @returns 
     */
    public async redirect({ response }: HttpContextContract) {
        try {
            
            // Get auth settings
            const settings = await SettingsAuth.first()

            // Check if google login enabled
            if (settings?.enable_google_login) {
                
                // Set google config
                const config      = {
                    clientID    : settings.google_client_id,
                    clientSecret: settings.google_secret_id,
                    redirectURL : `${ Env.get('APP_URL') }/auth/google/callback`,
                    defaultScope: [
                      'https://www.googleapis.com/auth/userinfo.email',
                      'https://www.googleapis.com/auth/userinfo.profile',
                    ]
                }

                // Set google login
                const googleLogin = new NodeGoogleLogin(config);

                // Generate Auth URL
                const authURL     = googleLogin.generateAuthUrl()

                // Return auth url
                return response.json(authURL)

            } else {

                // Not enabled
                return response.badRequest()

            }

        } catch (error) {
            console.log(error)
            return response.badRequest(error)
        }
    }


    /**
     * Get user profile
     * @param param0 
     * @returns 
     */
    public async callback({ request, response, auth }: HttpContextContract) {
        try {
            
            // Get auth settings
            const settings    = await SettingsAuth.first()

            // Set google config
            const config      = {
                clientID    : settings?.google_client_id,
                clientSecret: settings?.google_secret_id,
                redirectURL : `${ Env.get('APP_URL') }/auth/google/callback`,
                defaultScope: [
                  'https://www.googleapis.com/auth/userinfo.email',
                  'https://www.googleapis.com/auth/userinfo.profile',
                ]
            }

            // Set google login
            const googleLogin = new NodeGoogleLogin(config);

            // Get code from request
            const code        = request.input('code')

            // Get google user profile
            const user        = await googleLogin
                                            .getUserProfile(code)
                                            .then(async profile => {

                                                // Create new customer
                                                const customer = await this.create(profile.user)

                                                // Generate token
                                                const token    = await auth.use('api').generate(customer, { expiresIn: '7days', ip_address: request.ip() })

                                                // Return token
                                                return {
                                                    success: true,
                                                    token  : token.toJSON()
                                                }
                                                
                                            })
                                            .catch(error => {
                                                return {
                                                    success: false,
                                                    message: error
                                                }
                                            })

            // Check if authenticating succeeded
            if (user.success) {
                
                // Success
                return response.json(user.token)

            } else {
                
                // Error
                return response.badRequest(user.message)

            }

        } catch (error) {
            console.log(error)
            return response.badRequest(error)
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
                provider_name: 'google',
                provider_id  : profile.sub
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
