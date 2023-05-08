import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slider from 'App/Models/Slider'

export default class SlidersController {

    /**
     * Get list of sliders
     * @param param0 
     * @returns 
     */
    public async sliders({ request, response }: HttpContextContract) {

        // Get current page
        const page    = request.input('page', 1)

        // Get list of sliders
        const sliders = await Slider
                                    .query()
                                    .orderBy('id', 'desc')
                                    .preload('desktopSlider')
                                    .preload('mobileSlider')
                                    .paginate(page, 50)

        // Success
        return response.json(sliders.toJSON())

    }

}
