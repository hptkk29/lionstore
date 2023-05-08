import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderProductVariant from 'App/Models/OrderProductVariant'
import SettingsCheckout from 'App/Models/SettingsCheckout'
import SettingsGeneral from 'App/Models/SettingsGeneral'
import OrderAddress from 'App/Models/OrderAddress'
import OrderProduct from 'App/Models/OrderProduct'
import { string } from '@ioc:Adonis/Core/Helpers'
import Offline from 'App/Gateways/Offline'
import Event from '@ioc:Adonis/Core/Event'
import PayPal from 'App/Gateways/PayPal'
import Stripe from 'App/Gateways/Stripe'
import Product from 'App/Models/Product'
import Address from 'App/Models/Address'
import randomstring from 'randomstring'
import Coupon from 'App/Models/Coupon'
import Order from 'App/Models/Order'
import COD from 'App/Gateways/COD'
import xss from 'xss'

export default class DoneController {

    /**
     * Place order now
     * @param {*} param0 
     * @returns 
     */
    public async checkout({ request, response, auth, session }: HttpContextContract) {

        // Get customer id
        try {

            // Authenticate customer
            await auth.use('api').authenticate()
            
            // Set customer id
            var customerId = auth.user?.id as any

            // Set customer object
            var customer   = auth.user as any

        } catch (error) {
            var customerId = false as any
            var customer   = false as any
        }

        // Get products in cart
        const products              = request.input('products')

        // Generate unique id for the order
        const uniqueId              = string.generateRandom(32)

        // Get customer ip address
        const ipAddress             = request.ip()
        
        // Generate number for order id
        const uniqueNumber          = randomstring.generate({ length: 8, charset: 'numeric' })

        // Generate order number
        const orderNumber           = `${ new Date().getFullYear() }-${uniqueNumber}`

        // Check if cart has any promotion code
        const promotion             = session.get('couponInSession')
        
        // Count total products price
        const total                 = this.total(products, promotion)

        // Count subtotal price
        const subtotal              = this.subtotal(products)

        // Count shipping cost
        const shipping              = this.shipping(products)

        // Count total taxes cost
        const tax                   = this.tax(products)

        // Get payment method
        const paymentMethod         = request.input('payment_method')

        // Check what payment gateway the customer selected
        if (paymentMethod === 'paypal') {
            
            // Make a paypal transaction
            var payment = await PayPal.make(request.input('payment_token'), customerId, orderNumber) as any

            // Check if payment failed
            if (!payment.success) {
                
                // Payment failed show customer error message
                return response.badRequest()

            }

        } else if (paymentMethod === 'stripe') {
            
            // Make a stripe transaction
            var payment = await Stripe.make(request, customer ? customer.email : null, total, customerId, orderNumber) as any

            // Check if payment failed
            if (!payment.success) {
                
                // Payment failed show customer error message
                return response.badRequest()

            }

        } else if (paymentMethod === 'offline') {
            
            // Make an offline transaction
            var payment = await Offline.make(customerId, orderNumber, total) as any

            // Check if payment failed
            if (!payment.success) {
                
                // Payment failed show customer error message
                return response.badRequest()

            }

        } else if (paymentMethod === 'cod') {

            // Make a cash on delivery transaction
            var payment = await COD.make(customerId, orderNumber, total) as any

            // Check if payment failed
            if (!payment.success) {
                
                // Payment failed show customer error message
                return response.badRequest()

            }

        }
        
        // Save order
        const order                   = new Order()
              order.uid               = uniqueId
              order.customer_id       = customerId ? customerId : null
              order.customer_ip       = ipAddress
              order.order_number      = orderNumber
              order.order_status      = "new"
              order.payment_id        = payment.payment
              order.total_price       = total as any
              order.subtotal_price    = subtotal as any
              order.shipping_cost     = shipping as any
              order.taxes_cost        = tax as any
              order.discount_code     = promotion && promotion.code ? promotion.code : null
              order.discount_type     = promotion && promotion.type ? promotion.type : null
              order.discount_value    = promotion && promotion.value ? promotion.value : null
              order.order_source_name = request.input('source') === 'mobile' ? 'mobile' : 'desktop'
        await order.save()

        // Save order products
        await this.saveProducts(products, order.id)

        // Save order address
        const orderAddress = await this.saveAddress(order.id, request, customerId)

        // Order set successfully, now clear cart
        session.forget('itemsInCart')

        // And now clear coupon code if there is one
        session.forget('couponInSession')

        // Send admin notification
        Event.emit('admin::order::pending', { order: order.toJSON() })

        // Send customer order details to his email (if exists)
        if (customer) {
            Event.emit('main::customer::order::details', {
                order   : order.toJSON(),
                email   : customer.email,
                products: products,
                address : orderAddress
            })
        }

        // Now if customer used a coupon we need to update that coupon status
        if (promotion && promotion.code) {
            await this.updateCoupon(promotion.code)
        }

        // Return order details to customer and thank him
        return response.json({
            success         : true,
            products        : products,
            order           : orderNumber,
            total           : total,
            subtotal        : subtotal,
            shipping        : shipping,
            tax             : tax,
            coupon_code     : order.discount_code ? order.discount_code : null,
            coupon_type     : order.discount_type ? order.discount_type : null,
            coupon_value    : order.discount_value ? order.discount_value : null,
            date            : order.placed_at,
            email           : customer ? customer.email : null,
            payment         : request.input('payment_method'),
            address_name    : orderAddress.name,
            address_phone   : orderAddress.phone,
            address_content : orderAddress.address,
            address_state   : orderAddress.state,
            address_city    : orderAddress.city,
            address_zipcode : orderAddress.zipcode,
        })

    }


