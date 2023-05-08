import EditValidator from 'App/Validators/Admin/Reviews/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'
import Product from 'App/Models/Product'

export default class ApproveController {

    /**
     * Edit selected review
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get review
        const review          = await ProductReview
                                            .query()
                                            .where('id', request.input('id'))
                                            .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Update review
        review.rating_value   = Number(request.input('rating'))
        review.review_comment = request.input('comment')
        review.is_active      = Boolean(request.input('is_active'))
        await review.save()

        // Sync product
        await this.syncProduct(review.product_id)

        // Success
        return response.noContent()

    }


    /**
     * Update product rating value
     * @param productId 
     */
     public async syncProduct(productId) {

        // Get product
        const product           = await Product
                                            .query()
                                            .where('id', productId)
                                            .first()

        // Check if product exists
        if (product) {
         
            // Count total rating
            const total_rating  = await ProductReview
                                            .query()
                                            .where('product_id', productId)
                                            .where('is_active', true)
                                            .sum('rating_value as total')

            // Count total reviews
            const total_reviews = await ProductReview
                                            .query()
                                            .where('product_id', productId)
                                            .where('is_active', true)
                                            .count('id as total')

            // Calculate rating
            const rating        = Number(total_rating[0].$extras.total) / Number(total_reviews[0].$extras.total)
            
            // Update product
            product.rating      = isNaN(rating) ? 0 : rating
            await product.save()

        }

    }

}