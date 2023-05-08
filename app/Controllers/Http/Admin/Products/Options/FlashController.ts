import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import FlashDeal from 'App/Models/FlashDeal'
import Product from 'App/Models/Product'
import moment from 'moment'

export default class FlashController {

    /**
     * Make new flash deal
     * @param param0 
     */
    public async deal({ request, response }: HttpContextContract) {

        // Get product id
        const productId = request.input('id')

        // Get product
        const product   = await Product
                                    .query()
                                    .where('id', productId)
                                    .firstOrFail()

        // Check if product already in flash deal's list
        const deal      = await FlashDeal
                                    .query()
                                    .where('product_id', product.id)
                                    .first()

        if (deal) {
            
            // Update expiry date
            deal.ends_at = moment(request.input('expiry')).format() as any
            await deal.save()

        } else {

            // Create new flash deal
            const flash            = new FlashDeal
                  flash.uid        = string.generateRandom(32)
                  flash.product_id = product.id
                  flash.ends_at    = moment(request.input('expiry')).format() as any
            await flash.save()

        }

        // Success
        return response.noContent()

    }

}