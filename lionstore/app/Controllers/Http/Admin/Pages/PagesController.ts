import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'

export default class PagesController {

    /**
     * Get pages
     * @param param0 
     * @returns 
     */
    public async pages({ request, response }: HttpContextContract) {

        // Get current page
        const page  = request.input('page', 1)

        // Get latest created pages
        const pages = await Page
                                .query()
                                .orderBy('id', 'desc')
                                .preload('translation')
                                .paginate(page, 50)

        // Return pages
        return response.json(pages.toJSON())

    }

}