import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from 'App/Models/Coupon'
import moment from 'moment'

export default class CouponController {

    /**
     * Apply coupon to order
     * @param param0 
     * @returns 
     */
    public async apply({ request, response, session }: HttpContextContract) {

        // Get saved coupon in session
        const couponInSession = session.get('couponInSession', false)

        // Get coupon code
        const code            = request.input('coupon')

        // Get coupon
        const coupon          = await Coupon
                                        .query()
                                        .where('coupon_code', code)
                                        .where('is_active', true)
                                        .firstOrFail()

        // Convert coupon to JSON
        const couponToJson    = coupon.toJSON()

        const today           = moment.utc()

        // Get coupon expiry date
        const expiry          = moment.utc(couponToJson.ends_date)

        // Get start date
        const start           = moment.utc(couponToJson.start_date)

        // Check if coupon already expired
        if (today.isAfter(expiry)) {
            
            // Coupon already expired
            return response.json({
                success: false,
                message: 'COUPON_EXPIRED'
            })

        }

        // Check if coupon start date not yet comes
        if (today.isBefore(start)) {
            
            // Coupon not active yet
            return response.json({
                success: false,
                message: 'COUPON_SOON'
            })

        }

        // Check if coupon usage limited
        if (!coupon.is_unlimited) {
            
            // Check if usage time exceeded
            if (coupon.used_times >= coupon.usage_times) {
                
                // Coupon not valid any more
                return response.json({
                    success: false,
                    message: 'USAGE_EXCEEDED'
                })

            } 

        }

        // Save coupon in a session
        session.put('couponInSession', {
            code   : coupon.coupon_code,
            type   : coupon.coupon_type,
            value  : coupon.discount_value
        })

        // Coupon is valid
        return response.json({
            success: true,
            code   : coupon.coupon_code,
            type   : coupon.coupon_type,
            value  : coupon.discount_value
        })


    }


    /**
     * Remove coupon
     * @param param0 
     * @returns 
     */
    public async remove({ session, response }: HttpContextContract) {

        // Remove coupon from session
        if (session.has('couponInSession')) {
            
            session.forget('couponInSession')

        }

        // Success
        return response.noContent()

    }

}