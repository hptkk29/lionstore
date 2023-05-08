import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RefundRequest from 'App/Models/RefundRequest'

export default class RefundsController {

    /**
     * Get refunds
     * @param param0 
     * @returns 
     */
    public async refunds({ request, response }: HttpContextContract) {

        // Get current page
        const page    = request.input('page', 1)

        // Get latest requested refunds
        const refunds = await RefundRequest
                                .query()
                                .orderBy('id', 'desc')
                                .preload('customer')
                                .preload('order', (builder) => {
                                    builder.preload('payment')
                                })
                                .paginate(page, 50)

        // Return refunds
        return response.json(refunds.toJSON())

    }

}