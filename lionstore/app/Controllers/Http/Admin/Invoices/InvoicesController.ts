import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'

export default class InvoicesController {

    /**
     * Get generated invoices
     * @param param0 
     * @returns 
     */
    public async invoices({ request, response }: HttpContextContract) {

        // Get current page
        const page     = request.input('page', 1)

        // Get invoices
        const invoices = await Invoice
                                    .query()
                                    .orderBy('id', 'desc')
                                    .preload('order', (builder) => {
                                        builder.preload('payment')
                                    })
                                    .paginate(page, 50)

        // Return invoices
        return response.json(invoices.toJSON())

    }

}