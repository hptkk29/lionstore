import CancelValidator from 'App/Validators/Main/Customer/Orders/CancelValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'
import xss from 'xss'

export default class CancelController {

    /**
     * Mark order as delivered by customer
     * @param param0 
     */
    public async cancel({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get order id
        const orderId = request.input('id')

        // Get order
        const order   = await Order
                                .query()
                                .where('uid', orderId)
                                .where('order_status', 'new')
                                .preload('products')
                                .preload('payment')
                                .preload('address', (builder) => {
                                    builder.preload('country')
                                })
                                .firstOrFail()

        // Validate form
        await request.validate(CancelValidator)

        // Generate date for cancel
        const canceled_at   = moment().format('YYYY-MM-DD HH:mm:ss')

        // Update order
        order.order_status  = 'canceled'
        order.cancel_reason = xss(request.input('reason'))
        order.cancelled_at  = canceled_at as any
        await order.save()

        // Send sms to customer
        await Sms.canceled(order.toJSON())

        // Success
        return response.noContent()


    }

}