import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BrandTranslation from 'App/Models/BrandTranslation'
import Uploader from 'App/Services/Uploader'
import Product from 'App/Models/Product'
import Brand from 'App/Models/Brand'

export default class DeleteController {

    /**
     * Remove selected brands
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
            await BrandTranslation
                            .query()
                            .where('brand_id', item.id)
                            .delete()

            // Get brand to delete
            const brand = await Brand.find(item.id)

            // Delete logo image from local storage
            await Uploader.deleteById(brand?.logo_id)

            // Delete brand
            await brand?.delete()

            // Update products default brand
            await this.syncProducts(item.id)

        }

        // Success
        return response.noContent()

    }


    /**
     * Update products and set new brand
     * @param old 
     * @param brand
     */
    public async syncProducts(old) {

        try {
            
            // Update brand
            await Product
            .query()
            .where('brand_id', old)
            .update({
                brand_id : null,
            })

        } catch (error) {
            return
        }
        

    }

}
