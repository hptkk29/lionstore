import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductVisitor from 'App/Models/ProductVisitor'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'

export default class AnalyticsController {

    /**
     * Get product analytics
     * @param param0 
     */
    public async analytics({ request, response }: HttpContextContract) {

        // Get product
        const product           = await Product
                                            .query()
                                            .where('uid', request.input('id'))
                                            .firstOrFail()

        // Get top countries
        const top_countries     = await ProductVisitor
                                            .query()
                                            .select('country_code', 'country', Database.rawQuery('COUNT(country_code) as total'))
                                            .whereNotNull('country_code')
                                            .where('product_id', product.id)
                                            .groupBy('country_code')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top states
        const top_states        = await ProductVisitor
                                            .query()
                                            .select('region', Database.rawQuery('COUNT(region) as total'))
                                            .whereNotNull('region')
                                            .where('product_id', product.id)
                                            .groupBy('region')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top cities
        const top_cities        = await ProductVisitor
                                            .query()
                                            .select('city', Database.rawQuery('COUNT(city) as total'))
                                            .whereNotNull('city')
                                            .where('product_id', product.id)
                                            .groupBy('city')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top UTM Medium
        const top_utm_medium    = await ProductVisitor
                                            .query()
                                            .select('utm_medium', Database.rawQuery('COUNT(utm_medium) as total'))
                                            .whereNotNull('utm_medium')
                                            .where('product_id', product.id)
                                            .groupBy('utm_medium')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top UTM Campaign
        const top_utm_campaign  = await ProductVisitor
                                            .query()
                                            .select('utm_campaign', Database.rawQuery('COUNT(utm_campaign) as total'))
                                            .whereNotNull('utm_campaign')
                                            .where('product_id', product.id)
                                            .groupBy('utm_campaign')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top UTM Source
        const top_utm_source    = await ProductVisitor
                                            .query()
                                            .select('utm_source', Database.rawQuery('COUNT(utm_source) as total'))
                                            .whereNotNull('utm_source')
                                            .where('product_id', product.id)
                                            .groupBy('utm_source')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top browsers
        const top_browsers      = await ProductVisitor
                                            .query()
                                            .select('browser_name', Database.rawQuery('COUNT(browser_name) as total'))
                                            .whereNotNull('browser_name')
                                            .where('product_id', product.id)
                                            .groupBy('browser_name')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top operating systems
        const top_os            = await ProductVisitor
                                            .query()
                                            .select('os_name', Database.rawQuery('COUNT(os_name) as total'))
                                            .whereNotNull('os_name')
                                            .where('product_id', product.id)
                                            .groupBy('os_name')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top devices (phones, desktops)
        const top_devices       = await ProductVisitor
                                            .query()
                                            .select('device_type', Database.rawQuery('COUNT(device_type) as total'))
                                            .whereNotNull('device_type')
                                            .where('product_id', product.id)
                                            .groupBy('device_type')
                                            .orderBy('total', 'desc')
                                            .limit(10)

        // Get top devices names (Apple, Huawei, Sony...)
        const top_devices_names = await ProductVisitor
                                            .query()
                                            .select('device_name', Database.rawQuery('COUNT(device_name) as total'))
                                            .whereNotNull('device_name')
                                            .where('product_id', product.id)
                                            .groupBy('device_name')
                                            .orderBy('total', 'desc')
                                            .limit(10)


        // Return data
        return response.json({
            product         : product,
            top_countries   : top_countries,
            top_states      : top_states,
            top_cities      : top_cities,
            top_utm_medium  : top_utm_medium,
            top_utm_campaign: top_utm_campaign,
            top_utm_source  : top_utm_source,
            top_browsers    : top_browsers,
            top_os          : top_os,
            top_devices     : top_devices,
            top_devices_names: top_devices_names,
        })

    }


    /**
     * Fetch detailed analytics
     * @param param0 
     * @returns 
     */
    public async details({ request, response }: HttpContextContract) {

        // Get product
        const product   = await Product
                                    .query()
                                    .where('uid', request.input('id'))
                                    .firstOrFail()

        // Get current page
        const page      = request.input('page', 1)

        // Fetch detailed analytics
        const analytics = await ProductVisitor
                                    .query()
                                    .where('product_id', product.id)
                                    .orderBy('last_visit', 'desc')
                                    .paginate(page, 10)

        // Return data
        return response.json(analytics.toJSON())

    }

}