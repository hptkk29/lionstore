import ContactValidator from 'App/Validators/Main/Contact/ContactValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Message from 'App/Models/Message'
import randomstring from 'randomstring'
import xss from 'xss'

export default class ContactController {

    /**
     * Send support message
     * @param param0 
     * @returns 
     */
    public async contact({ request, response }: HttpContextContract) {

        // Validate request
        await request.validate(ContactValidator)

        // Send message to admin
        const message   = new Message()
        message.uid     = randomstring.generate(32)
        message.name    = xss(request.input('name'))
        message.email   = xss(request.input('email'))
        message.phone   = xss(request.input('phone'))
        message.subject = xss(request.input('subject'))
        message.message = xss(request.input('message'))
        message.ip      = request.ip()
        await message.save()

        // Send admin notification
        Event.emit('admin::new::message', { message: message.toJSON() })

        // Send confirmation to this email
        Event.emit('main::support::message', { subject: message.subject, email: message.email })

        // Success
        return response.noContent()

    }

}
