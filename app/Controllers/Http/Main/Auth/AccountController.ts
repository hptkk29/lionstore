import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountController {

    /**
     * Get profile
     * @param param0 
     * @returns 
     */
    public async account({ response, auth }: HttpContextContract) {

        try {

            // Authenticate customer
            await auth.use('api').authenticate()

            // Get customer
            const customer = auth.use('api').user!

            // Return data
            return response.json({
                id      : customer.uid,
                email   : customer.email,
                username: customer.username
            })

        } catch (error) {
            return response.status(403).send('ACCESS_DENIED')
        }

    }

}
