import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fromEntries from 'object.fromentries'
import Product from 'App/Models/Product'

export default class CartController {

    /**
     * Add product to cart
     * @param {*} param0 
     * @returns 
     */
    public async setCart({ request, response, session }: HttpContextContract) {
        
        // Get product id
        const productId         = request.input('productId')

        // Get product quantity
        const quantity          = request.input('quantity')

        // Get order variants
        const variants          = request.input('variants')

        // Get product
        const product           = await Product
                                            .query()
                                            .where('pid', productId)
                                            .where('is_active', true)
                                            .select(
                                                'id',
                                                'uid',
                                                'pid',
                                                'media_small_id',
                                                'handler',
                                                'discount_type',
                                                'discount_value',
                                                'rating',
                                                'price',
                                                'purchase_unit',
                                                'shipping_type',
                                                'shipping_cost',
                                                'product_barcode',
                                                'tax_value',
                                                'tax_type'
                                            )
                                            .preload('translation')
                                            .preload('thumbnail', (builder) => {
                                                builder.select('id', 'uid', 'file_folder')
                                            })
                                            .preload('variants')
                                            .preload('variants_attributes')
                                            .firstOrFail()

        // serialize product
        const serializer        = product.toJSON()

        // Set product attributes groups
        const attributes_groups = this.attributes(serializer)

        // Get products in cart
        var items               = session.get('itemsInCart')
        
        // Check if typeof items is array
        if (Array.isArray(items) && items.length > 0) {
            
            // Check if item already exists in cart
            let itemIsExists = items.find(item => {
                return item.productId === productId
            })

            if (itemIsExists) {

                // Check if product has variants
                if (Array.isArray(serializer.variants)) {

                    // Check if selected form variants length = product variants length
                    if (variants.length === serializer.variants.length && variants.length > 0 && serializer.variants.length > 0) {

                        // Set current values
                        var values = []

                        // Loop through form variants
                        for (let v = 0; v < variants.length; v++) {

                            const element = variants[v]

                            // Add form value to list
                            values.push(element.variant_value as never)

                        }

                        for (let a = 0; a < attributes_groups.length; a++) {
                            const attribute = attributes_groups[a] as any;

                            if (attribute.value.every(v => values.includes(v as never))) {

                                // Set product price
                                var price = attribute.price[0]

                                break

                            }

                        }


                    } else {

                        // Check if product has discount
                        if (serializer.discount_type && serializer.discount_value) {
                            // Money discount
                            if (serializer.discount_type === 'money') {

                                var price = Number(serializer.price) - Number(serializer.discount_value) as any

                            } else if (serializer.discount_type === 'percentage') {


                                var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                            }

                        } else {

                            // Not all variants selected yet, return general price
                            var price = serializer.price

                        }

                    }

                } else {

                    // Check if product has discount
                    if (serializer.discount_type && serializer.discount_value) {
                        // Money discount
                        if (serializer.discount_type === 'money') {

                            var price = Number(serializer.price) - Number(serializer.discount_value) as any

                        } else if (serializer.discount_type === 'percentage') {


                            var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                        }

                    } else {

                        // Not all variants selected yet, return general price
                        var price = serializer.price

                    }

                }

                // Get this item index
                var itemIndex              = items.indexOf(itemIsExists)

                items[itemIndex].quantity  = Number(itemIsExists.quantity) + Number(quantity)

                items[itemIndex].product   = serializer

                items[itemIndex].price     = price

                items[itemIndex].productId = serializer.productId

                items[itemIndex].total     = price * (Number(itemIsExists.quantity) + Number(quantity))

                // Update product varianst
                items[itemIndex].variants  = variants

                // Update cart
                session.put('itemsInCart', [...new Set(items)])

            } else {


                // Check if product has variants
                if (Array.isArray(serializer.variants)) {

                    // Check if selected form variants length = product variants length
                    if (variants.length === serializer.variants.length && variants.length > 0 && serializer.variants.length > 0) {

                        // Set current values
                        var values = []

                        // Loop through form variants
                        for (let v = 0; v < variants.length; v++) {

                            const element = variants[v];

                            // Add form value to list
                            values.push(element.variant_value as never)

                        }

                        for (let a = 0; a < attributes_groups.length; a++) {
                            const attribute = attributes_groups[a] as any

                            if (attribute.value.every(v => values.includes(v as never))) {

                                // Set product price
                                var price = attribute.price[0]

                                break

                            }

                        }


                    } else {

                        // Check if product has discount
                        if (serializer.discount_type && serializer.discount_value) {
                            // Money discount
                            if (serializer.discount_type === 'money') {

                                var price = Number(serializer.price) - Number(serializer.discount_value) as any

                            } else if (serializer.discount_type === 'percentage') {


                                var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                            }

                        } else {

                            // Not all variants selected yet, return general price
                            var price = serializer.price

                        }

                    }

                } else {

                    // Check if product has discount
                    if (serializer.discount_type && serializer.discount_value) {
                        // Money discount
                        if (serializer.discount_type === 'money') {

                            var price = Number(serializer.price) - Number(serializer.discount_value) as any

                        } else if (serializer.discount_type === 'percentage') {


                            var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                        }

                    } else {

                        // Not all variants selected yet, return general price
                        var price = serializer.price

                    }

                }

                // Item not exists add to list
                let setNewItem = [{
                    product  : product,
                    productId: productId,
                    quantity : quantity,
                    variants : variants,
                    price    : price,
                    total    : price * quantity
                }]

                // Add item to existing cart
                let concatToItems = items.concat(setNewItem)

                // Update cart
                session.put('itemsInCart', [...new Set(concatToItems)])

            }

        } else {

            // Check if product has variants
            if (Array.isArray(serializer.variants) && serializer.variants.length > 0) {
                
                // Check if selected form variants length = product variants length
                if (variants.length === serializer.variants.length && variants.length > 0 && serializer.variants.length > 0) {

                    // Set current values
                    var values = []

                    var price = null as any

                    // Loop through form variants
                    for (let v = 0; v < variants.length; v++) {

                        const element = variants[v]

                        // Add form value to list
                        values.push(element.variant_value as never)

                    }

                    for (let a = 0; a < attributes_groups.length; a++) {
                        const attribute = attributes_groups[a] as any

                        if (attribute.value.every(v => values.includes(v as never))) {

                            // Set product price
                            price = attribute.price[0]

                            break

                        }

                    }


                } else {

                    // Check if product has discount
                    if (serializer.discount_type && serializer.discount_value) {
                        // Money discount
                        if (serializer.discount_type === 'money') {

                            var price = Number(serializer.price) - Number(serializer.discount_value) as any

                        } else if (serializer.discount_type === 'percentage') {


                            var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                        }

                    } else {

                        // Not all variants selected yet, return general price
                        var price = serializer.price

                    }

                }

            } else {

                // Check if product has discount
                if (serializer.discount_type && serializer.discount_value) {
                    // Money discount
                    if (serializer.discount_type === 'money') {

                        var price = Number(serializer.price) - Number(serializer.discount_value) as any

                    } else if (serializer.discount_type === 'percentage') {


                        var price = Number(serializer.price) - Number( Number(serializer.price) * Number(serializer.discount_value) / 100 ) as any

                    }

                } else {

                    // Not all variants selected yet, return general price
                    var price = serializer.price

                }

            }

            // Item not exists add to list
            let newElement = [{
                product  : product,
                productId: productId,
                quantity : quantity,
                variants : variants,
                price    : price,
                total    : price * quantity
            }]
            
            // Add item to existing cart
            let newElementConcat = [].concat(newElement as any)

            // Update cart
            session.put('itemsInCart', [...new Set(newElementConcat)])

        }
        
        // Return response
        return response.json(session.get('itemsInCart'))

    }


