import SettingsCurrency from "App/Models/SettingsCurrency"
import PaymentHistory from "App/Models/PaymentHistory"
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Offline {

    /**
     * Make a bank transaction payment
     * @param customerId 
     * @param orderId 
     * @param total 
     * @returns 
     */
    static async make(customerId, orderId, total) {

        // Get currency settings
        const currency                        = await SettingsCurrency.first()

        // Save payment details
        const payment                         = new PaymentHistory()
              payment.uid                     = string.generateRandom(32)
              payment.customer_id             = customerId
              payment.order_id                = orderId
              payment.transaction_id          = string.generateRandom(32).toUpperCase()
              payment.payment_method          = 'offline'
              payment.payment_amount          = total
              payment.payment_currency        = currency?.code as any
              payment.payment_currency_locale = currency?.locale as any
        await payment.save()
        
        // Return success response
        return {
            success: true,
            payment: payment.id
        }

    }

}
