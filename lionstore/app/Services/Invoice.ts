import SettingsGeneral from "App/Models/SettingsGeneral"
import Application from '@ioc:Adonis/Core/Application'
import Helpers from "App/Services/Helpers"
import PDFDocument from "pdfkit"
import moment from "moment"
import fs from "fs"

export default class NiceInvoice {

    /**
     * Generate invoice
     * @param order 
     * @param options 
     * @param path 
     */
    static async generate(order, options, path) {

        // Get default site settings
        const settings      = await SettingsGeneral.first()

        // Get default font
        const font          = this.font(settings?.default_language)

        // Strat new pdf document object
        let doc             = new PDFDocument({ size: "A4", margin: 40 });

        // Set order date
        const orderDate     = moment(order.placed_at).format('LLLL');

        // Get translation file depends on default locale
        const translation   = require(`../../resources/locales/${ settings?.default_language }.json`)

        // Get invoice status
        const invoiceStatus = this.invoiceStatus(order.payment, translation, order)

        // Header
        doc.rect(0, 0, 1000, 180).fill('#eceff4')

        // Invoice
        doc
            .font(font.black)
            .fontSize(30)
            .fillColor('#333542')
            .text(translation.t_invoice, 30, 30, { align: 'right' })

        // Company address
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor('#959ca8')
            .moveDown(0.85)
            .text(`${ translation.t_company_address }: ${ settings?.site_address }`, {
                align: 'left',
                width: 400
            })

        // Company email address
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor('#959ca8')
            .moveDown(0.85)
            .text(`${ translation.t_email_address }: ${ settings?.site_email }`, {
                align: 'left',
                width: 400
            })

        // Company phone number
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor('#959ca8')
            .moveDown(0.85)
            .text(`${ translation.t_phone_number }: ${ settings?.site_phone }`, {
                align: 'left',
                width: 400
            })
        
        // Order number
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor('#959ca8')
            .text(`${ translation.t_order_number }: ${ order.order_number }`, 30, 100, { align: 'right' })

        // Order date
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor('#959ca8')
            .text(`${ translation.t_order_date }: ${ orderDate }`, 30, 125, { align: 'right' })

        // Invoice status
        doc
            .font(font.medium)
            .fontSize(9)
            .fillColor(invoiceStatus?.statusColor)
            .text(`${ translation.t_invoice_status }: ${ invoiceStatus?.statusText }`, 30, 150, { align: 'right' })

        doc
            .font(font.black)
            .fontSize(12)
            .fillColor('#959ca8')
            .text(translation.t_billing_to, 30, 210, {
                align: 'left',
                width: 400
            })

        doc
            .font(font.medium)
            .fontSize(10)
            .fillColor('#414141')
            .moveDown(0.5)
            .text(options.shipping.name, {
                align: 'left',
                width: 400
            })
            
        // Set state
        const state = options.shipping.state ? '/ ' + options.shipping.state : ''
        
        // Shipping address
        doc
            .font(font.medium)
            .fontSize(10)
            .fillColor('#959ca8')
            .moveDown(0.5)
            .text(`${ options.shipping.address } - ${ options.shipping.postal_code ? options.shipping.postal_code : '' } ${ options.shipping.city } ${ state }`, {
                align: 'left',
                width: 400
            })

        // Country
        if (settings?.is_global && order.address.country) {
            doc
                .font(font.medium)
                .fontSize(10)
                .fillColor('#959ca8')
                .moveDown(0.5)
                .text(`${ translation.t_country }: ${ order.address.country.name }`, {
                    align: 'left',
                    width: 400
                })
        }

        // Phone number
        doc
            .font(font.medium)
            .fontSize(10)
            .fillColor('#959ca8')
            .moveDown(0.5)
            .text(`${ translation.t_phone_number }: ${ order.address.phone }`, {
                align: 'left',
                width: 400
            })

        doc
            .font(font.medium)
            .fontSize(10)
            .fillColor(invoiceStatus?.brandColor)
            .moveDown(0.5)
            .text(`${ translation.t_payment_method }: ${ invoiceStatus?.method }`, {
                align: 'left',
                width: 400
            })

        // Set invoice products
        await this.invoiceTable(doc, options, font, translation);

        // Set invoice footer
        this.footer(doc, translation);

        doc.end();

        // Set invoice in uploads
        doc.pipe(fs.createWriteStream(path));

    }


