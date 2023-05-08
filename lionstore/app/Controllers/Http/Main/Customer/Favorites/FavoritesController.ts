import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Wishlist from 'App/Models/Wishlist'

export default class FavoritesController {

    /**
     * Get list of products in wishlist
     * @param param0 
     * @returns 
     */
    public async favorites({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get customer id
        const customerId = auth.user?.id as number

        // Get current page
        const page       = request.input('page', 1)

        // Get list of products in wishlist
        const wishlist   = await Wishlist
                                    .query()
                                    .where('customer_id', customerId)
                                    .preload('product', (builder) => {
                                        builder
                                            .preload('translation', (query) => {
                                                query.select('product_id', 'title')
                                            })
                                            .preload('thumbnail', (query) => {
                                                query.select('id', 'uid', 'file_folder')
                                            })
                                            .select('id', 'handler', 'media_small_id', 'stock', 'is_active')
                                    })
                                    .paginate(page, 20)

        // Return wishlist
        return response.json(wishlist.toJSON())

    }

}