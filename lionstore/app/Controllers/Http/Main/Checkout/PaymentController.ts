import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsPayment from 'App/Models/SettingsPayment'
import ServiceOffline from 'App/Models/ServiceOffline'
import ServiceStripe from 'App/Models/ServiceStripe'
import ServicePaypal from 'App/Models/ServicePaypal'
import ServiceCod from 'App/Models/ServiceCod'

export default class AuthController {

    /**
     * Get enabled payment gateways
     * @param param0 
     * @returns 
     */
    public async gateways({ response, session }: HttpContextContract) {

        // Get payment gateways settings
        const settings = await SettingsPayment.find(1)

        // Check if paypal enabled
        if (settings?.is_paypal) {
            var paypal = await ServicePaypal
                                    .query()
                                    .select('id', 'env', 'title', 'description', 'public_key', 'logo_id')
                                    .preload('logo', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .first() as any
        } else {
            var paypal = false as any
        }

        // Check if Stripe enabled
        if (settings?.is_stripe) {
            var stripe = await ServiceStripe
                                    .query()
                                    .select('id', 'title', 'description', 'public_key', 'logo_id')
                                    .preload('logo', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .first() as any
        } else {
            var stripe = false as any
        }

        // Check if offline payment enabled
        if (settings?.is_offline) {
            var offline = await ServiceOffline
                                    .query()
                                    .select('id', 'title', 'description', 'details', 'logo_id')
                                    .preload('logo', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .first() as any
        } else {
            var offline = false as any
        }

        // Check if cash on delivery enabled
        if (settings?.is_cod) {
            var cod = await ServiceCod
                                    .query()
                                    .select('id', 'title', 'description', 'logo_id')
                                    .preload('logo', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .first() as any
        } else {
            var cod = false as any
        }

        // Return data
        return response.json({
            paypal : paypal,
            stripe : stripe,
            offline: offline,
            cod    : cod,
            coupon : session.get('couponInSession') ? session.get('couponInSession') : null
        })

    }

}