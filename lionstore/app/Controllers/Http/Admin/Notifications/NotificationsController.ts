import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'
import RefundRequest from 'App/Models/RefundRequest'
import Customer from 'App/Models/Customer'
import Message from 'App/Models/Message'
import Order from 'App/Models/Order'

export default class OrdersController {

    /**
     * Count notifications
     * @param param0 
     * @returns 
     */
    public async notifications({ response }: HttpContextContract) {

        // Count pending orders
        const orders    = await Order
                                    .query()
                                    .where('order_status', 'new')
                                    .count('id as total')

        // Count pending messages
        const messages  = await Message
                                    .query()
                                    .where('is_seen', false)
                                    .count('id as total')

        // Count pending customers
        const customers = await Customer
                                    .query()
                                    .where('is_verified', false)
                                    .count('id as total')

        // Count refunds requests
        const refunds   = await RefundRequest
                                    .query()
                                    .where('is_seen', false)
                                    .count('id as total')

        // Count pending reviews
        const reviews   = await ProductReview
                                    .query()
                                    .where('is_seen', false)
                                    .count('id as total')

        // Return notifications
        return response.json({
            orders   : orders,
            messages : messages,
            customers: customers,
            refunds  : refunds,
            reviews  : reviews
        })

    }

}