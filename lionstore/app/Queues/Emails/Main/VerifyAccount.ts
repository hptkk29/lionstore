import SettingsGeneral from 'App/Models/SettingsGeneral'
import Application from '@ioc:Adonis/Core/Application'
import SettingsSmtp from 'App/Models/SettingsSmtp'
import Config from '@ioc:Adonis/Core/Config'
import Env from '@ioc:Adonis/Core/Env'
import nodemailer from 'nodemailer'
import { I18n } from 'i18n'
import edge from 'edge.js'
import Queue from 'bull'

export default class VerifyAccountQueue {

    public customer    : any;
    public verification: any;

    /**
     * Constructor function
     * @param data 
     */
    constructor (data: Partial<VerifyAccountQueue>) {

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
        const settings_smtp    = await SettingsSmtp.first()

        // Get general settings
        const settings_general = await SettingsGeneral.query().preload('desktop_logo').first()

        // Config smtp
        const transporter      = await this.config(settings_smtp?.toJSON())

        // Config translation
        const i18n             = new I18n({
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
        const logo             = this.logo(settings_general?.toJSON())

        // Set a queue
        const queue            = new Queue('customer::verify::account', { redis: Config.get('redis.connections.local') })

        // Add data to queue
        queue.add({ customer: this.customer, verification: this.verification, locale: settings_general?.default_language, logo: logo })
        
        // Process the queue
        queue.process(async function (job, done) {

            // Set html message to send to customer
            const html = await edge.render('emails/main/verify_account', {
                customer    : job.data.customer,
                locale      : job.data.locale,
                logo        : job.data.logo,
                verification: job.data.verification
            })

            // Send email to admin
            await transporter.sendMail({
                from   : `"${ settings_smtp?.from_name }" <${ settings_smtp?.from_email }>`,
                to     : job.data.customer.email,
                subject: i18n.__('t_email_verify_your_account', { site: settings_general?.site_title }),
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