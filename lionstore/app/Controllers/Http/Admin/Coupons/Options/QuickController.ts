import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from 'App/Models/Coupon'

export default class QuickController {

    /**
     * Enabled selected coupon
     * @param param0 
     * @returns 
     */
    public async enable({ request, response }: HttpContextContract) {

        // Update coupon
        await Coupon
                .query()
                .where('uid', request.input('id'))
                .update({
                    is_active: true
                })

        // Success
        return response.noContent()

    }


    /**
     * Disable selected coupon
     * @param param0 
     * @returns 
     */
    public async disable({ request, response }: HttpContextContract) {

        // Update coupon
        await Coupon
                .query()
                .where('uid', request.input('id'))
                .update({
                    is_active: false
                })

        // Success
        return response.noContent()

    }

}
