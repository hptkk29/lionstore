import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class DeliveredController {

    /**
     * Cancel order
     * @param param0 
     */
    public async delivered({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get order id
        const orderId      = request.input('id')

        // Get order
        const order        = await Order
                                        .query()
                                        .where('uid', orderId)
                                        .where('order_status', 'shipped')
                                        .preload('products')
                                        .preload('payment')
                                        .preload('address', (builder) => {
                                            builder.preload('country')
                                        })
                                        .preload('customer')
                                        .firstOrFail()

        // Generate date for delivered
        const delivered_at = moment().format('YYYY-MM-DD HH:mm:ss')

        // Update order
        order.order_status = 'delivered'
        order.delivered_at = delivered_at as any
        await order.save()

        // Send sms to customer
        await Sms.delivered(order.toJSON())

        // Send notification to customer
        if (order.customer) {
            Event.emit('customer::order::delivered', { order: order.toJSON() })
        }

        // Success
        return response.noContent()

    }

}