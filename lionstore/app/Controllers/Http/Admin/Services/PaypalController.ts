import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServicePaypal from 'App/Models/ServicePaypal'
import Uploader from 'App/Services/Uploader'

export default class PaypalController {

    /**
     * Get Paypal settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get Paypal settings
        const settings = await ServicePaypal.find(1)

        // Return settings
        return response.json(settings?.toJSON())

    }


    /**
     * Update paypal settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Get default settings
        const settings = await ServicePaypal.find(1) as any

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
        settings.env         = request.input('env')
        settings.title       = request.input('title')
        settings.description = request.input('description')
        settings.public_key  = request.input('public_key') ? request.input('public_key') : null
        settings.secret_key  = request.input('secret_key') ? request.input('secret_key') : null
        settings.logo_id     = logo
        await settings.save()

        // Success
        return response.noContent()

    }

}