import CreateValidator from 'App/Validators/Admin/Coupons/CreateValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Coupon from 'App/Models/Coupon'

export default class CreateController {

    /**
     * Create new coupon
     * @param param0 
     * @returns 
     */
    public async create({ request, response }: HttpContextContract) {

        // Validate request
        await request.validate(CreateValidator)

        // Create new coupon
        const coupon                = new Coupon()
              coupon.uid            = string.generateRandom(32)
              coupon.coupon_code    = request.input('code')
              coupon.coupon_type    = request.input('type')
              coupon.discount_value = request.input('value')
              coupon.is_active      = request.input('is_active')
              coupon.is_unlimited   = request.input('unlimited')
              coupon.usage_times    = request.input('usage') ? request.input('usage') : null
              coupon.start_date     = request.input('start_date')
              coupon.ends_date      = request.input('end_date')

        await coupon.save()

        // Success
        return response.noContent()

    }

}
