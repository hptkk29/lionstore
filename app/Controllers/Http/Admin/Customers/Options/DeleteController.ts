import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentHistory from 'App/Models/PaymentHistory'
import ProductReview from 'App/Models/ProductReview'
import OrderAddress from 'App/Models/OrderAddress'
import Wishlist from 'App/Models/Wishlist'
import Customer from 'App/Models/Customer'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'

export default class DeleteController {

    /**
     * Remove selected customers
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items    = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item     = items[index]

            // Get customer
            const customer = await Customer
                                        .query()
                                        .where('id', item.id)
                                        .withScopes((scopes) => scopes.notAdmin())
                                        .first()

            // Check if customer exists
            if (customer) {
                
                // Update orders and addresses or anything related to this customer
                // We will change the default customer to admin id
                // :) / So we can prevent any errors in future :)
                await this.syncCustomer(customer.toJSON())

                // Now we can safely delete this customer
                await customer.delete()

            }
            
        }

        // Success
        return response.noContent()

    }


    /**
     * Update any table with selected customer
     * Like orders by this customer
     * This will prevent any errors
     * @param customer  
     */
    public async syncCustomer(customer) {

        try {
            
            // Update addresses
            await Address
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

            // Update orders
            await Order
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

            // Update orders addresses
            await OrderAddress
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

            // Update payments history
            await PaymentHistory
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

            // Update products reviews
            await ProductReview
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

            // Update wishlist
            await Wishlist
                    .query()
                    .where('customer_id', customer.id)
                    .update({
                        customer_id     : 1,
                    })

        } catch (error) {
            return
        }
        

    }

}