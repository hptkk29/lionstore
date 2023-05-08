import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceStripe from 'App/Models/ServiceStripe'
import Encryption from "@ioc:Adonis/Core/Encryption"
import Uploader from 'App/Services/Uploader'

export default class StripeController {

    /**
     * Get stripe settings
     * @param param0 
     * @returns 
     */
    public async settings({ response }: HttpContextContract) {

        // Get Stripe settings
        const settings = await ServiceStripe.find(1)

        // Return settings
        return response.json({
            title      : settings?.title,
            description: settings?.description,
            public_key : settings?.public_key ? Encryption.decrypt(settings?.public_key as string) : settings?.public_key,
            secret_key : settings?.secret_key ? Encryption.decrypt(settings?.secret_key as string) : settings?.secret_key
        })

    }


    /**
     * Update Stripe settings
     * @param param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate admin
        await auth.use('api').authenticate()

        // Get default settings
        const settings = await ServiceStripe.find(1) as any

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
        settings.public_key  = request.input('public_key') ? Encryption.encrypt(request.input('public_key')) : null
        settings.secret_key  = request.input('secret_key') ? Encryption.encrypt(request.input('secret_key')) : null
        settings.logo_id     = logo
        await settings.save()

        // Success
        return response.noContent()

    }

}