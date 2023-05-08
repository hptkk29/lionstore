import SettingsSms from "App/Models/SettingsSms";
import { phone as phoneLibrary } from 'phone';
import Helpers from "App/Services/Helpers";
import Twilio from "App/Gateways/Twilio";

export default class Sms {

    /**
     * Send order confirmed message
     * @param order 
     * @returns 
     */
    static async confirmed(order) {

        // Set settings
        const settings   = await this.settings() as any

        // Check if sms service enabled
        if (settings.is_active && settings.template_order_confirmed) {

            // Check if default gateway is Twilio service
            if (settings.default_gateway === 'twilio') {
                
                // Get confirmed message from database
                const message = await this.message(settings, order, 'confirmed') 

                // Get customer phone number
                const phone   = this.phone(order)

                // Send order confirmed message to customer
                await Twilio.send(phone, message)

                // Success
                return

            }

        }

    }



    /**
     * Send order delivered message
     * @param order 
     * @returns 
     */
    static async delivered(order) {

        // Set settings
        const settings   = await this.settings() as any

        // Check if sms service enabled
        if (settings.is_active && settings.template_order_delivered) {

            // Check if default gateway is Twilio service
            if (settings.default_gateway === 'twilio') {
                
                // Get delivered message from database
                const message = await this.message(settings, order, 'delivered') 

                // Get customer phone number
                const phone   = this.phone(order)

                // Send order delivered message to customer
                await Twilio.send(phone, message)

                // Success
                return

            }

        }

    }



    /**
     * Send order shipped message
     * @param order 
     * @returns 
     */
    static async shipped(order) {

        // Set settings
        const settings   = await this.settings() as any

        // Check if sms service enabled
        if (settings.is_active && settings.template_order_shipped) {

            // Check if default gateway is Twilio service
            if (settings.default_gateway === 'twilio') {
                
                // Get shipped message from database
                const message = await this.message(settings, order, 'shipped') 

                // Get customer phone number
                const phone   = this.phone(order)

                // Send order shipped message to customer
                await Twilio.send(phone, message)

                // Success
                return

            }

        }

    }



    /**
     * Send order refunded message
     * @param order 
     * @returns 
     */
    static async refunded(order) {

        // Set settings
        const settings   = await this.settings() as any

        // Check if sms service enabled
        if (settings.is_active && settings.template_order_refunded) {

            // Check if default gateway is Twilio service
            if (settings.default_gateway === 'twilio') {
                
                // Get refunded message from database
                const message = await this.message(settings, order, 'refunded') 

                // Get customer phone number
                const phone   = this.phone(order)

                // Send order refunded message to customer
                await Twilio.send(phone, message)

                // Success
                return

            }

        }

    }



    /**
     * Send order canceled message
     * @param order 
     * @returns 
     */
    static async canceled(order) {

        // Set settings
        const settings   = await this.settings() as any

        // Check if sms service enabled
        if (settings.is_active && settings.template_order_canceled) {

            // Check if default gateway is Twilio service
            if (settings.default_gateway === 'twilio') {
                
                // Get canceled message from database
                const message = await this.message(settings, order, 'canceled') 

                // Get customer phone number
                const phone   = this.phone(order)

                // Send order canceled message to customer
                await Twilio.send(phone, message)

                // Success
                return

            }

        }

    }



    /**
     * Get sms settings
     * @returns 
     */
    static async settings() {

        // Get sms settings
        const settings = await SettingsSms.first()

        // Return settings
        return settings?.toJSON()

    }



    /**
     * Get formatted message
     * @param settings 
     * @param order 
     * @param type 
     * @returns 
     */
    static async message(settings, order, type) {

        // Set supported template tags
        const tags = {
            "orderNumber": order.order_number,
            "fullname"   : order.address.name,
            "amount"     : await Helpers.formatMoney(order.total_price, order.payment.payment_currency_locale, order.payment.payment_currency)
        }

        // Check if type is confirmed message
        if (type === 'confirmed') {
            
            // Replace tags in saved template
            // @ts-ignore
            const message = settings.template_order_confirmed.replace(/{([^{}]+)}/g, function(keyExpr, key) {
                return tags[key] || "";
            });

            // Now return formatted message
            return message

        }

        // Check if type is delivered message
        if (type === 'delivered') {
            
            // Replace tags in saved template
            // @ts-ignore
            const message = settings.template_order_delivered.replace(/{([^{}]+)}/g, function(keyExpr, key) {
                return tags[key] || "";
            });

            // Now return formatted message
            return message

        }

        // Check if type is shipped message
        if (type === 'shipped') {
            
            // Replace tags in saved template
            // @ts-ignore
            const message = settings.template_order_shipped.replace(/{([^{}]+)}/g, function(keyExpr, key) {
                return tags[key] || "";
            });

            // Now return formatted message
            return message

        }

        // Check if type is refunded message
        if (type === 'refunded') {
            
            // Replace tags in saved template
            // @ts-ignore
            const message = settings.template_order_refunded.replace(/{([^{}]+)}/g, function(keyExpr, key) {
                return tags[key] || "";
            });

            // Now return formatted message
            return message

        }

        // Check if type is canceled message
        if (type === 'canceled') {
            
            // Replace tags in saved template
            // @ts-ignore
            const message = settings.template_order_canceled.replace(/{([^{}]+)}/g, function(keyExpr, key) {
                return tags[key] || "";
            });

            // Now return formatted message
            return message

        }

    }



    /**
     * Format customer phone number
     * @param order 
     * @returns 
     */
    static phone(order) {

        try {
            
            // Get customer phone number
            const phone = order.address.phone

            // Get international phone number
            const toInternational = phoneLibrary(phone, { country: order.address.country.code })

            // Check if valid phone number
            if (toInternational.isValid) {
                
                // Return international format
                return toInternational.phoneNumber

            } else {

                // We couldn't parse phone, return default one
                return phone

            }

        } catch (error) {
            return order.address.phone
        }

    }

}