import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wishlist from 'App/Models/Wishlist'
import Product from 'App/Models/Product'

export default class DeleteController {

    /**
     * remove product from favorites
     * @param param0 
     * @returns 
     */
    public async remove({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get product
        const product = await Product
                                .query()
                                .where('id', request.input('id'))
                                .where('is_active', true)
                                .firstOrFail()

        // Remove product from wishlist
        await Wishlist
                .query()
                .where('customer_id', auth.user?.id as any)
                .where('product_id', product.id)
                .delete()

        // Success
        return response.noContent()

    }

}