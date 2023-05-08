import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PaymentHistory from 'App/Models/PaymentHistory'

export default class PaymentsController {

    /**
     * Get list of payments
     * @param param0 
     * @returns 
     */
    public async payments({ request, response }: HttpContextContract) {

        // Get current page
        const page     = request.input('page', 1)

        // Get list of payments
        const payments = await PaymentHistory
                                    .query()
                                    .orderBy('id', 'desc')
                                    .preload('order')
                                    .preload('customer')
                                    .paginate(page, 50)

        // Return payments history
        return response.json(payments.toJSON())

    }

}