import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from 'App/Models/Coupon'

export default class CountriesController {

    /**
     * Get list of coupons
     * @param param0 
     * @returns 
     */
    public async coupons({ request, response }: HttpContextContract) {

        // Get page
        const page      = request.input('page', 1)

        // Get coupons
        const coupons   = await Coupon
                                    .query()
                                    .orderBy('coupon_code', 'asc')
                                    .paginate(page, 50)

        // Success
        return response.json(coupons.toJSON())

    }

}
