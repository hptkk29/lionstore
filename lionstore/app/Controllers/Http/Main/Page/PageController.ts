import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'
import xss from 'xss'

export default class PageController {

    /**
     * Show page
     * @param param0 
     * @returns 
     */
    public async page({ request, response }: HttpContextContract) {

        // Get page handler
        const handler = xss(request.input('handler'))

        // Get page
        const page    = await Page
                                .query()
                                .preload('translation')
                                .preload('ogimage', (builder) => {
                                    builder.select('id', 'uid', 'file_folder')
                                })
                                .select(
                                    'id',
                                    'handler',
                                    'seo_title',
                                    'seo_description',
                                    'og_image_id',
                                    'updated_at'
                                )
                                .where('handler', handler)
                                .firstOrFail()

        // Return page
        return response.json(page.toJSON())

    }

}