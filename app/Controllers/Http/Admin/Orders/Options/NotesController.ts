import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class NotesController {

    /**
     * update order details
     * @param param0 
     * @returns 
     */
    public async notes({ request, response }: HttpContextContract) {

        // Get order
        const order        = await Order
                                        .query()
                                        .where('id', request.input('id'))
                                        .preload('products')
                                        .preload('payment')
                                        .preload('address', (builder) => {
                                            builder.preload('country')
                                        })
                                        .firstOrFail()

        // Update order
        order.order_notes  = request.input('notes')
        await order.save()

        // Success
        return response.noContent()

    }

}