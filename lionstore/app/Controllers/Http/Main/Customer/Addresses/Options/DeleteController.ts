import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class DeleteController {

    /**
     * Delete selected address
     * @param param0 
     * @returns 
     */
    public async remove({ request, response, auth }: HttpContextContract) {
        
        // Authenticate customer
        await auth.use('api').authenticate()

        // Get address
        const address = await Address
                                .query()
                                .where('uid', request.input('id'))
                                .where('customer_id', auth.use('api').user!.id)
                                .firstOrFail()

        // Delete address
        await address.delete()

        // Success
        return response.noContent()

    }

}
