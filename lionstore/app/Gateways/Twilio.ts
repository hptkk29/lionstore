import ServiceTwilio from "App/Models/ServiceTwilio";

export default class Twilio {

    /**
     * Send sms using Twilio gateway
     * @param to 
     * @param message 
     * @returns 
     */
    static async send(to, message) {

        try {
            
            // Get twilio settings
            const settings = await ServiceTwilio.first()

            // Get twilio package
            const client   = require('twilio')(settings?.account_sid, settings?.auth_token);

            // Send message to customer
            client
                .messages
                .create({
                    body: message,
                    from: settings?.phone,
                    to  : to
                })
                .catch(error => {

                    console.log(error)

                    return {
                        success: false,
                        message: error
                    }

                })

        } catch (error) {

            console.log(error)

            return {
                success: false,
                message: error
            }

        }
        
    }

}