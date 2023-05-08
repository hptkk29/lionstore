import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class DeliveredController {

    /**
     * Mark order as delivered
     * @param param0 
     * @returns 
     */
    public async delivered({ request, response }: HttpContextContract) {

        // Get items
        const items        = request.input('items')
        
        // Generate date for delivered
        const delivered_at = moment().format('YYYY-MM-DD HH:mm:ss')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item     = items[index]

            // Get order to update
            const order    = await Order
                                    .query()
                                    .where('id', item.id)
                                    .where('order_status', 'shipped')
                                    .preload('products')
                                    .preload('payment')
                                    .preload('address', (builder) => {
                                        builder.preload('country')
                                    })
                                    .preload('customer')
                                    .first()
            
            // Check if order exists
            if (order) {

                // Update order
                order.order_status = 'delivered'
                order.delivered_at = delivered_at as any
                await order.save()

                // Send sms to customer
                await Sms.delivered(order.toJSON())

                // Send admin notification
                Event.emit('admin::order::delivered', { order: order.toJSON() })

                // Send notification to customer
                if (order.customer) {
                    Event.emit('customer::order::delivered', { order: order.toJSON() })
                }

            }    

        }

        // Success
        return response.noContent()

    }

}