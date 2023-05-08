import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RefundValidator from 'App/Validators/Main/Customer/Orders/RefundValidator'
import SettingsRefund from 'App/Models/SettingsRefund'
import RefundRequest from 'App/Models/RefundRequest'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'
import xss from 'xss'

export default class RequestController {

    /**
     * Request a refund
     * @param param0 
     * @returns 
     */
    public async request({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get refunds settings
        const settings   = await SettingsRefund.first()

        // Check if refund system enabled
        if (!settings?.is_enabled) {
            
            // Refund systems not enabled
            return response.badRequest('REFUND_SYSTEM_DISABLED')

        }

        // Get customer id
        const customerId = auth.user?.id as number

        // Get order id
        const orderId    = request.input('id')

        // Get order
        const order      = await Order
                                    .query()
                                    .where('order_number', orderId)
                                    .where('customer_id', customerId)
                                    .where('order_status', 'delivered')
                                    .firstOrFail()

        // Validate request
        await request.validate(RefundValidator)

        // Check if already requested a refund for this product
        const check      = await RefundRequest
                                    .query()
                                    .where('customer_id', customerId)
                                    .where('order_id', order.id)
                                    .first()

        if (check) {

            return response.noContent()
            
        } else {

            // Set new refund request
            // Request a refund
            const refund               = new RefundRequest()
                  refund.customer_id   = customerId
                  refund.order_id      = order.id
                  refund.refund_reason = xss(request.input('reason'))
            await refund.save()
            
            // Send email to admin
            Event.emit('admin::refund::request', { order: order.toJSON(), reason: xss(request.input('reason')) })

            // Success
            return response.noContent()

        }

        

    }

}