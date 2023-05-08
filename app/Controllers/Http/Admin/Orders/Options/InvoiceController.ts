import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import Application from '@ioc:Adonis/Core/Application'
import NiceInvoice from 'App/Services/Invoice'
import Helpers from 'App/Services/Helpers'
import Invoice from 'App/Models/Invoice'
import randomstring from 'randomstring'
import Order from 'App/Models/Order'
import fs from 'fs'

export default class OrdersController {

    /**
     * Generate product invoice
     * @param {*} param0 
     * @returns 
     */
    public async invoice({ request, response }: HttpContextContract) {

        // Get order
        const order    = await Order
                                    .query()
                                    .where('id', request.input('id'))
                                    .preload('invoice')
                                    .preload('payment')
                                    .preload('address', (builder) => {
                                        builder
                                            .preload('country')
                                    })
                                    .preload('products', (builder) => {
                                        builder.preload('product', (query) =>  {
                                            query.preload('translation')
                                        })
                                    })
                                    .preload('variants')
                                    .firstOrFail()
        
        // Get general settings
        const settings = await SettingsGeneral.first()
        
        // Check if order already has an invoice saved
        if (order.invoice) {
            
            // Set invoice file
            const invoiceFile = Application.resourcesPath(`static/uploads/invoices/${order.invoice.invoice_name}.pdf`)

            // Return invoice file to client side
            if (fs.existsSync(invoiceFile)) {
                const readStream = fs.createReadStream(invoiceFile)
                response.stream(readStream)
            }

        } else {

            // No invoice saved, generate new one
            const invoiceDetail = {

                order         : order.toJSON(),
                items         : this.items(order, settings?.default_language),
                subtotal      : await Helpers.formatMoney( Number(order.subtotal_price), order.payment.payment_currency_locale as any, order.payment.payment_currency as any ),
                total         : await Helpers.formatMoney( Number(order.total_price), order.payment.payment_currency_locale as any, order.payment.payment_currency as any ),
                shipping_cost : await Helpers.formatMoney( Number(order.shipping_cost), order.payment.payment_currency_locale as any, order.payment.payment_currency as any ),
                taxes_cost    : await Helpers.formatMoney( Number(order.taxes_cost), order.payment.payment_currency_locale as any, order.payment.payment_currency as any ),
                discount_code : order.discount_code,
                discount_type : order.discount_type,
                discount_value: order.discount_value,
                order_number  : order.order_number,
                shipping      : {
                    name       : order.address.name ? order.address.name : null,
                    address    : order.address.address ? order.address.address : null,
                    city       : order.address.city ? order.address.city : null,
                    state      : order.address.state ? order.address.state : null,
                    postal_code: order.address.zipcode ? order.address.zipcode : null
                }

            }

            // Generate invoice name
            const invoice_name     = `${ order.order_number }-${ randomstring.generate(20) }`

            // Set invoice file
            const invoiceFile      = Application.resourcesPath(`static/uploads/invoices/${ invoice_name }.pdf`)

            // Save invoice now
            await NiceInvoice.generate(order.toJSON(), invoiceDetail, invoiceFile)
            
            // Save invoice
            const invoice          = new Invoice()
            invoice.uid            = randomstring.generate(32)
            invoice.order_id       = order.id
            invoice.invoice_name   = invoice_name
            invoice.invoice_status = this.invoiceStatus(order.toJSON()) as string
            invoice.invoice_amount = order.total_price
            await invoice.save()

            // Update order invoice
            order.invoice_id       = invoice.id
            await order.save()

            // Download invoice after generate it
            if (fs.existsSync(invoiceFile)) {
                const readStream = fs.createReadStream(invoiceFile)
                response.stream(readStream)
            }
        }

    }



    /**
     * Get invoice items
     * @param {*} order 
     * @returns 
     */
    public items(order, locale) {

        // Set empty variable
        var items = []

        // Loop throug order products
        for (let index = 0; index < order.products.length; index++) {

            const element = order.products[index];

            // Get product title
            const title = element.product.translation.title

            // Generate item
            const item = {
                description: JSON.parse(title)[locale],
                quantity   : element.quantity,
                price      : element.single_price,
                total      : element.total_price
            }

            // Push item
            items.push(item as never)
            
        }

        // Return items
        return items

    }


    /**
     * Get invoice status
     * @param payment 
     */
    public invoiceStatus(order) {

        // Check if customer paid using paypal or stripe
        if (order.payment.payment_method === 'paypal' || order.payment.payment_method === 'stripe') {
            return 'paid'
        }

        // Check if customer choosed cach on delivery
        if (order.payment.payment_method === 'cod') {
            
            // Check if customer received his goods
            if (order.order_status === 'delivered') {
                return 'paid'
            } else {
                return 'pending'
            }

        }

        // Check if customer choosed bank transfer
        if (order.payment.payment_method === 'offline') {
            
            // Check if customer received his goods
            if (order.order_status === 'delivered') {
                return 'paid'
            } else {
                return 'pending'
            }

        }

    }

}