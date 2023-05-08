import CreateValidator from 'App/Validators/Admin/Sliders/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Uploader from 'App/Services/Uploader'
import Slider from 'App/Models/Slider'

export default class CreateController {

    /**
     * Create new slider
     * @param param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Validate request
        await request.validate(CreateValidator)

        // Check if form has desktop slider image
        if (request.file('desktop_slider')) {
            var desktop_slider = await Uploader.singleFile({
                file      : request.file('desktop_slider'),
                folder    : 'sliders',
                uploaderId: auth.user?.id,
                width     : 1200
            }) as any
        } else {
            var desktop_slider = null as any
        }

        // Check if form has mobile slider image
        if (request.file('mobile_slider')) {
            var mobile_slider = await Uploader.singleFile({
                file      : request.file('mobile_slider'),
                folder    : 'sliders',
                uploaderId: auth.user?.id,
                width     : 600
            }) as any
        } else {
            var mobile_slider = null as any
        }

        // create new slider
        const slider                   = new Slider()
              slider.uid               = string.generateRandom(32)
              slider.desktop_slider_id = desktop_slider
              slider.mobile_slider_id  = mobile_slider
              slider.link_type         = request.input('link_type')
              slider.link_value        = request.input('link_value')
        await slider.save()

        // Success
        return response.noContent()

    }

}