import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from 'App/Models/Coupon'

export default class DeleteController {

    /**
     * Remove selected coupons
     * @param param0 
     * @returns 
     */
     public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items    = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item = items[index]

            // Delete coupon
            await Coupon
                    .query()
                    .where('id', item.id)
                    .delete()

        }

        // Success
        return response.noContent()

    }

}
