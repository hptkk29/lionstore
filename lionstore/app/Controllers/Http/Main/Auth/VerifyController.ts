import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Verification from 'App/Models/Verification'
import Customer from 'App/Models/Customer'
import moment from 'moment'
import xss from 'xss'

export default class VerifyController {

    /**
     * Verify customer account
     * @param param0 
     * @returns 
     */
    public async verify({ request, response }: HttpContextContract) {

        // Get verification token
        const token        = xss(request.input('token'))

        // Get verification
        const verification = await Verification
                                            .query()
                                            .where('token', token)
                                            .firstOrFail()

        // Check if token expired
        const isExpired    = moment()
                                .subtract(60, 'minutes')
                                .isAfter( moment(verification.toJSON().created_at) )
                                 
        // Token expired
        if (isExpired) {
            
            return response.unauthorized('TOKEN_EXPIRED')
            
        }

        // Activate customer account
        await Customer
                    .query()
                    .where('id', verification.customer_id)
                    .where('is_verified', false)
                    .update({
                        is_verified: true
                    })

        // Now delete verification token
        await verification.delete()

        // Success
        return response.noContent()

    }

}
