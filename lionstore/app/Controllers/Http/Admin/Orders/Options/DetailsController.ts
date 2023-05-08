import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class DetailsController {

    /**
     * Get order details
     * @param param0 
     */
    public async details({ request, response }: HttpContextContract) {

        // Get order
        const order = await Order
                                .query()
                                .where('uid', request.input('id'))
                                .preload('payment')
                                .preload('customer')
                                .preload('invoice')
                                .preload('address', (builder) => {
                                    builder
                                        .preload('country')
                                })
                                .preload('products', (builder) => {
                                    builder
                                        .preload('product', (query) => {
                                            query
                                                .preload('thumbnail')
                                                .preload('translation')
                                                .preload('variants')
                                                .preload('variants_attributes')
                                        })
                                })
                                .preload('variants')
                                .firstOrFail()

        // Return order details
        return response.json(order.toJSON())

    }

}