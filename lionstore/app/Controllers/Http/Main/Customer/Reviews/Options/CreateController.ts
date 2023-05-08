import CreateValidator from 'App/Validators/Main/Customer/Reviews/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'
import OrderProduct from 'App/Models/OrderProduct'
import Event from '@ioc:Adonis/Core/Event'
import Product from 'App/Models/Product'
import randomstring from 'randomstring'
import Order from 'App/Models/Order'
import xss from 'xss'

export default class CreateController {

    /**
     * Check if customer have right to write review
     * @param param0 
     * @returns 
     */
    public async fetch({ request, response, auth }: HttpContextContract) {

        // Get product id
        const productId     = xss(request.input('product'))

        // Get order id
        const orderId       = xss(request.input('order'))

        // Get customer id
        const customerId    = auth.user?.id as number

        // Get order
        const order         = await Order
                                        .query()
                                        .where('order_number', orderId)
                                        .where('customer_id', customerId)
                                        .where('order_status', 'delivered')
                                        .firstOrFail()

        // Get product
        const product       = await Product
                                        .query()
                                        .where('pid', productId)
                                        .preload('thumbnail', (builder) => {
                                            builder.select('id', 'uid', 'file_folder')
                                        })
                                        .preload('translation', (builder) => {
                                            builder.select('id', 'product_id', 'title')
                                        })
                                        .select('id', 'handler', 'media_small_id', 'pid')
                                        .firstOrFail()

        // Get order product
        const product_order = await OrderProduct
                                        .query()
                                        .where('order_id', order.id)
                                        .where('product_id', product.id)
                                        .firstOrFail()

        // Customer have right to write review for this product
        return response.json({
            success: true,
            order  : order.order_number,
            product: product
        })


    }


    /**
     * Post new review
     * @param param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Validate form
        await request.validate(CreateValidator)

        // Get product id
        const productId     = xss(request.input('product_id'))

        // Get order id
        const orderId       = xss(request.input('order_number'))

        // Get rating value
        const rating        = Number(request.input('rating'))

        // Get review comment content
        const comment       = xss(request.input('comment'))

        // Get review visibility status
        const privacy       = Boolean(request.input('private'))

        // Get customer id
        const customerId    = auth.user?.id as number

        // Get order
        const order         = await Order
                                        .query()
                                        .where('order_number', orderId)
                                        .where('customer_id', customerId)
                                        .where('order_status', 'delivered')
                                        .firstOrFail()

        // Get product
        const product       = await Product
                                        .query()
                                        .where('pid', productId)
                                        .firstOrFail()

        // Get order product
        const product_order = await OrderProduct
                                        .query()
                                        .where('order_id', order.id)
                                        .where('product_id', product.id)
                                        .firstOrFail()

        // Check if customer already post review for this product
        const isAlready     = await ProductReview
                                        .query()
                                        .where('product_id', product.id)
                                        .where('customer_id', customerId)
                                        .first()

        if (isAlready) {
            
            // Update current review
            isAlready.rating_value   = rating
            isAlready.review_comment = comment
            isAlready.is_private     = privacy
            isAlready.is_seen        = false
            isAlready.is_active      = false
            await isAlready.save()

            // Send notification to admin
            Event.emit('admin::review::pending', { product: product.toJSON(), review: isAlready.toJSON() })

            // Success
            return response.noContent()

        } else {

            // Post new review
            const review                = new ProductReview()
                  review.uid            = randomstring.generate(32)
                  review.product_id     = product.id
                  review.customer_id    = customerId
                  review.rating_value   = rating
                  review.review_comment = comment
                  review.is_private     = privacy
            await review.save()

            // Send notification to admin
            Event.emit('admin::review::pending', { product: product.toJSON(), review: review.toJSON() })

            // Success
            return response.noContent()

        }


    }

}