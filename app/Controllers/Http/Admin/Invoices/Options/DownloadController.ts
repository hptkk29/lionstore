import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'
import fs from 'fs'

export default class InvoicesController {

    /**
     * Download order invoice
     * @param param0 
     */
    public async download({ request, response }: HttpContextContract) {

        // Get invoice id
        const id          = request.input('id')

        // Get invoice
        const invoice     = await Invoice
                                    .query()
                                    .where('id', id)
                                    .firstOrFail()

        // Set invoice file
        const invoiceFile = Application.resourcesPath(`static/uploads/invoices/${invoice.invoice_name}.pdf`)

        // Return invoice file to client side
        if (fs.existsSync(invoiceFile)) {
            const readStream = fs.createReadStream(invoiceFile)
            response.stream(readStream)
        } else {

            // No invoice file found
            return response.noContent()

        }

    }

}