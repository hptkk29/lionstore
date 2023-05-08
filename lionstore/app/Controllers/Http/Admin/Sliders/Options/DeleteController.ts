import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Uploader from 'App/Services/Uploader'
import Slider from 'App/Models/Slider'

export default class DeleteController {

    /**
     * Remove selected sliders
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

            // Get slider
            const slider = await Slider.find(item.id)

            // Delete desktop slider
            await Uploader.deleteById(slider?.desktop_slider_id)

            // Delete mobile slider
            await Uploader.deleteById(slider?.mobile_slider_id)

            // Delete slider
            await slider?.delete()

        }

        // Success
        return response.noContent()

    }

}