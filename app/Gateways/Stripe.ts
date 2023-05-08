import SettingsCurrency from "App/Models/SettingsCurrency";
import PaymentHistory from "App/Models/PaymentHistory";
import ServiceStripe from "App/Models/ServiceStripe";
import Encryption from "@ioc:Adonis/Core/Encryption"
import { string } from '@ioc:Adonis/Core/Helpers'


export default class Stripe {

    static stripe: any

    /**
     * Make a Stripe payment
     * @param request 
     * @param email 
     * @param amount 
     */
    static async make(request, email, amount, customerId, orderNumber) {

        try {
            
            // Get stripe settings
            const settings      = await ServiceStripe.first()
    
            // Get currency settings
            const currency      = await SettingsCurrency.first()

            // Decrypt Stripe key
            const secret_key    = Encryption.decrypt(settings?.secret_key as string)
    
            // Require Stripe package and set secret key
            this.stripe         = require('stripe')(secret_key)
    
            // Set credit card info
            const card          = {
                number   : request.input('stripe_card_number'),
                exp_month: Number(request.input('stripe_exp_month')),
                exp_year : Number(request.input('stripe_exp_year')),
                cvc      : request.input('stripe_cvc'),
            }
    
            // Create a new stripe customer
            const customer       = await this.customer(email)
    
            // Create a payment
            const paymentMethod  = await this.stripe.paymentMethods.create({
                type: 'card',
                card,
            });
    
            const attached       = await this.stripe.paymentMethods.attach(paymentMethod.id, {
                customer: customer.id,
            });

            // Intent payment
            const paymentIntent  = await this.stripe.paymentIntents.create({
                amount        : Number(amount) * 100,
                customer      : customer.id,
                currency      : currency?.code,
                payment_method: paymentMethod.id,
            });

            // Confirm payment
            const paymentConfirmation = await this.stripe.paymentIntents.confirm(
                paymentIntent.id,
                {payment_method: paymentIntent.payment_method}
            )
    
            // Check if payment succeeded
            if (paymentConfirmation.status === 'succeeded') {
                
                // Save payment details
                const payment                         = new PaymentHistory()
                      payment.uid                     = string.generateRandom(32)
                      payment.customer_id             = customerId
                      payment.order_id                = orderNumber
                      payment.transaction_id          = paymentConfirmation.id
                      payment.payment_method          = 'stripe'
                      payment.payment_amount          = Number(paymentConfirmation.amount) / 100
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
                    error  : 'STRIPE_PAYMENT_FAILED'
                }
            }

        } catch (error) {
            console.log(error)
            // Error
            return {
                success: false,
                error  : error
            }
        }

    }


    /**
     * Create new Stripe customer
     * @param email 
     * @returns 
     */
    static async customer(email = null) {

        try {

            // Generate customer
            // If customer authenticated we will use his email
            // Otherwise we use random one
            // Stripe customer NOT Your authenticated customer
            const customer = await this.stripe.customers.create({
              email: email ? email : `${ string.generateRandom(12) }@example.com`
            });
            
            // Now return the customer
            return customer;

        } catch (error) {
            // Something went wrong
            // Log the error    
            console.error(error);
        }

    }

}