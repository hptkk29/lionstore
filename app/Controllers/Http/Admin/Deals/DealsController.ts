import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FlashDeal from 'App/Models/FlashDeal'

export default class DealsController {

    /**
     * Get flash deals
     * @param param0 
     * @returns 
     */
    public async deals({ request, response }: HttpContextContract) {

        // Get current page
        const page  = request.input('page', 1)

        // Get flash deals
        const deals = await FlashDeal
                                .query()
                                .orderBy('id', 'desc')
                                .preload('product', (builder) => {
                                    builder
                                        .preload('thumbnail')
                                        .preload('translation')
                                })
                                .paginate(page, 50)

        // Return flash deals
        return response.json(deals.toJSON())

    }

}