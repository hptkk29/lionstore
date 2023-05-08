import BotDetector    from "device-detector-js/dist/parsers/bot"
import ProductVisitor from 'App/Models/ProductVisitor'
import Env            from '@ioc:Adonis/Core/Env'
import Config         from '@ioc:Adonis/Core/Config'
import Product        from 'App/Models/Product'
import randomstring   from 'randomstring'
import parser         from 'ua-parser-js'
import moment         from 'moment'
import device         from 'device'
import axios          from 'axios'
import Queue          from 'bull'

export default class ProductTrackingQueue {

    public productId : any;
    public ipAddress : any;
    public userAgent : any;
    public acceptLang: any;
    public referer   : any;
    public requestUrl: any;

    /**
     * Constructor function
     * @param data 
     */
    constructor (data: Partial<ProductTrackingQueue>) {
        Object.assign(this, data)
    }

    
    /**
     * Start new queue
     */
    public async queue() {

        // Set a queue
        const queue = new Queue('product::track', { redis: Config.get('redis.connections.local') })

        // Add data to queue
        queue.add({ productId: this.productId, ipAddress: this.ipAddress, userAgent: this.userAgent, acceptLang: this.acceptLang, referer: this.referer, requestUrl: this.requestUrl })

        // Access this
        const vm    = this

        // Process the queue
        queue.process(async function (job, done) {

            try {
                    
                // @ts-ignore
                const urlParams   = new URL(`${Env.get('APP_URL')}${job.data.requestUrl}`)
                
                // Check if already visit this product
                const isVisited   = await ProductVisitor
                                                .query()
                                                .where('product_id', job.data.productId)
                                                .where('ip', job.data.ipAddress)
                                                .where('user_agent', job.data.userAgent)
                                                .where('url_queries', urlParams.searchParams.toString())
                                                .first()
                
                if (isVisited) {
                    
                    // Update last visit
                    isVisited.last_visit = moment().format("YYYY-MM-DD HH:mm:ss") as any
                    await isVisited.save()

                    // Success
                    done()

                    // Return
                    return

                }

                
                // Get geolocation
                const geolocation = await vm.getLocation(job.data.ipAddress)
                
                // Get user agent
                const ua          = job.data.userAgent

                // Get user ip
                const ip          = job.data.ipAddress

                // Get device info
                const info        = parser(ua)

                // Detect bot agent
                const botDetector = new BotDetector()

                const bot         = botDetector.parse(ua)

                // Get device type
                const getDevice   = device(ua)

                // Set new visit
                await ProductVisitor.create({
                    uid              : randomstring.generate(32),
                    product_id       : job.data.productId,
                    ip               : ip,
                    country          : geolocation.country_name ? geolocation.country_name : null,
                    country_code     : geolocation.country_code ? geolocation.country_code : null,
                    region           : geolocation.region_name ? geolocation.region_name : null,
                    region_code      : geolocation.region_code ? geolocation.region_code : null,
                    city             : geolocation.city ? geolocation.city : null,
                    zip_code         : geolocation.zip_code ? geolocation.zip_code : null,
                    timezone         : geolocation.time_zone ? geolocation.time_zone : null,
                    latitude         : geolocation.latitude ? geolocation.latitude : null,
                    longitude        : geolocation.longitude ? geolocation.longitude : null,
                    user_agent       : ua ? ua : null,
                    browser_name     : info.browser.name ? info.browser.name : null,
                    browser_version  : info.browser.version ? info.browser.version : null,
                    browser_language : job.data.acceptLang ? job.data.acceptLang : null,
                    os_name          : info.os.name ? info.os.name : null,
                    os_version       : info.os.version ? info.os.version : null,
                    engine_name      : info.engine.name ? info.engine.name : null,
                    engine_version   : info.engine.version ? info.engine.version : null,
                    device_name      : info.device.vendor ? info.device.vendor : null,
                    device_model     : getDevice.model ? getDevice.model : null,
                    device_type      : getDevice.type ? getDevice.type : null,
                    cpu_architecture : info.cpu.architecture ? info.cpu.architecture : null,
                    bot_name         : bot ? bot.name : null,
                    bot_category     : bot ? bot.category : null,
                    bot_url          : bot ? bot.url : null,
                    bot_producer_name: bot ? bot.producer.name : null,
                    bot_producer_url : bot ? bot.producer.url : null,
                    utm_medium       : urlParams.searchParams.has('utm_medium') ? urlParams.searchParams.get('utm_medium') : null,
                    utm_campaign     : urlParams.searchParams.has('utm_campaign') ? urlParams.searchParams.get('utm_campaign') : null,
                    utm_source       : urlParams.searchParams.has('utm_source') ? urlParams.searchParams.get('utm_source') : null,
                    url_queries      : urlParams.searchParams.toString(),
                    visit_from       : urlParams.searchParams.has('ref') ? urlParams.searchParams.get('ref') : null,
                    referrer         : job.data.referer ? job.data.referer : null
                })
                
                // Update product visits
                await Product
                        .query()
                        .where('id', job.data.productId)
                        .increment('visits', 1)

            } catch (err) {

                // Error
                console.log("Product Tracking Error: " + err)

            }

        })
        .catch(error => {
              console.log(error)
        });

    }


    /**
     * Get ip address details
     * @param ip 
     * @returns 
     */
    public async getLocation(ip) {

        // Set request headers
        const headers = {
            headers: {
                "accept"      : "application/json",
                "content-type": "application/json"
            }
        }

        // Set request url
        const url     = `https://freegeoip.app/json/${ip}`

        // Set empty data
        var data      = {
            country_code: null,
            country_name: null,
            region_code : null,
            region_name : null,
            city        : null,
            zip_code    : null,
            time_zone   : null,
            latitude    : null,
            longitude   : null
        }

        await axios
                .get(url, headers)
                .then(response => {

                    // Overwrite data
                    Object.assign(data, response.data)

                })
                .catch((error) => {

                    // Log error message
                    console.log(error)

                    // Set null geolocation data after error
                    Object.assign(data, {
                        country_code: null,
                        country_name: null,
                        region_code : null,
                        region_name : null,
                        city        : null,
                        zip_code    : null,
                        time_zone   : null,
                        latitude    : null,
                        longitude   : null
                    })

                })

        return data

    }

}