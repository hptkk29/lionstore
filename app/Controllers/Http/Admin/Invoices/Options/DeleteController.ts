import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Invoice from 'App/Models/Invoice'
import fs from 'fs'

export default class DeleteController {

    /**
     * Remove selected invoices
     * @param param0 
     * @returns 
     */
    public async remove({ request, response }: HttpContextContract) {

        // Get items
        const items    = request.input('items')

        // Loop through items
        for (let index = 0; index < items.length; index++) {

            // Get item
            const item    = items[index]

            // Get invoice
            const invoice = await Invoice
                                        .query()
                                        .where('id', item.id)
                                        .first()

            // Check if invoice exists
            if (invoice) {
                
                // Get PDF file
                const file = Application.resourcesPath(`static/uploads/invoices/${ invoice.invoice_name }.pdf`)

                // Delete file if exists
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file)
                }

                // Now delete invoice
                await invoice.delete()

            }
            
        }

        // Success
        return response.noContent()

    }

}