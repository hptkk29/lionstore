import AdonisServer from '@ioc:Adonis/Core/Server'
import Env from '@ioc:Adonis/Core/Env'
import { Server } from 'socket.io'

class Ws {
    public io: Server
    private booted = false

    public boot() {
        /**
         * Ignore multiple calls to the boot method
         */
        if (this.booted) {
            return
        }

        this.booted = true
        this.io     = new Server(AdonisServer.instance!, {
            cors: {
                origin     : this.getURLs(),
                methods    : ["GET", "POST"],
                credentials: true
            }
        })
    }


    /**
     * Get allowed orogins
     * @returns 
     */
    public getURLs() {

        try {
            
            // Get app url
            const url      = Env.get('APP_URL')

            const hostname = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]

            // Get app url parsed
            // @ts-ignore
            const parsed   = new URL(url)

            // Set origins url
            var origins    = []

            // Push www url
            origins.push(`${ parsed.protocol }//www.${ hostname }` as never)

            // Push non www url
            origins.push(`${ parsed.protocol }//${ hostname }` as never)

            // Return origins
            return origins

        } catch (error) {
            return [Env.get('APP_URL')]
        }

    }
}

export default new Ws()