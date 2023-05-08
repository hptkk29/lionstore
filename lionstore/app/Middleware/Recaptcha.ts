import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsSecurity from 'App/Models/SettingsSecurity'
import axios from "axios"

export default class Recaptcha {

  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {

        // Get security settings
        const settings = await SettingsSecurity.find(1)

        // Check if recaptcha enabled
        if (settings?.is_recaptcha) {
            
            // Get reCaptcha token
            const token = request.input('recaptcha_token')

            try {

                // Hitting POST request to the URL, Google will
                // respond with success or error scenario.
                const url    = `https://www.google.com/recaptcha/api/siteverify?secret=${ settings.recaptcha_secret_key }&response=${token}`
  
                // Send request to Google servers
                let res = await axios.post(url)
                
                // reCaptcha error
                if (!res.data.success) {
                    // Not authenticated
                    response.unauthorized('E_CAPTCHA')
                    return
                }

            } catch (errors) {
                // Not authenticated
                response.unauthorized('E_CAPTCHA')
                return
            }

        }

        // code for middleware goes here. ABOVE THE NEXT CALL
        await next()

  }
  
}
