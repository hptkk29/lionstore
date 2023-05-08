import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wishlist from 'App/Models/Wishlist'
import Product from 'App/Models/Product'

export default class CreateController {

    /**
     * Add product to favorites
     * @param param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get product
        const product = await Product
                                .query()
                                .where('id', request.input('id'))
                                .where('is_active', true)
                                .firstOrFail()

        // Add product to wishlist
        await Wishlist.firstOrCreate(
            { customer_id: auth.user?.id, product_id: product.id }, 
            { customer_id: auth.user?.id, product_id: product.id }
        )

        // Success
        return response.noContent()

    }

}