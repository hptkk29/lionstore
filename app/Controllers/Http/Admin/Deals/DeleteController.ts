import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FlashDeal from 'App/Models/FlashDeal'

export default class DeleteController {

    /**
     * Delete flash deal
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get deal id
        const dealId = request.input('id')

        // Delete deal
        await FlashDeal
                .query()
                .where('id', dealId)
                .delete()

        // Success
        return response.noContent()

    }

}