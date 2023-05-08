import EditValidator from 'App/Validators/Main/Customer/Addresses/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsCheckout from 'App/Models/SettingsCheckout'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import Country from 'App/Models/Country'
import Address from 'App/Models/Address'
import xss from 'xss'

export default class EditController {

    /**
     * Edit address
     * @param {*} param0 
     * @returns 
     */
    public async edit({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get address
        const address = await Address
                                .query()
                                .where('uid', request.input('id'))
                                .where('customer_id', auth.use('api').user!.id)
                                .firstOrFail()

        // Get General Settings
        const settings      = await SettingsGeneral.find(1)

        // Check if site global or local
        if (settings?.is_global) {
            
            // Get countries
            var countries = await Country
                                    .query()
                                    .orderBy('name', 'asc') as any

        } else {

            // Local site
            var countries = [] as any

        }

        // Success
        return response.json({
            countries: countries,
            address  : address
        })

    }


    /**
     * Update address
     * @param {*} param0 
     * @returns 
     */
    public async update({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Get address
        const address           = await Address
                                            .query()
                                            .where('id', request.input('id'))
                                            .where('customer_id', auth.use('api').user!.id)
                                            .firstOrFail()
        
        // Validate form
        await request.validate(EditValidator)

        // Get General Settings
        const settings          = await SettingsGeneral.first()

        // Get checkout settings
        const checkout_settings = await SettingsCheckout.first()

        // Check if name field required
        if (checkout_settings?.field_name && !request.input('name')) {
            return response.status(400).send('NAME_FIELD_REQUIRED')
        }

        // Check if phone field required
        if (checkout_settings?.field_phone && !request.input('phone')) {
            return response.status(400).send('PHONE_FIELD_REQUIRED')
        }

        // Check if state field required
        if (checkout_settings?.field_state && !request.input('state')) {
            return response.status(400).send('STATE_FIELD_REQUIRED')
        }

        // Check if city field required
        if (checkout_settings?.field_city && !request.input('city')) {
            return response.status(400).send('CITY_FIELD_REQUIRED')
        }

        // Check if address field required
        if (checkout_settings?.field_address && !request.input('address')) {
            return response.status(400).send('ADDRESS_FIELD_REQUIRED')
        }

        // Check if zipcode field required
        if (checkout_settings?.field_zipcode && !request.input('zipcode')) {
            return response.status(400).send('ZIPCODE_FIELD_REQUIRED')
        }
        
        // Update address
        address.name        = request.input('name') ? xss(request.input('name')) : null
        address.phone       = request.input('phone') ? xss(request.input('phone')) : null
        address.country_id  = settings?.is_global ? request.input('country') : settings?.default_country
        address.state       = request.input('state') ? xss(request.input('state')) : null
        address.city        = request.input('city') ? xss(request.input('city')) : null
        address.zipcode     = request.input('zipcode') ? xss(request.input('zipcode')) : null
        address.address     = request.input('address') ? xss(request.input('address')) : null
        await address.save()

        // Success
        return response.noContent()

    }

}
