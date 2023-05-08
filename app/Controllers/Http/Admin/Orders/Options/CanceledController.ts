import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class CanceledController {

    /**
     * Cancel order
     * @param param0 
     * @returns 
     */
    public async canceled({ request, response }: HttpContextContract) {

        // Get order
        const order         = await Order
                                        .query()
                                        .where('id', request.input('id'))
                                        .preload('products')
                                        .preload('payment')
                                        .preload('address', (builder) => {
                                            builder.preload('country')
                                        })
                                        .firstOrFail()
        
        // Generate date for cancel
        const canceled_at   = moment().format('YYYY-MM-DD HH:mm:ss')

        // Update order
        order.order_status  = 'canceled'
        order.cancel_reason = request.input('reason')
        order.cancelled_at  = canceled_at as any
        await order.save()

        // Send sms to customer
        await Sms.canceled(order.toJSON())

        // Send admin notification
        Event.emit('admin::order::canceled', { order: order.toJSON() })

        // Success
        return response.noContent()

    }

}