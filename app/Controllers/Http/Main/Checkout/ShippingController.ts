import CreateValidator from 'App/Validators/Main/Customer/Addresses/CreateValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsCheckout from 'App/Models/SettingsCheckout';
import SettingsGeneral from "App/Models/SettingsGeneral";
import { string } from '@ioc:Adonis/Core/Helpers';
import Address from 'App/Models/Address'
import Country from 'App/Models/Country'
import xss from 'xss';

export default class ShippingController {

    /**
     * Get customer addresses
     * @param param0 
     * @returns 
     */
    public async addresses({ response, auth }: HttpContextContract) {

        // Get general settings
        const general  = await SettingsGeneral.first()

        // Check if global site or not
        if (general?.is_global) {
            
            // Get all countries
            var countries = await Country
                                    .query()
                                    .orderBy('name', 'asc') as any

        } else {

            // No need to load all countries
            var countries = [] as any

        }

        try {
            
            // Authenticate customer
            await auth.use('api').authenticate()

            // Get customer's addresses
            const addresses = await Address
                                        .query()
                                        .where('customer_id', auth.user?.id as number)
                                        .orderBy('id', 'desc')

            // Return addresses
            return response.json({
                addresses: addresses,
                countries: countries
            })

        } catch (error) {
            
            // Customer not authenticated
            return response.json({
                addresses: [],
                countries: countries
            })

        }

    }


    /**
     * Create new shipping address
     * @param param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Authenticate customer
        await auth.use('api').authenticate()

        // Validate form
        await request.validate(CreateValidator)

        // Get general settings
        const settings            = await SettingsGeneral.first()

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
              address.uid         = string.generateRandom(32)
              address.customer_id = auth.user?.id as number
              address.name        = request.input('name') ? xss(request.input('name')) : null
              address.phone       = request.input('phone') ? xss(request.input('phone')) : null
              address.country_id  = settings?.is_global ? request.input('country') : settings?.default_country
              address.state       = request.input('state') ? xss(request.input('state')) : null
              address.city        = request.input('city') ? xss(request.input('city')) : null
              address.zipcode     = request.input('zipcode') ? xss(request.input('zipcode')) : null
              address.address     = request.input('address') ? xss(request.input('address')) : null
        await address.save()

        // Return address
        return response.json({
            uid       : address.uid,
            name      : address.name,
            country_id: address.country_id,
            state     : address.state,
            city      : address.city,
            zipcode   : address.zipcode,
            phone     : address.phone,
            address   : address.address
        })

    }

}