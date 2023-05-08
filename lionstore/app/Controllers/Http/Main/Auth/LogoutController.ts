import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {

    /**
     * Logout customer
     * @param param0 
     * @returns 
     */
    public async logout({ response, auth }: HttpContextContract) {

        // Delete token and logout
        await auth.use('api').revoke()

        // Success
        return response.noContent()

    }

}
