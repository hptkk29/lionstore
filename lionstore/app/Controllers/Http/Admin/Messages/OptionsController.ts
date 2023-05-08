import ReplyValidator from 'App/Validators/Admin/Messages/ReplyValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import Event from '@ioc:Adonis/Core/Event'

export default class OptionsController {
    
    /**
     * Mark selected message as read
     * @param param0 
     * @returns 
     */
    public async read({ request, response }: HttpContextContract) {

        // Mark item as read
        await Message
                .query()
                .where('id', request.input('id'))
                .update({
                    is_seen: true
                })

        // Success
        return response.noContent()

    }


    /**
     * Reply message
     * @param param0 
     */
    public async reply({ request, response }: HttpContextContract) {

        // Validate form
        await request.validate(ReplyValidator)

        // Get message
        const message = await Message
                                .query()
                                .where('id', request.input('id'))
                                .firstOrFail()

        // Send reply
        Event.emit('admin::message::reply', { 
            message: message.toJSON(), 
            subject: request.input('subject'), 
            reply  : request.input('message') 
        })

        // Mark message as replied
        message.is_replied = true
        message.is_seen    = true
        await message.save()

        // Success
        return response.noContent()

    }


    /**
     * Delete selected messages
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items    = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item = items[index]

            // Delete item
            await Message
                    .query()
                    .where('id', item.id)
                    .delete()

        }

        // Success
        return response.noContent()

    }

}
