import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'

export default class ReviewsController {

    /**
     * Get reviews by customer
     * @param param0 
     * @returns 
     */
    public async reviews({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get page
        const page       = request.input('page', 1)

        // Get customer id
        const customerId = auth.user?.id as number

        // Get reviews
        const reviews    = await ProductReview
                                        .query()
                                        .where('customer_id', customerId)
                                        .preload('product', (builder) => {
                                            builder 
                                                .preload('translation', (query) => {
                                                    query.select('id', 'product_id', 'title')
                                                })
                                                .preload('thumbnail', (query) => {
                                                    query.select('id', 'uid', 'file_folder')
                                                })
                                                .select('id', 'handler', 'media_small_id', 'pid')
                                        })
                                        .select('uid', 'customer_id', 'product_id', 'rating_value', 'review_comment', 'is_private', 'created_at')
                                        .paginate(page, 20)
        
        // Return reviews
        return response.json(reviews.toJSON())

    }

}