    /**
     * Get subtotal price
     * @param products 
     * @returns 
     */
    public subtotal(products) {

        // Set empty total variable
        var total = 0

        // Loop through products in cart
        for (let index = 0; index < products.length; index++) {

            // Get item in cart
            const item = products[index];

            // Check if product has discount
            if (item.product.discount_type && item.product.discount_value) {

                // Money discount
                if (item.product.discount_type === 'money') {
                    
                    // Calculate total price 
                    const sub  = Number(item.product.price) - Number(item.product.discount_value)

                    // Calculate subtotal
                    total += Number(sub) * Number(item.quantity)

                } else if (item.product.discount_type === 'percentage') {

                    // Calculate total price 
                    const sub  = Number(item.product.price) - Number( Number(item.product.price) * Number(item.product.discount_value) / 100 )

                    // Calculate subtotal
                    total += Number(sub) * Number(item.quantity)

                }

            } else {

                // Calculate subtotal
                total += Number(item.price) * Number(item.quantity)

            }
            
        }

        return Number(total)

    }


    /**
     * Get total shipping cost
     * @param products 
     * @returns 
     */
    public shipping(products) {

        // Set empty total variable
        var total = 0

        // Loop through product
        for (let index = 0; index < products.length; index++) {

            // Get product
            const product = products[index].product;

            // Check if product has shipping price
            if (product.shipping_cost) {
                
                // Add shipping cost
                total += Number(product.shipping_cost)

            }
            
        }

        // Return total shipping cost
        return Number(total)

    }


    /**
     * Count total taxes cost
     * @param products 
     * @returns 
     */
    public tax(products) {

        // Set empty total variable
        var total = 0

        // Loop through product
        for (let index = 0; index < products.length; index++) {

            // Get product
            const product = products[index].product;

            // Check if product has tax
            if (product.tax_value) {
                
                // Add tax cost
                total += Number(product.tax_value)

            }
            
        }

        // Return total taxes cost
        return Number(total)

    }


    /**
     * Count discount value
     * @param promotion 
     * @param products 
     * @returns 
     */
    public discount(promotion, products) {
        
        // Check if customer has a valid coupon code
        if (promotion && (promotion.code && promotion.value && promotion.type)) {
            
            // Check type of this promotion code
            if (promotion.type === 'money') {
                
                // Return how much money will be discount from total
                return Number(promotion.value)

            }

            // Check if type of promotion is a percentage of total price
            if (promotion.type === 'percentage') {
                
                // Get total price
                const total  = Number(this.subtotal(products)) + Number(this.shipping(products)) + Number(this.tax(products))

                // Get percentage of total
                const result = total * Number(promotion.value) / 100

                // Now return discount value
                return Number(result)

            }

            // Not a valid promotion code
            return 0

        } else {

            // Customer does not have any coupon
            return 0

        }

    }


    /**
     * Count total price
     * @returns 
     */
    public total(products, promotion) {

        // Calculate total price
        const total    = Number(this.subtotal(products)) + Number(this.shipping(products)) + Number(this.tax(products))

        // Get discount value
        const discount = this.discount(promotion, products)

        // Check if cart has a promotion code
        if (discount > 0) {
            
            return Number(total) - Number(discount)

        }
        
        // Cart has no promotion code
        return total

    }


