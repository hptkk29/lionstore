import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RefundRequest from 'App/Models/RefundRequest'

export default class ReadController {

    /**
     * Mark selected refunds requets as read
     * @param param0 
     * @returns 
     */
    public async read({ request, response }: HttpContextContract) {

        // Get items
        const items      = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item   = items[index]

            // Get refund request
            const refund = await RefundRequest
                                    .query()
                                    .where('id', item.id)
                                    .first()

            // Check if refund exists
            if (refund) {

                // Update refund 
                refund.is_seen      = true
                await refund.save()

            }
            
        }

        // Success
        return response.noContent()

    }

}