import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceOffline from 'App/Models/ServiceOffline'
import Uploader from 'App/Services/Uploader'

export default class OfflineController {

    /**
     * Get Offline settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get Offline settings
        const settings = await ServiceOffline.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update Offline payment settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Get default settings
        const settings = await ServiceOffline.find(1) as any

        // Check if want to change logo
        if (request.file('logo')) {
            
            var logo = await Uploader.singleFile({
                file      : request.file('logo'),
                folder    : 'services',
                uploaderId: auth.user?.id,
                width     : 100,
                deleteOld : settings.logo_id ? true : false,
                deleteId  : settings.logo_id
            }) as any

        } else {
            var logo = settings?.logo_id as any
        }

        // Update settings
        settings.title       = request.input('title')
        settings.description = request.input('description')
        settings.details     = request.input('details')
        settings.logo_id     = logo
        await settings.save()

        // Success
        return response.noContent()

    }

}