    /**
     * Save order products
     * @param {*} products 
     * @param {*} orderId 
     * @returns 
     */
    public async saveProducts(products, orderId) {

        // Check if products are array and available
        if (Array.isArray(products) && products.length > 0) {
            
            // Set empty array of products id
            var ids           = []

            // Loop through products
            for (let a = 0; a < products.length; a++) {

                const product = products[a];

                // Add product id list
                ids.push(product.productId as never)
                
            }

            // Search products
            const query       = await Product
                                        .query()
                                        .whereIn('pid', ids)
                                        .where('is_active', true)
                                        .preload('variants')
                                        .preload('variants_attributes')

            // Loop through products in database
            for (let b = 0; b < query.length; b++) {

                const element                 = query[b];

                // Search quantity
                const findItem                = products.find(item => item.productId === element.pid)

                if (findItem) {
                    var quantity = findItem.quantity as number
                } else {
                    var quantity = 1
                }

                // Save product in orders
                const orderProduct                   = new OrderProduct()
                      orderProduct.uid               = string.generateRandom(32)
                      orderProduct.order_id          = orderId
                      orderProduct.product_id        = element.id
                      orderProduct.quantity          = quantity
                      orderProduct.single_price      = Number(findItem.price)
                      orderProduct.total_price       = Number(findItem.total)
                await orderProduct.save()

                // Save order product variants
                const orderProductVariant            = new OrderProductVariant()
                      orderProductVariant.uid        = string.generateRandom(32)
                      orderProductVariant.order_id   = orderId
                      orderProductVariant.product_id = element.id
                      orderProductVariant.variants   = findItem.variants ? JSON.stringify(findItem.variants) : null
                await orderProductVariant.save()

            }

        } else {
            
            // No products are set
            return false

        }

    }


    /**
     * Save order address
     * @param {*} orderId 
     * @param {*} request 
     * @param {*} customerId 
     */
    public async saveAddress(orderId, request, customerId) {

        // Get geo settings
        const settings                     = await SettingsGeneral.first()

        // Get checkout settings
        const checkout_settings            = await SettingsCheckout.first()

        // Check if user loggedIn
        if (customerId) {
            
            // Get address id
            const addressId                = xss(request.input('addressId'))

            // Get address
            const address                  = await Address
                                                        .query()
                                                        .where('customer_id', customerId)
                                                        .where('uid', addressId)
                                                        .firstOrFail()

            // Save order address
            const orderAddress             = new OrderAddress()
                  orderAddress.uid         = string.generateRandom(32)
                  orderAddress.customer_id = customerId
                  orderAddress.order_id    = orderId
                  orderAddress.name        = address.name
                  orderAddress.phone       = address.phone
                  orderAddress.country_id  = settings?.is_global ? address.country_id : settings?.default_country as number
                  orderAddress.state       = address.state
                  orderAddress.city        = address.city
                  orderAddress.address     = address.address
                  orderAddress.zipcode     = address.zipcode
            await orderAddress.save()

            // Return address
            return orderAddress.toJSON()

        } else {

            // Save address as guest
            const address                  = new OrderAddress()
                  address.uid              = string.generateRandom(32)
                  address.customer_id      = null
                  address.order_id         = orderId
                  address.name             = checkout_settings?.field_name ? request.input('name') ? xss(request.input('name')) : null : null
                  address.phone            = checkout_settings?.field_phone ? request.input('phone') ? xss(request.input('phone')) : null : null
                  address.country_id       = settings?.is_global ? request.input('country_id') ? xss(request.input('country_id')) : settings?.default_country : null as any
                  address.state            = checkout_settings?.field_state ? request.input('state') ? xss(request.input('state')) : null : null
                  address.city             = checkout_settings?.field_city ? request.input('city') ? xss(request.input('city')) : null : null
                  address.zipcode          = checkout_settings?.field_zipcode ? request.input('zipcode') ? xss(request.input('zipcode')) : null : null
                  address.address          = checkout_settings?.field_address ? request.input('address') ? xss(request.input('address')) : null : null
            await address.save()

            // Return address
            return address.toJSON()

        }

    }


    /**
     * Update coupon after usage
     * @param code 
     * @returns 
     */
    public async updateCoupon(code) {

        // Update coupon
        await Coupon
                .query()
                .where('coupon_code', code)
                .increment('used_times', 1)

    }

}