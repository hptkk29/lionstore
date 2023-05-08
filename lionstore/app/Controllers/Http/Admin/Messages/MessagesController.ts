import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {

    /**
     * Get list of messages
     * @param param0 
     * @returns 
     */
    public async messages({ request, response }: HttpContextContract) {

        // Get current page 
        const page     = request.input('page', 1)

        // Get list of messages
        const messages = await Message
                                    .query()
                                    .orderBy('id', 'desc')
                                    .paginate(page, 50)

        // Return messages
        return response.json(messages.toJSON())

    }

}
