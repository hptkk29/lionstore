import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Product from 'App/Models/Product'
import Order from 'App/Models/Order'
import Sms from 'App/Services/Sms'
import moment from 'moment'

export default class ConfirmController {

    /**
     * Mark order as confirmed
     * @param param0 
     * @returns 
     */
    public async confirm({ request, response }: HttpContextContract) {

        // Get items
        const items        = request.input('items')
        
        // Generate date for confirmation
        const processed_at = moment().format('YYYY-MM-DD HH:mm:ss')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item     = items[index]

            // Get order to update
            const order    = await Order
                                    .query()
                                    .where('id', item.id)
                                    .where('order_status', 'new')
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
                order.order_status = 'confirmed'
                order.processed_at = processed_at as any
                await order.save()

                // Send sms to customer
                await Sms.confirmed(order.toJSON())

                // Update products quantity
                await this.updateStock(order.toJSON())

                // Check if order has registered customer
                if (order.customer) {
                    
                    // Send notification
                    Event.emit('customer::order::confirmed', { order: order.toJSON() })

                }

            }    

        }

        // Success
        return response.noContent()

    }


    /**
     * Update products stock in order
     * @param {*} order 
     */
    public async updateStock(order) {
        
        // Loop through products
        for (let index = 0; index < order.products.length; index++) {

            // Get product in order
            const element = order.products[index];

            // Get product from database and update stock
            await Product
                    .query()
                    .where('id', element.product_id)
                    .decrement('stock', element.quantity)
            
        }

    }

}