import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressesController {

    /**
     * Get list of addresses
     * @param param0 
     * @returns 
     */
    public async addresses({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get currenct address
        const page      = request.input('page', 1)

        // Get customer addresses
        const addresses = await Address
                                    .query()
                                    .where('customer_id', auth.use('api').user!.id)
                                    .orderBy('id', 'desc')
                                    .preload('country')
                                    .paginate(page, 20)
        
        // Return
        return response.json(addresses)

    }

}
