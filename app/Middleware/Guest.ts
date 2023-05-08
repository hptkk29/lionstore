import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class Guest {

    /**
     * Check if user authenticated
     * @param param0 
     * @param next 
     * @returns 
     */
    public async handle ({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {

        // Authenticate checking
        const authenticated = await auth.use('api')

        // Check if customer logged in
        if (authenticated.isAuthenticated) {
            // Error
            response.unauthorized(`Only guest user can access the route ${request.method()} ${request.url()}`)
            return
        }

        // Guest
        await next()
   
    }

}