    /**
     * Get default invoice font style
     * Depends on application default locale
     * @param locale 
     * @returns 
     */
    static font(locale) {

        // Check default locale
        switch (locale) {

            case 'ar':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Cairo/Cairo-ExtraLight.ttf'),
                    light     : Application.resourcesPath('static/fonts/Cairo/Cairo-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Cairo/Cairo-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Cairo/Cairo-SemiBold.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Cairo/Cairo-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Cairo/Cairo-Black.ttf')
                }
                break;

            case 'az':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
                    light     : Application.resourcesPath('static/fonts/Montserrat/Montserrat-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Montserrat/Montserrat-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Montserrat/Montserrat-SemiBold.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Montserrat/Montserrat-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Montserrat/Montserrat-Black.ttf')
                }
                break;

            case 'cn':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf'),
                    light     : Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf'),
                    regular   : Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf'),
                    medium    : Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf'),
                    bold      : Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf'),
                    black     : Application.resourcesPath('static/fonts/Noto Sans SC/NotoSansSC-Regular.otf')
                }
                break;

            case 'de':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'en':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'es':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'fr':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'hi':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Hind/Hind-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Hind/Hind-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Hind/Hind-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Hind/Hind-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Hind/Hind-SemiBold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Hind/Hind-Bold.ttf')
                }
                break;

            case 'hu':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'jp':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf'),
                    light     : Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf'),
                    regular   : Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf'),
                    medium    : Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf'),
                    bold      : Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf'),
                    black     : Application.resourcesPath('static/fonts/Noto Sans JP/NotoSansJP-Regular.otf')
                }
                break;

            case 'nl':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'po':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'pt':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'ro':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'ru':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'th':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Sarabun/Sarabun-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Sarabun/Sarabun-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Sarabun/Sarabun-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Sarabun/Sarabun-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Sarabun/Sarabun-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Sarabun/Sarabun-ExtraBold.ttf')
                }
                break;

            case 'tr':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;

            case 'ua':
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;
        
            default:
                return {
                    extraLight: Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    light     : Application.resourcesPath('static/fonts/Roboto/Roboto-Light.ttf'),
                    regular   : Application.resourcesPath('static/fonts/Roboto/Roboto-Regular.ttf'),
                    medium    : Application.resourcesPath('static/fonts/Roboto/Roboto-Medium.ttf'),
                    bold      : Application.resourcesPath('static/fonts/Roboto/Roboto-Bold.ttf'),
                    black     : Application.resourcesPath('static/fonts/Roboto/Roboto-Black.ttf')
                }
                break;
        }

    }


    /**
     * Set invoice products
     * @param doc 
     * @param invoice 
     */
    static async invoiceTable (doc, options, font, translation) {

        let i;
        const invoiceTableTop = 360;
    
        doc.font(font.medium);
        
        doc.rect(30, invoiceTableTop - 8, 210, 30).fillAndStroke("#eceff4", "#fff")
        doc.rect(240, invoiceTableTop - 8, 100, 30).fillAndStroke("#eceff4", "#fff")
        doc.rect(340, invoiceTableTop - 8, 120, 30).fillAndStroke("#eceff4", "#fff")
        doc.rect(460, invoiceTableTop - 8, 120, 30).fillAndStroke("#eceff4", "#fff")
    
        doc
            .fontSize(9)
            .fillColor('#999')
            .text(`${ translation.t_product }`, 45, invoiceTableTop)
            .text(`${ translation.t_quantity }`, 255, invoiceTableTop)
            .text(`${ translation.t_price }`, 355, invoiceTableTop)
            .text(`${ translation.t_total }`, 475, invoiceTableTop)
    
        for (i = 0; i < options.items.length; i++) {
    
            const item = options.items[i];
            const position = invoiceTableTop + (i + 1) * 30;
    
            doc
                .fontSize(9)
                .fillColor('#999')
                .text(item.description, 45, position, { width: 190, align: 'left' })
                .text(item.quantity, 255, position, { width: 80, align: 'left' })
                .text(item.price, 355, position, { width: 100, align: 'left' })
                .text(item.total, 475, position, { width: 100, align: 'left' })
    
            // Generate horizontal line
            this.generateHr(doc, position + 35);
        }
    

        // Subtotal amount
        const subtotalPosition = invoiceTableTop + (i + 1) * 40;
        doc.font(font.medium);
        this.totalTable( doc, subtotalPosition, translation.t_subtotal, options.subtotal );

        // Shipping cost
        const shippingPosition = subtotalPosition + 30;
        doc.font(font.medium);
        this.totalTable( doc, shippingPosition, translation.t_shipping, options.shipping_cost );

        // Taxes cost
        const taxesPosition    = shippingPosition + 30;
        doc.font(font.medium);
        this.totalTable( doc, taxesPosition, translation.t_tax, options.taxes_cost );

        // Discount
        const discountPosition    = taxesPosition + 30;
        doc.font(font.medium);
        this.totalTable( doc, discountPosition, translation.t_discount, `- ${ await this.discount(options) }`, '#ff5252' as any );
    

        // Total
        const totalPosition    = discountPosition + 30;
        doc.font(font.medium);
        this.totalTable( doc, totalPosition, translation.t_total, options.total, '#000' as any );

    }
    

    /**
     * Set invoice footer
     * @param doc 
     * @param options 
     */
    static footer (doc, translation) {
        doc.fontSize(10).text(translation.invoice_footer, 50, 780, { align: "center", width: 500 });
    }
    

    /**
     * Generate invoice products table
     * @param doc 
     * @param y 
     * @param name 
     * @param description 
     */
    static totalTable (doc, y, name, description, color = null) {
        doc
            .fontSize(10)
            .text(name, 400, y, { width: 90, align: "left" })
            .fillColor(color ? color : "#9fa0a1")
            .text(description, 0, y, { align: "right" })
            .fillColor('#9fa0a1')
    }
    

    /**
     * Generate Horizontal Line
     * @param doc 
     * @param y 
     */
    static generateHr (doc, y) {
        doc
            .strokeColor("#e9e9e9")
            .lineWidth(0.5)
            .moveTo(30, y)
            .lineTo(550, y)
            .stroke();
    }


    /**
     * Get invoice status
     * @param payment 
     * @param translation 
     * @param order 
     * @returns 
     */
    static invoiceStatus(payment, translation, order) {

        // Check if customer paid using PayPal
        if (payment.payment_method === 'paypal') {
            return {
                method     : translation.t_paypal,
                brandColor : '#0095D7',
                statusColor: '#4BB543',
                statusText : translation.t_paid
            }
        }

        // Check if customer paid using Stripe
        if (payment.payment_method === 'stripe') {
            return {
                method     : translation.t_credit_card,
                brandColor : '#6358F7',
                statusColor: '#4BB543',
                statusText : translation.t_paid
            }
        }

        // Check if cash on delivery
        if (payment.payment_method === 'cod') {
            return {
                method     : translation.t_cash_on_delivery,
                brandColor : '#a8a8a8',
                statusColor: order.order_status === 'delivered' ? '#4BB543' : '#f2d930',
                statusText : order.order_status === 'delivered' ? translation.t_paid : translation.t_pending
            }
        }

        // Check if bank transfer
        if (payment.payment_method === 'offline') {
            return {
                method     : translation.t_bank_transfer,
                brandColor : '#a8a8a8',
                statusColor: order.order_status === 'delivered' ? '#4BB543' : '#f2d930',
                statusText : order.order_status === 'delivered' ? translation.t_paid : translation.t_pending
            }
        }

    }


    /**
     * Get order discount
     * @param options 
     * @returns 
     */
    static async discount(options) {

        // Check if order has discount
        if (options.discount_code, options.discount_value && options.discount_type) {
            
            // Check type of this promotion code
            if (options.discount_type === 'money') {
                        
                // Return how much money will be discount from total
                return await Helpers.formatMoney(Number(options.discount_value), options.order.payment.payment_currency_locale, options.order.payment.payment_currency)

            }

            // Check if type of promotion is a percentage of total price
            if (options.discount_type === 'percentage') {
                
                // Get total price
                const total  = Number(options.order.subtotal_price) + Number(options.order.shipping_cost) + Number(options.order.taxes_cost)

                // Get percentage of total
                const result = total * Number(options.discount_value) / 100
                
                // Now return discount value
                return await Helpers.formatMoney(Number(result), options.order.payment.payment_currency_locale, options.order.payment.payment_currency)

            }

            // Not a valid promotion code
            return await Helpers.formatMoney(0, options.order.payment.payment_currency_locale, options.order.payment.payment_currency)

        } else {

            // No discount
            return await Helpers.formatMoney(0, options.order.payment.payment_currency_locale, options.order.payment.payment_currency)

        }

    }

}