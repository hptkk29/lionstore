import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Customer from 'App/Models/Customer'
import Message from 'App/Models/Message'
import Product from 'App/Models/Product'
import Order from 'App/Models/Order'
import convert from 'convert-units'
import os from 'os'

export default class HomeController {

    /**
     * Get dashboard analytics
     * @param param0 
     * @returns 
     */
    public async analytics({ response }: HttpContextContract) {

        // Count total orders
        const total_orders         = await Order.query().count('id', 'total')

        // Count total products
        const total_products       = await Product.query().count('id', 'total')

        // Count customers
        const total_customers      = await Customer.query().where('id', '!=', 1).count('id', 'total')

        // Count total profit
        const total_profit         = await Order.query().where('order_status', 'delivered').sum('total_price', 'total')

        // Count total products stock
        const total_stock          = await Product.query().sum('stock', 'total')

        // Count total messages
        const total_messages       = await Message.query().count('id', 'total')

        // Get top selling products
        const top_selling_products = await Product
                                                .query()
                                                .where('sales', '>', 0)
                                                .orderBy('sales', 'desc')
                                                .preload('translation')
                                                .limit(10)

        // Get orders last week
        const orders_last_week     = await Database
                                                .rawQuery('Select DATE(placed_at) as time, count(*) as total FROM t_orders WHERE placed_at > date_sub( curdate(), interval 7 day) GROUP BY DATE(placed_at);')

        // Top orders sources
        const top_orders_sources   = await Order
                                                .query()
                                                .select('order_source_name', Database.rawQuery('COUNT(order_source_name) as total'))
                                                .whereNotNull('order_source_name')
                                                .groupBy('order_source_name')
                                                .orderBy('total', 'desc')

        // Get latest customers
        const latest_customers     = await Customer
                                                .query()
                                                .where('id', '!=', 1)
                                                .orderBy('id', 'desc')
                                                .limit(10)

        // Free memory
        const free_memory          = convert(os.freemem()).from('B').to('GB').toFixed()

        // Get total system meomry size
        const total_memory         = convert(os.totalmem()).from('B').to('GB').toFixed()

        // Return data
        return response.json({
            total_orders        : total_orders,
            total_products      : total_products,
            total_customers     : total_customers,
            total_profit        : total_profit,
            total_stock         : total_stock,
            total_messages      : total_messages,
            top_selling_products: top_selling_products,
            orders_last_week    : orders_last_week,
            top_orders_sources  : top_orders_sources,
            latest_customers    : latest_customers,
            free_memory         : free_memory,
            total_memory        : total_memory,
        })

    }

}