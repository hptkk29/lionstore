import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'
import Product from 'App/Models/Product'
import xss from 'xss'

export default class SearchController {

    /**
     * Get product reviews
     * @param param0 
     * @returns 
     */
    public async reviews({ request, response }: HttpContextContract) {

        // Get product id
        const productId  = xss(request.input('product'))

        // Get page number
        const page       = Number(xss(request.input('page', 1)))

        // Get product
        const product    = await Product
                                    .query()
                                    .where('pid', productId)
                                    .where('is_active', true)
                                    .firstOrFail()

        // Get reviews
        const reviews    = await ProductReview
                                    .query()
                                    .where('product_id', product.id)
                                    .where('is_active', true)
                                    .preload('customer')
                                    .paginate(page, 10)

        // Check for private reviews and return data
        const serialized = await this.serialized(reviews.toJSON())
        
        // Return data now
        return response.json(serialized)

    }



    /**
     * Check for private reviews and return data
     * @param reviews 
     * @returns 
     */
    public async serialized(reviews) {

        // Get reviews data
        const data = reviews.data

        // Set an empty variable
        var empty  = []

        // Loop throug data
        for (let index = 0; index < data.length; index++) {

            // Get review data
            const review = data[index];

            // Check if review is private
            if (review.is_private) {
                const regex  = /(?<!^).(?!$)/g;
                var customer = review.customer.username.replace(regex, '*')
            } else {
                var customer = review.customer.username
            }

            // Set review item
            const item = {
                customer: customer,
                rating  : review.rating_value,
                comment : review.review_comment,
                date    : review.createdAt
            }

            // Add this review to empty variable
            empty.push(item as never)
            
        }
        
        // Success, now return data
        return {
            meta: reviews.meta,
            data: empty
        }

    }

}