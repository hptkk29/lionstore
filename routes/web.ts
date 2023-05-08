import Route from '@ioc:Adonis/Core/Route'

// Fetch
Route
    .group(() => {

        // Data
        Route.post('configuration', 'ConfigurationController.configuration')

    })
    .namespace('App/Controllers/Http/Main/Fetch')
    .prefix('api/fetch')

// Home
Route
    .group(() => {

        // Home
        Route.post('/', 'HomeController.home')

    })
    .namespace('App/Controllers/Http/Main/Home')
    .prefix('api/home')

// Product
Route
    .group(() => {

        // Product
        Route.post('/', 'ProductController.product')

    })
    .namespace('App/Controllers/Http/Main/Product')
    .prefix('api/product')

// Contact
Route
    .post('contact', 'ContactController.contact')
    .namespace('App/Controllers/Http/Main/Contact')
    .middleware('recaptcha')
    .prefix('api')

// Customer
Route
    .group(() => {

        // Addresses
        Route
            .group(() => {

                // All
                Route
                    .get('/', 'AddressesController.addresses')

                // Options
                Route
                    .group(() => {

                        // Fetch
                        Route
                            .post('fetch', 'CreateController.fetch')

                        // Create
                        Route
                            .post('create', 'CreateController.create')

                        // Edit
                        Route
                            .post('edit', 'EditController.edit')

                        // Update
                        Route
                            .post('update', 'EditController.update')

                        // Delete
                        Route
                            .post('delete', 'DeleteController.remove')

                    })
                    .prefix('options')
                    .namespace('App/Controllers/Http/Main/Customer/Addresses/Options')

            })
            .prefix('addresses')
            .namespace('App/Controllers/Http/Main/Customer/Addresses')

        // Profile
        Route
            .group(() => {

                // Get profile
                Route
                    .post('edit', 'ProfileController.edit')

                // Update profile
                Route
                    .post('update', 'ProfileController.update')

            })
            .prefix('profile')
            .namespace('App/Controllers/Http/Main/Customer/Profile')

        // Orders
        Route
            .group(() => {

                // Orders
                Route
                    .get('/', 'OrdersController.orders')

                // Options
                Route
                    .group(() => {

                        // Delivered
                        Route
                            .post('delivered', 'DeliveredController.delivered')

                        // Cancel
                        Route
                            .post('cancel', 'CancelController.cancel')

                    })
                    .prefix('options')
                    .namespace('App/Controllers/Http/Main/Customer/Orders/Options')

            })
            .prefix('orders')
            .namespace('App/Controllers/Http/Main/Customer/Orders')

        // Favorites
        Route
            .group(() => {

                // All
                Route
                    .get('/', 'FavoritesController.favorites')

                // Options
                Route
                    .group(() => {

                        // Add
                        Route
                            .post('create', 'CreateController.create')

                        // Delete
                        Route
                            .post('delete', 'DeleteController.remove')

                    })
                    .prefix('options')
                    .namespace('App/Controllers/Http/Main/Customer/Favorites/Options')

            })
            .prefix('favorites')
            .namespace('App/Controllers/Http/Main/Customer/Favorites')

        // Reviews
        Route
            .group(() => {

                // All
                Route
                    .get('/', 'ReviewsController.reviews')

                // Options
                Route
                    .group(() => {

                        // Create
                        Route.post('fetch', 'CreateController.fetch')
                        Route.post('create', 'CreateController.create')

                        // Delete
                        Route
                            .post('delete', 'DeleteController.remove')

                    })
                    .prefix('options')
                    .namespace('App/Controllers/Http/Main/Customer/Reviews/Options')

            })
            .prefix('reviews')
            .namespace('App/Controllers/Http/Main/Customer/Reviews')

    })
    .namespace('App/Controllers/Http/Main/Customer')
    .prefix('api/customer')
    .middleware('auth')

// Page
Route
    .post('page', 'PageController.page')
    .namespace('App/Controllers/Http/Main/Page')
    .prefix('api')

// Refund
Route
    .post('request', 'RequestController.request')
    .namespace('App/Controllers/Http/Main/Refund')
    .prefix('api/refund')
    .middleware('recaptcha')

// Search
Route
    .group(() => {

        // Live search
        Route.post('ajax', 'SearchController.ajax')

        // Page search
        Route.get('results', 'SearchController.results')

    })
    .namespace('App/Controllers/Http/Main/Search')
    .prefix('api/search')

// Brand
Route
    .post('brand', 'BrandController.brand')
    .namespace('App/Controllers/Http/Main/Brand')
    .prefix('api')

// Category
Route
    .post('category', 'CategoryController.category')
    .namespace('App/Controllers/Http/Main/Category')
    .prefix('api')

// Subcategory
Route
    .post('subcategory', 'SubcategoryController.subcategory')
    .namespace('App/Controllers/Http/Main/Subcategory')
    .prefix('api')

// Childcategory
Route
    .post('childcategory', 'ChildcategoryController.childcategory')
    .namespace('App/Controllers/Http/Main/Childcategory')
    .prefix('api')

// Cart
Route
    .group(() => {

        // Add
        Route
            .post('add', 'CartController.setCart')

        // Get
        Route
            .get('get', 'CartController.getCart')

        // Delete
        Route
            .post('delete', 'CartController.deleteItem')

        // Increment quantity
        Route
            .post('quantity/increment', 'CartController.incrementQuantity')

        // decrement quantity
        Route
            .post('quantity/decrement', 'CartController.decrementQuantity')

        // Update quantity
        Route
            .post('quantity/update', 'CartController.updateQuantity')

    })
    .namespace('App/Controllers/Http/Main/Cart')
    .prefix('api/cart/options')

// Coupon
Route
    .group(() => {

        // apply
        Route.post('apply', 'CouponController.apply')

        // remove
        Route.post('remove', 'CouponController.remove')

    })
    .namespace('App/Controllers/Http/Main/Coupon')
    .prefix('api/coupon')

// Reviews
Route
    .group(() => {

        // apply
        Route.get('reviews', 'ReviewsController.reviews')

    })
    .namespace('App/Controllers/Http/Main/Reviews')
    .prefix('api')

// Sitemap
Route
    .group(() => {

        // apply
        Route.get('sitemap.xml', 'SitemapController.sitemap')

    })
    .namespace('App/Controllers/Http/Main/Sitemap')
    .prefix('api')

// Checkout
Route
    .group(() => {

        // Auth (Fetch data)
        Route.post('auth/fetch', 'AuthController.fetch')

        // Auth (Sign in)
        Route.post('auth/login', 'AuthController.login')

        // Auth (Register)
        Route.post('auth/register', 'AuthController.register')

        // Shipping addresses
        Route.post('shipping/addresses', 'ShippingController.addresses')

        // Create shipping address
        Route.post('shipping/addresses/create', 'ShippingController.create')

        // Payment gateways
        Route.post('payment/gateways', 'PaymentController.gateways')

        // Done
        Route.post('done', 'DoneController.checkout')

    })
    .namespace('App/Controllers/Http/Main/Checkout')
    .prefix('api/checkout')