    /**
     * Get products in cart
     * @param {*} param0 
     */
    public async getCart({ response, session }: HttpContextContract) {
        
        // Set and empty array
        var empty         = []

        // Get product in session
        const itemsInCart = session.get('itemsInCart')

        // Check if items exists in cart
        if (Array.isArray(itemsInCart)) {
            
            // Loop through items in array
            for (let index = 0; index < itemsInCart.length; index++) {

                const element = itemsInCart[index]
                
                // Check if a product id is valid
                if (element.productId) {

                    // Add item to empty array
                    empty.push(element.productId as never)

                }

            }
            
            // Get products in cart
            var products = await Product
                                    .query()
                                    .whereIn('pid', empty)
                                    .where('is_active', true)
                                    .select(
                                        'id',
                                        'uid',
                                        'pid',
                                        'media_small_id',
                                        'handler',
                                        'discount_type',
                                        'discount_value',
                                        'rating',
                                        'price',
                                        'purchase_unit',
                                        'shipping_type',
                                        'shipping_cost',
                                        'product_barcode',
                                        'tax_value',
                                        'tax_type'
                                    )
                                    .preload('translation')
                                    .preload('thumbnail', (builder) => {
                                        builder.select('id', 'uid', 'file_folder')
                                    })
                                    .preload('variants')
                                    .preload('variants_attributes') as any

        } else {

            // No products in cart
            var products = null as any

        }
        
        // Success
        return response.json({
            products   : products ? products : null,
            itemsInCart: itemsInCart
        })

    }


