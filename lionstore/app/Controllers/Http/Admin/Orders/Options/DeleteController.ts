import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderProductVariant from 'App/Models/OrderProductVariant'
import PaymentHistory from 'App/Models/PaymentHistory'
import RefundRequest from 'App/Models/RefundRequest'
import OrderAddress from 'App/Models/OrderAddress'
import OrderProduct from 'App/Models/OrderProduct'
import Order from 'App/Models/Order'

export default class DeleteController {

    /**
     * Remove selected orders
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items    = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item = items[index]

            // Get order
            const order = await Order
            .query()
            .where('id', item.id)
            .first()

            // Check if order exists
            if (order) {
                
                // Delete address
                await OrderAddress
                        .query()
                        .where('order_id', order.id)
                        .delete()

                // Delete order products
                await OrderProduct
                        .query()
                        .where('order_id', order.id)
                        .delete()

                // Delete order products variants
                await OrderProductVariant
                        .query()
                        .where('order_id', order.id)
                        .delete()

                // Delete payment
                await PaymentHistory
                        .query()
                        .where('order_id', order.order_number)
                        .delete()

                // Delete refund requests
                await RefundRequest
                        .query()
                        .where('order_id', order.id)
                        .delete()

                // Now delete order
                await order.delete()

            }
            
        }

        // Success
        return response.noContent()

    }

}