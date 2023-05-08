import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {

    /**
     * Get latest orders
     * @param param0 
     * @returns 
     */
    public async orders({ request, response }: HttpContextContract) {

        // Get current page
        const page   = request.input('page', 1)

        // Get latest orders
        const orders = await Order
                                .query()
                                .preload('customer')
                                .preload('address', (builder) => {
                                    builder
                                        .preload('country')
                                })
                                .preload('products', (builder) => {
                                    builder.preload('product', (query) => {
                                        query.preload('thumbnail')
                                    })
                                })
                                .preload('variants', (builder) => {
                                    builder.preload('product')
                                })
                                .preload('payment')
                                .orderBy('id', 'desc')
                                .paginate(page, 50)
        
        // Return orders
        return response.json(orders.toJSON())

    }

}