import ChildcategoryTranslation from 'App/Models/ChildcategoryTranslation'
import SubcategoryTranslation from 'App/Models/SubcategoryTranslation'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryTranslation from 'App/Models/CategoryTranslation'
import Childcategory from 'App/Models/Childcategory'
import Subcategory from 'App/Models/Subcategory'
import Uploader from 'App/Services/Uploader'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class DeleteController {

    /**
     * Remove selected categories
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
            await CategoryTranslation
                            .query()
                            .where('category_id', item.id)
                            .delete()

            // Get category to delete
            const category = await Category.find(item.id)

            // Delete icon image from local storage
            if (category?.icon_id) {
                await Uploader.deleteById(category?.icon_id)
            }

            // Delete ogimage image from local storage
            if (category?.og_image_id) {
                await Uploader.deleteById(category?.og_image_id)
            }

            // Delete subcategories
            await this.deleteSubcategories(category?.toJSON())

            // Delete childcategories
            await this.deleteChildcategories(category?.toJSON())

            // Delete category
            await category?.delete()

            // Update products categories
            await this.syncProducts(item.id, request.input('category'), request.input('subcategory'), request.input('childcategory'))

        }

        // Success
        return response.noContent()

    }


    /**
     * Update products and set new categories
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
            .where('category_id', old)
            .update({
                category_id     : category,
                subcategory_id  : subcategory,
                childcategory_id: childcategory
            })

        } catch (error) {
            return
        }
        

    }


    /**
     * Delete subcategories
     * @param category 
     */
    public async deleteSubcategories(category) {

        // Get subcategories
        const subcategories = await Subcategory
                                        .query()
                                        .where('parent_id', category.id)

        // Loop through subcategories
        for (let index = 0; index < subcategories.length; index++) {

            const subcategory = subcategories[index];

            // Delete icon image from local storage
            if (subcategory?.icon_id) {
                await Uploader.deleteById(subcategory?.icon_id)
            }

            // Delete ogimage image from local storage
            if (subcategory?.og_image_id) {
                await Uploader.deleteById(subcategory?.og_image_id)
            }

            // Delete translation
            await SubcategoryTranslation
                        .query()
                        .where('subcategory_id', subcategory.id)
                        .delete()

            // Delete subcategory
            await subcategory.delete()
            
        }

        // Success
        return

    }


    /**
     * Delete childcategories
     * @param category 
     */
    public async deleteChildcategories(category) {

        // Get childcategories
        const childcategories = await Childcategory
                                        .query()
                                        .where('parent_id', category.id)

        // Loop through childcategories
        for (let index = 0; index < childcategories.length; index++) {

            const childcategory = childcategories[index];

            // Delete icon image from local storage
            if (childcategory?.icon_id) {
                await Uploader.deleteById(childcategory?.icon_id)
            }

            // Delete ogimage image from local storage
            if (childcategory?.og_image_id) {
                await Uploader.deleteById(childcategory?.og_image_id)
            }

            // Delete translation
            await ChildcategoryTranslation
                        .query()
                        .where('childcategory_id', childcategory.id)
                        .delete()

            // Delete childcategory
            await childcategory.delete()
            
        }

        // Success
        return

    }

}
