import EditValidator from 'App/Validators/Admin/Sliders/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Uploader from 'App/Services/Uploader'
import Slider from 'App/Models/Slider'

export default class EditController {

    /**
     * Get slider to edit it
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get slider
        const slider = await Slider
                                .query()
                                .where('uid', request.input('id'))
                                .firstOrFail()

        // Return slider
        return response.json(slider.toJSON())

    }


    /**
     * Update slider details
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // authenticate user
        await auth.use('api').authenticate()

        // Get slider
        const slider = await Slider
                                .query()
                                .where('id', request.input('id'))
                                .firstOrFail()

        // Validate form
        await request.validate(EditValidator)

        // Check if want to change desktop slider
        if (request.file('desktop_slider')) {
            var desktop_slider = await Uploader.singleFile({
                file      : request.file('desktop_slider'),
                folder    : 'sliders',
                uploaderId: auth.user?.id,
                width     : 1200,
                deleteId  : slider.desktop_slider_id,
                deleteOld : true
            }) as any
        } else {
            var desktop_slider = slider.desktop_slider_id as any
        }

        // Check if want to change mobile slider
        if (request.file('mobile_slider')) {
            var mobile_slider = await Uploader.singleFile({
                file      : request.file('mobile_slider'),
                folder    : 'sliders',
                uploaderId: auth.user?.id,
                width     : 600,
                deleteId  : slider.mobile_slider_id,
                deleteOld : true
            }) as any
        } else {
            var mobile_slider = slider.mobile_slider_id as any
        }

        // Update slider
        slider.desktop_slider_id = desktop_slider
        slider.mobile_slider_id  = mobile_slider
        slider.link_type         = request.input('link_type')
        slider.link_value        = request.input('link_value')
        await slider.save()

        // Success
        return response.noContent()

    }

}