    /**
     * 
     * @param {*} param0 
     */
    public async deleteItem({ request, response, session }: HttpContextContract) {

        // Get products in cart
        var items = session.get('itemsInCart')
        
        // Check if typeof items is array
        if (Array.isArray(items)) {

            // Search product in cart
            var product = items.find(item => {
                return item.productId === request.input('productId')
            })

            // Check if product exists
            if (product) {

                var index = items.indexOf(product)

                items.splice(index, 1)

                var newItems = items

                session.forget('itemsInCart')

                // Set new items in cart
                session.put('itemsInCart', newItems)

            }

        }

        // Success
        return response.noContent()

    }


    /**
     * Get product variants attributes as array
     * @param {*} product 
     */
    public attributes(product) {

        // Set Data to return
        var data                = []

        // Set empty array for variants attributes
        var variants_attributes = []

        // Loop through product variants attributes
        for (let a = 0; a < product.variants_attributes.length; a++) {

            const element = product.variants_attributes[a];

            const item    = Object.entries(JSON.parse(element.attributes))

            variants_attributes.push(fromEntries(item) as never)

        }

        // Set an empty array
        var list = []

        // Loop through variants attributes array
        for (let b = 0; b < variants_attributes.length; b++) {
            const element = variants_attributes[b];

            let t         = Object.assign({}, element)

            let s         = Object.values(t) as any

            let result    = {}

            s.forEach(item => {
                Object.keys(item as any).forEach(key => {
                    if (!result[key]) {
                        result[key] = [];
                    }
                    result[key].push(item[key] as any);
                })
            })

            list.push(result as never)

        }

        // Add attributes group
        for (let c = 0; c < list.length; c++) {

            const element = list[c];

            data.push(element)

        }

        // Success
        return data
    }


    /**
     * Increment Quantity
     * @param {*} param0 
     * @returns 
     */
    public async incrementQuantity({ request, response, session }: HttpContextContract) {

        // Get products in cart
        var items = session.get('itemsInCart')

        // Check if typeof items is array
        if (Array.isArray(items)) {

            // Search product in cart
            var product = items.find(item => {
                return item.productId === request.input('productId')
            })

            // Check if product exists
            if (product) {

                var index = items.indexOf(product)

                items[index].quantity = items[index].quantity + 1
                items[index].total    = Number(items[index].quantity) * Number(items[index].price)

                var newItems = items

                session.forget('itemsInCart')

                // Set new items in cart
                session.put('itemsInCart', newItems)

            }

        }

        // Success
        return response.noContent()

    }


    /**
     * Decrement Quantity
     * @param {*} param0 
     * @returns 
     */
    public async decrementQuantity({ request, response, session }: HttpContextContract) {

        // Get products in cart
        var items = session.get('itemsInCart')

        // Check if typeof items is array
        if (Array.isArray(items)) {

            // Search product in cart
            var product = items.find(item => {
                return item.productId === request.input('productId')
            })

            // Check if product exists
            if (product) {

                var index = items.indexOf(product)

                items[index].quantity = items[index].quantity - 1
                items[index].total    = Number(items[index].quantity) * Number(items[index].price)

                var newItems = items

                session.forget('itemsInCart')

                // Set new items in cart
                session.put('itemsInCart', newItems)

            }

        }

        // Success
        return response.noContent()

    }


    /**
     * Update Quantity
     * @param {*} param0 
     * @returns 
     */
    public async updateQuantity({ request, response, session }: HttpContextContract) {

        // Get products in cart
        var items = session.get('itemsInCart')

        // Check if typeof items is array
        if (Array.isArray(items)) {

            // Search product in cart
            var product = items.find(item => {
                return item.productId === request.input('productId')
            })

            // Check if product exists
            if (product) {

                var index = items.indexOf(product)

                items[index].quantity = Number(request.input('quantity'))
                items[index].total    = Number(request.input('quantity')) * Number(items[index].price)

                var newItems = items

                session.forget('itemsInCart')

                // Set new items in cart
                session.put('itemsInCart', newItems)

            }

        }

        // Success
        return response.noContent()

    }

}