import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RefundRequest from 'App/Models/RefundRequest'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class ProcessController {

    /**
     * Process selected refunds
     * @param param0 
     * @returns 
     */
    public async process({ request, response }: HttpContextContract) {

        // Get items
        const items      = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item   = items[index]

            // Get refund request
            const refund = await RefundRequest
                                    .query()
                                    .where('id', item.id)
                                    .preload('order')
                                    .first()

            // Check if refund exists
            if (refund) {
                
                // Update order
                await this.updateOrder(refund.toJSON())

                // Update refund 
                refund.is_processed = true
                refund.is_seen      = true
                await refund.save()

            }
            
        }

        // Success
        return response.noContent()

    }



    /**
     * Update order status
     * @param orderId 
     */
    public async updateOrder(refund) {

         // Generate date for refund
         const refunded_at  = moment().format('YYYY-MM-DD HH:mm:ss')
 
        // Get order to update
        const order         = await Order
                                        .query()
                                        .where('id',refund.order_id)
                                        .where('order_status', 'delivered')
                                        .preload('products')
                                        .preload('payment')
                                        .preload('address', (builder) => {
                                            builder.preload('country')
                                        })
                                        .first() as any
 
        // Update order
        if (order) {
            
            order.order_status  = 'refunded'
            order.refunded_at   = refunded_at as any
            await order.save()
     
            // Send sms to customer
            await Sms.refunded(order.toJSON())
            
        }

    }

}