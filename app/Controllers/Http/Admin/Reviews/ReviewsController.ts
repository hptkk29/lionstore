import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'

export default class ReviewsController {

    /**
     * Get products reviews
     * @param param0 
     * @returns 
     */
    public async reviews({ request, response }: HttpContextContract) {

        // Get page
        const page    = request.input('page', 1)

        // Get reviews
        const reviews = await ProductReview
                                    .query()
                                    .orderBy('id', 'desc')
                                    .preload('product', (builder) => {
                                        builder
                                            .preload('thumbnail')
                                            .preload('translation')
                                    })
                                    .preload('customer')
                                    .paginate(page, 30)

        // Return reviews
        return response.json(reviews.toJSON())

    }

}