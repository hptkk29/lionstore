import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchHistory from 'App/Models/SearchHistory'

export default class OptionsController {

    /**
     * Delete selected keywords
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
            await SearchHistory
                    .query()
                    .where('id', item.id)
                    .delete()

        }

        // Success
        return response.noContent()

    }

}