import CreateValidator from 'App/Validators/Main/Customer/Addresses/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import Country from 'App/Models/Country'
import Address from 'App/Models/Address'
import randomstring from 'randomstring'
import xss from 'xss'
import SettingsCheckout from 'App/Models/SettingsCheckout'

export default class CreateController {

    /**
     * Fetch settings before create a new address
     * @param param0 
     * @returns 
     */
    public async fetch({ response }: HttpContextContract) {

        // Get general settings
        const settings    = await SettingsGeneral.find(1) as any

        // Check if global site or not
        if (settings?.is_global) {
            
            // Get all countries
            var countries = await Country
                                    .query()
                                    .orderBy('name', 'asc') as any

        } else {

            // No need to load all countries
            var countries = [] as any

        }

        // Return countries
        return response.json(countries)

    }



    /**
     * Create new address
     * @param {*} param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Validate request
        await request.validate(CreateValidator)

        // Get customer id
        const customerId          = auth.use('api').user!.id

        // Validate if global site or local
        const settings            = await SettingsGeneral.find(1)

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

        // Create address
        const address             = new Address()
              address.uid         = randomstring.generate(32)
              address.customer_id = customerId
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
