import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {

    /**
     * Get customer's orders
     * @param param0 
     * @returns 
     */
    public async orders({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get current page
        const page   = request.input('page', 1)

        // Get customer orders
        const orders = await Order
                                    .query()
                                    .where('customer_id', auth.user?.id as number)
                                    .select(
                                        'id',
                                        'uid',
                                        'order_number',
                                        'order_status',
                                        'payment_id',
                                        'total_price',
                                        'subtotal_price',
                                        'shipping_cost',
                                        'taxes_cost',
                                        'discount_value',
                                        'discount_code',
                                        'discount_type',
                                        'processed_at',
                                        'placed_at',
                                        'shipped_at',
                                        'cancelled_at',
                                        'delivered_at',
                                        'refunded_at'
                                    )
                                    .preload('products', (builder) => {
                                        builder
                                            .select(
                                                'order_id',
                                                'product_id',
                                                'quantity',
                                                'single_price',
                                                'total_price'
                                            )
                                            .preload('product', (query) => {
                                                query
                                                    .select(
                                                        'id',
                                                        'pid',
                                                        'media_small_id',
                                                        'handler'
                                                    )
                                                    .preload('thumbnail', (q) => {
                                                        q.select('id', 'uid', 'file_folder')
                                                    })
                                                    .preload('translation', (q) => {
                                                        q.select('product_id', 'title')
                                                    })
                                            })
                                    })
                                    .preload('address', (builder) => {
                                        builder
                                            .select(
                                                'id',
                                                'order_id',
                                                'name',
                                                'phone',
                                                'address',
                                                'country_id',
                                                'state',
                                                'city',
                                                'zipcode'
                                            )
                                            .preload('country', (query) => {
                                                query.select('id', 'name', 'code')
                                            })
                                    })
                                    .preload('payment', (builder) => {
                                        builder.select('order_id', 'payment_method', 'payment_currency', 'payment_currency_locale')
                                    })
                                    .preload('variants')
                                    .orderBy('id', 'desc')
                                    .paginate(page, 50)

        // Return response
        return response.json(orders.toJSON())

    }

}