import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PageTranslation from 'App/Models/PageTranslation'
import Uploader from 'App/Services/Uploader'
import Page from 'App/Models/Page'

export default class DeleteController {

    /**
     * Remove selected pages
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

            // Delete translation
            await PageTranslation
                    .query()
                    .where('page_id', item.id)
                    .delete()

            // Get page
            const page = await Page.find(item.id)

            // Delete ogimage
            await Uploader.deleteById(page?.og_image_id)

            // Delete childcategory
            await page?.delete()
            
        }

        // Success
        return response.noContent()

    }

}