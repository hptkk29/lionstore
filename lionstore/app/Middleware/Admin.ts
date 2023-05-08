import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {

    /**
     * Check if admin connected
     * @param param0 
     * @param next 
     */
    public async handle ({ response, auth }: HttpContextContract, next: () => Promise<void>) {

        try {
        
            // Authenticate admin
            await auth.authenticate()

            // Set admin secret
            const id = 'zhA4mBwi5LDah7XBp9WICVdLyCSP7q8I'

            // Check if admin verified
            if (auth.user?.uid !== id) {
                
                // Not authenticated
                response.unauthorized('UNAUTHORIZED_ERROR')
                return

            }

        } catch (error) {
        
            // Not authenticated
            response.unauthorized('UNAUTHORIZED_ERROR')
            return

        }

        // code for middleware goes here. ABOVE THE NEXT CALL
        await next()
    }

}
