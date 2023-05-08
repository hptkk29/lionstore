import SettingsCurrency from 'App/Models/SettingsCurrency';
import PaymentHistory from 'App/Models/PaymentHistory';
import * as Client from '@paypal/checkout-server-sdk'
import ServicePaypal from 'App/Models/ServicePaypal';
import { string } from '@ioc:Adonis/Core/Helpers';

export default class PayPal {

    /**
     * Make a PayPal payment
     * @param paymentToken
     * @param customerId 
     * @param orderNumber 
     * @returns 
     */
    static async make(paymentToken, customerId, orderNumber) {

        // Get paypal settings
        const settings          = await ServicePaypal.first()

        // Get currency settings
        const currency          = await SettingsCurrency.first()
        
        // Setup PayPal Settings
        let clientId            = settings?.public_key
        let clientSecret        = settings?.secret_key
        let environment         = settings?.env === 'sandbox' ? new Client.core.SandboxEnvironment(clientId, clientSecret) : new Client.core.LiveEnvironment(clientId, clientSecret)
        let client              = new Client.core.PayPalHttpClient(environment)

        try {
            
            // Capture order details
            const capture       = new Client.orders.OrdersCaptureRequest(paymentToken)
            capture.requestBody({});

            // Get response from capture
            let response        = await client.execute(capture);

            // Check if payment succeeded
            if (response.result && response.result.status === 'COMPLETED') {

                // Get payment amount
                const paymentAmount                   = response.result.purchase_units[0].payments.captures[0].amount.value
                
                // Save payment details
                const payment                         = new PaymentHistory()
                      payment.uid                     = string.generateRandom(32)
                      payment.customer_id             = customerId
                      payment.order_id                = orderNumber
                      payment.transaction_id          = response.result.id
                      payment.payment_method          = 'paypal'
                      payment.payment_amount          = paymentAmount
                      payment.payment_currency        = currency?.code as any
                      payment.payment_currency_locale = currency?.locale as any
                await payment.save()
                
                // Return success response
                return {
                    success: true,
                    payment: payment.id
                }

            } else {

                // Error
                return {
                    success: false,
                    error  : 'PAYPAL_PAYMENT_FAILED'
                }

            }

        } catch (error) {
            console.log(error)
            // ERROR
            return {
                success: false,
                error  : error
            }

        }

    }

}