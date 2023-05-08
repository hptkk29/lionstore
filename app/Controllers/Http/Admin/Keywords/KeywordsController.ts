import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchHistory from 'App/Models/SearchHistory'

export default class KeywordsController {

    /**
     * Get search history
     * @param param0 
     * @returns 
     */
    public async keywords({ request, response }: HttpContextContract) {

        // Get current page
        const page     = request.input('page', 1)

        // Get search history
        const keywords = await SearchHistory
                                    .query()
                                    .orderBy('counter', 'desc')
                                    .paginate(page, 50)

        // Return keywords
        return response.json(keywords.toJSON())

    }

}