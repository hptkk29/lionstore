import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductReview from 'App/Models/ProductReview'

export default class DeleteController {

    /**
     * Remove selected review
     * @param param0 
     * @returns 
     */
    public async remove({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get customer id
        const customerId = auth.user?.id as number

        // Get review
        const review     = await ProductReview
                                        .query()
                                        .where('uid', request.input('id'))
                                        .where('customer_id', customerId)
                                        .firstOrFail()

        // Delete review
        await review.delete()

        // Success
        return response.noContent()

    }

}