import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class ShippedController {

    /**
     * Mark order as shipped
     * @param param0 
     * @returns 
     */
    public async shipped({ request, response }: HttpContextContract) {

        // Get items
        const items        = request.input('items')
        
        // Generate date for shipping
        const shipped_at   = moment().format('YYYY-MM-DD HH:mm:ss')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item     = items[index]

            // Get order to update
            const order    = await Order
                                    .query()
                                    .where('id', item.id)
                                    .where('order_status', 'confirmed')
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
                order.order_status = 'shipped'
                order.shipped_at   = shipped_at as any
                await order.save()

                // Send sms to customer
                await Sms.shipped(order.toJSON())

                // Check if order has registered customer
                if (order.customer) {
                    
                    // Send notification
                    Event.emit('customer::order::shipped', { order: order.toJSON() })

                }

            }    

        }

        // Success
        return response.noContent()

    }

}