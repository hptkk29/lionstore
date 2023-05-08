import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/Country'

export default class DeleteController {

    /**
     * Delete selected countries
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

            // Delete item
            await Country
                    .query()
                    .where('id', item.id)
                    .delete()

        }

        // Success
        return response.noContent()

    }

}
