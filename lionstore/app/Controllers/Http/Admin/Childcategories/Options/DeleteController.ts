import ChildcategoryTranslation from 'App/Models/ChildcategoryTranslation'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Childcategory from 'App/Models/Childcategory'
import Uploader from 'App/Services/Uploader'
import Product from 'App/Models/Product'

export default class DeleteController {

    /**
     * Remove selected childcategories
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
            await ChildcategoryTranslation
                    .query()
                    .where('childcategory_id', item.id)
                    .delete()

            // Get childcategory
            const childcategory = await Childcategory.find(item.id)

            // Delete icon
            await Uploader.deleteById(childcategory?.icon_id)

            // Delete ogimage
            await Uploader.deleteById(childcategory?.og_image_id)

            // Delete childcategory
            await childcategory?.delete()

            // Update products categories
            await this.syncProducts(item.id, request.input('category'), request.input('subcategory'), request.input('childcategory'))

        }

        // Success
        return response.noContent()

    }


    /**
     * Update products and set new subcategories
     * @param old 
     * @param category 
     * @param subcategory 
     * @param childcategory 
     */
    public async syncProducts(old, category, subcategory, childcategory) {

        try {
            
            // Update categories
            await Product
            .query()
            .where('childcategory_id', old)
            .update({
                category_id     : category,
                subcategory_id  : subcategory,
                childcategory_id: childcategory
            })

        } catch (error) {
            return
        }
        

    }

}
