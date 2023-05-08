import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'
import Product from 'App/Models/Product'

export default class DeleteController {

    /**
     * Delete selected reviews
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items      = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item   = items[index]

            // Get review
            const review = await ProductReview
                                    .query()
                                    .where('id', item.id)
                                    .first()

            // Check if review exists
            if (review) {
            
                // Set product id
                const productId = review.product_id

                // Delete review
                await review.delete()

                // Sync product rating
                await this.syncProduct(productId)

            }

        }

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