import EditValidator from 'App/Validators/Admin/Coupons/EditValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from 'App/Models/Coupon'

export default class EditController {

    /**
     * Get coupon to edit
     * @param param0 
     * @returns 
     */
    public async edit({ request, response }: HttpContextContract) {

        // Get coupon id
        const id         = request.input('id')

        // Get coupon
        const coupon     = await Coupon
                                    .query()
                                    .where('uid', id)
                                    .firstOrFail()

        // Return coupon
        return response.json({
            coupon    : coupon.toJSON()
        })

    }


    /**
     * Update coupon
     * @param param0 
     * @returns 
     */
    public async update({ request, response }: HttpContextContract) {

        // Get coupon id
        const id     = request.input('id')

        // Get coupon
        const coupon = await Coupon
                                .query()
                                .where('id', id)
                                .firstOrFail()

        // Validate request
        await request.validate(EditValidator)

        // Update coupon
        coupon.coupon_code    = request.input('coupon_code')
        coupon.coupon_type    = request.input('coupon_type')
        coupon.discount_value = request.input('discount_value')
        coupon.is_active      = request.input('is_active')
        coupon.is_unlimited   = request.input('is_unlimited')
        coupon.usage_times    = request.input('usage_times') ? request.input('usage') : null
        coupon.start_date     = request.input('start_date')
        coupon.ends_date      = request.input('end_date')

        await coupon.save()

        // Success
        return response.noContent()

    }

}
