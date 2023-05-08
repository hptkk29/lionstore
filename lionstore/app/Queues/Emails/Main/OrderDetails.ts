import SettingsGeneral from 'App/Models/SettingsGeneral'
import Application from '@ioc:Adonis/Core/Application'
import SettingsSmtp from 'App/Models/SettingsSmtp'
import Config from '@ioc:Adonis/Core/Config'
import Env from '@ioc:Adonis/Core/Env'
import nodemailer from 'nodemailer'
import { I18n } from 'i18n'
import edge from 'edge.js'
import Queue from 'bull'
import SettingsCurrency from 'App/Models/SettingsCurrency'

export default class OrderDetailsQueue {

    public order   : any;
    public email   : any;
    public products: any;
    public address : any;

    /**
     * Constructor function
     * @param data 
     */
    constructor (data: Partial<OrderDetailsQueue>) {

        // Config Edge engine
        edge.mount(Application.resourcesPath('views'))

        // Set data
        Object.assign(this, data)

    }

    
    /**
     * Start new queue
     */
    public async queue() {

        // Get smtp settings
        const settings_smtp     = await SettingsSmtp.first()

        // Get general settings
        const settings_general  = await SettingsGeneral.query().preload('desktop_logo').first()

        // Config smtp
        const transporter       = await this.config(settings_smtp?.toJSON())

        // Get currency settings
        const settings_currency = await SettingsCurrency.first()

        // Config translation
        const i18n              = new I18n({
            locales      : ['ar', 'az', 'cn', 'de', 'en', 'es', 'fr', 'hi', 'hu', 'jp', 'nl', 'po', 'pt', 'ro', 'ru', 'th', 'tr', 'ua'],
            directory    : Application.resourcesPath('locales'),
            defaultLocale: settings_general?.default_language,
            fallbacks    : { 
                ar: 'en',
                az: 'en',
                cn: 'en',
                de: 'en',
                en: 'en',
                es: 'en',
                fr: 'en',
                hi: 'en',
                hu: 'en',
                jp: 'en',
                nl: 'en',
                po: 'en',
                pt: 'en',
                ro: 'en',
                ru: 'en',
                th: 'en',
                tr: 'en',
                ua: 'en',
            }
        })

        // Get site logo
        const logo              = this.logo(settings_general?.toJSON())

        // Set a queue
        const queue             = new Queue('main::customer::order::details', { redis: Config.get('redis.connections.local') })

        // Add data to queue
        queue.add({ order: this.order, email: this.email, products: this.products, address: this.address, locale: settings_general?.default_language, logo: logo, currency_locale: settings_currency?.locale, currency_code: settings_currency?.code })

        // Process the queue
        queue.process(async function (job, done) {

            // Set html message to send to customer
            const html = await edge.render('emails/main/order_details', {
                currency_locale: job.data.currency_locale,
                currency_code  : job.data.currency_code,
                products       : job.data.products,
                address        : job.data.address,
                order          : job.data.order,
                locale         : job.data.locale,
                logo           : job.data.logo
            })

            // Send email to admin
            await transporter.sendMail({
                from   : `"${ settings_smtp?.from_name }" <${ settings_smtp?.from_email }>`,
                to     : job.data.email,
                subject: i18n.__('t_email_order_details_subject', { site: settings_general?.site_title }),
                html   : html
            });
          
            // call done when finished
            done();

        })
        .catch(error => {
              console.log(error)
        });

    }

    
    /**
     * Config SMTP
     */
    public config(params) {

       // Config mail smtp 
       let transporter = nodemailer.createTransport({
            host  : params.host,
            port  : params.port,
            secure: params.is_secure,
            auth  : {
                user: params.username,
                pass: params.password
            }
        })

        // Return transporter
        return transporter

    }


    /**
     * Get site logo
     * @param settings 
     * @returns 
     */
    public logo(settings) {

        // Check if site has a logo
        if (settings.desktop_logo) {
           
            // Return logo
            return `${ Env.get('APP_URL') }/uploads/${ settings.desktop_logo.file_folder }/${ settings.desktop_logo.uid }.webp`

        } else {

            // Return default logo
            return `${ Env.get('APP_URL') }/images/default/logo.svg`

        }

    }

}