import Route from '@ioc:Adonis/Core/Route'

// Home
Route
    .group(() => {

        // analytics
        Route
            .post('analytics', 'HomeController.analytics')

        // Fetch
        Route
            .post('settings', 'FetchController.settings')

    })
    .namespace('App/Controllers/Http/Admin/Home')
    .prefix('api/dashboard')
    .middleware('admin')

// Fetch
Route
    .group(() => {

        // Categories
        Route.get('categories', 'CategoriesController.categories')

        // subCategories
        Route.post('subcategories', 'CategoriesController.subcategories')

        // childCategories
        Route.post('childcategories', 'CategoriesController.childcategories')

    })
    .namespace('App/Controllers/Http/Admin/Fetch')
    .prefix('api/dashboard/fetch')
    .middleware('admin')

// Notifications
Route
    .group(() => {

        // Count
        Route.post('notifications', 'NotificationsController.notifications')

    })
    .namespace('App/Controllers/Http/Admin/Notifications')
    .prefix('api/dashboard')
    .middleware('admin')

// Countries
Route
    .group(() => {

        // All
        Route
            .get('countries', 'CountriesController.countries')

        // Options
        Route
            .group(() => {

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
            .namespace('App/Controllers/Http/Admin/Countries/Options')
            .prefix('countries/options')

    })
    .namespace('App/Controllers/Http/Admin/Countries')
    .prefix('api/dashboard')
    .middleware('admin')

// Customers
Route
    .group(() => {

        // All
        Route
            .get('customers', 'CustomersController.customers')

        // Options
        Route
            .group(() => {

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
            .namespace('App/Controllers/Http/Admin/Customers/Options')
            .prefix('customers/options')

    })
    .namespace('App/Controllers/Http/Admin/Customers')
    .prefix('api/dashboard')
    .middleware('admin')

// Messages
Route
    .group(() => {

        // All
        Route
            .get('messages', 'MessagesController.messages')

        // Read
        Route
            .post('messages/options/read', 'OptionsController.read')

        // Reply
        Route
            .post('messages/options/reply', 'OptionsController.reply')
            
        // Delete
        Route
            .post('messages/options/delete', 'OptionsController.remove')

    })
    .namespace('App/Controllers/Http/Admin/Messages')
    .prefix('api/dashboard')
    .middleware('admin')

// Keywords
Route
    .group(() => {

        // All
        Route
            .get('keywords', 'KeywordsController.keywords')
            
        // Delete
        Route
            .post('keywords/options/delete', 'OptionsController.remove')

    })
    .namespace('App/Controllers/Http/Admin/Keywords')
    .prefix('api/dashboard')
    .middleware('admin')

// Services
Route
    .group(() => {

        // Paypal
        Route.get('paypal', 'PaypalController.settings')
        Route.post('paypal', 'PaypalController.update')

        // Stripe
        Route.get('stripe', 'StripeController.settings')
        Route.post('stripe', 'StripeController.update')

        // Cod
        Route.get('cod', 'CodController.settings')
        Route.post('cod', 'CodController.update')

        // Offline
        Route.get('offline', 'OfflineController.settings')
        Route.post('offline', 'OfflineController.update')

        // Twilio
        Route.get('twilio', 'TwilioController.settings')
        Route.post('twilio', 'TwilioController.update')

    })
    .namespace('App/Controllers/Http/Admin/Services')
    .prefix('api/dashboard/services')
    .middleware('admin')

// Categories
Route
    .group(() => {

        // All
        Route
            .get('categories', 'CategoriesController.categories')

        // Options
        Route
            .group(() => {

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
            .namespace('App/Controllers/Http/Admin/Categories/Options')
            .prefix('categories/options')

    })
    .namespace('App/Controllers/Http/Admin/Categories')
    .prefix('api/dashboard')
    .middleware('admin')

// Subcategories
Route
    .group(() => {

        // All
        Route
            .get('subcategories', 'SubcategoriesController.subcategories')

        // Options
        Route
            .group(() => {

                // Fetch
                Route
                    .post('fetch', 'FetchController.fetch')

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
            .namespace('App/Controllers/Http/Admin/Subcategories/Options')
            .prefix('subcategories/options')

    })
    .namespace('App/Controllers/Http/Admin/Subcategories')
    .prefix('api/dashboard')
    .middleware('admin')

// Childcategories
Route
    .group(() => {

        // All
        Route
            .get('childcategories', 'ChildcategoriesController.childcategories')

        // Options
        Route
            .group(() => {

                // Fetch
                Route
                    .post('fetch', 'FetchController.fetch')

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

                // Featured
                Route
                    .post('featured', 'QuickController.featured')

            })
            .namespace('App/Controllers/Http/Admin/Childcategories/Options')
            .prefix('childcategories/options')

    })
    .namespace('App/Controllers/Http/Admin/Childcategories')
    .prefix('api/dashboard')
    .middleware('admin')

// Coupons
Route
    .group(() => {

        // All
        Route
            .get('coupons', 'CouponsController.coupons')

        // Options
        Route
            .group(() => {

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

                // Enable
                Route
                    .post('enable', 'QuickController.enable')

                // Disable
                Route
                    .post('disable', 'QuickController.disable')

            })
            .namespace('App/Controllers/Http/Admin/Coupons/Options')
            .prefix('coupons/options')

    })
    .namespace('App/Controllers/Http/Admin/Coupons')
    .prefix('api/dashboard')
    .middleware('admin')

// Pages
Route
    .group(() => {

        // All
        Route
            .get('pages', 'PagesController.pages')

        // Options
        Route
            .group(() => {

                // Create
                Route.get('create', 'CreateController.fetch')
                Route.post('create', 'CreateController.create')
                    
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
            .namespace('App/Controllers/Http/Admin/Pages/Options')
            .prefix('pages/options')

    })
    .namespace('App/Controllers/Http/Admin/Pages')
    .prefix('api/dashboard')
    .middleware('admin')

// Brands
Route
    .group(() => {

        // All
        Route
            .get('brands', 'BrandsController.brands')

        // Options
        Route
            .group(() => {

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
            .namespace('App/Controllers/Http/Admin/Brands/Options')
            .prefix('brands/options')

    })
    .namespace('App/Controllers/Http/Admin/Brands')
    .prefix('api/dashboard')
    .middleware('admin')

// Sliders
Route
    .group(() => {

        // All
        Route
            .get('sliders', 'SlidersController.sliders')

        // Options
        Route
            .group(() => {

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
            .namespace('App/Controllers/Http/Admin/Sliders/Options')
            .prefix('sliders/options')

    })
    .namespace('App/Controllers/Http/Admin/Sliders')
    .prefix('api/dashboard')
    .middleware('admin')

// Payments
Route
    .group(() => {

        // All
        Route
            .get('payments', 'PaymentsController.payments')

    })
    .namespace('App/Controllers/Http/Admin/Payments')
    .prefix('api/dashboard')
    .middleware('admin')

// Products
Route
    .group(() => {

        // All
        Route
            .get('products', 'ProductsController.products')

        // Options
        Route
            .group(() => {

                // Create
                Route
                    .post('create', 'CreateController.create')

                // Fetch
                Route
                    .post('fetch', 'FetchController.fetch')
                    
                // Edit
                Route
                    .post('edit', 'EditController.edit')

                // Update
                Route
                    .post('update', 'EditController.update')

                // Flash Deal
                Route
                    .post('flash', 'FlashController.deal')

                // Analytics
                Route.post('analytics', 'AnalyticsController.analytics')
                Route.get('analytics', 'AnalyticsController.details')

                // Delete
                Route
                    .post('delete', 'DeleteController.remove')

            })
            .namespace('App/Controllers/Http/Admin/Products/Options')
            .prefix('products/options')

    })
    .namespace('App/Controllers/Http/Admin/Products')
    .prefix('api/dashboard')
    .middleware('admin')

// Reviews
Route
    .group(() => {

        // All
        Route
            .get('reviews', 'ReviewsController.reviews')

        // Options
        Route
            .group(() => {
                    
                // Approve
                Route
                    .post('approve', 'ApproveController.approve')

                // Edit
                Route
                    .post('edit', 'EditController.edit')

                // Delete
                Route
                    .post('delete', 'DeleteController.remove')

            })
            .namespace('App/Controllers/Http/Admin/Reviews/Options')
            .prefix('reviews/options')

    })
    .namespace('App/Controllers/Http/Admin/Reviews')
    .prefix('api/dashboard')
    .middleware('admin')

// Flash deals
Route
    .group(() => {

        // All
        Route
            .get('/', 'DealsController.deals')

        // Remove
        Route
            .post('delete', 'DeleteController.remove')

    })
    .namespace('App/Controllers/Http/Admin/Deals')
    .prefix('api/dashboard/deals')
    .middleware('admin')

// Orders
Route
    .group(() => {

        // All
        Route
            .get('orders', 'OrdersController.orders')

        // Options
        Route
            .group(() => {

                // Details
                Route
                    .post('details', 'DetailsController.details')

                // Invoice
                Route
                    .post('invoice', 'InvoiceController.invoice')
                    
                // Confirm
                Route
                    .post('confirm', 'ConfirmController.confirm')

                // Shipped
                Route
                    .post('shipped', 'ShippedController.shipped')

                // Delivered
                Route
                    .post('delivered', 'DeliveredController.delivered')

                // Refunded
                Route
                    .post('refunded', 'RefundedController.refunded')

                // Canceled
                Route
                    .post('canceled', 'CanceledController.canceled')

                // Notes
                Route
                    .post('notes', 'NotesController.notes')

                // Delete
                Route
                    .post('delete', 'DeleteController.remove')

            })
            .namespace('App/Controllers/Http/Admin/Orders/Options')
            .prefix('orders/options')

    })
    .namespace('App/Controllers/Http/Admin/Orders')
    .prefix('api/dashboard')
    .middleware('admin')

// Invoices
Route
    .group(() => {

        // All
        Route
            .get('invoices', 'InvoicesController.invoices')

        // Options
        Route
            .group(() => {

                // Download
                Route
                    .post('download', 'DownloadController.download')

                // Delete
                Route
                    .post('delete', 'DeleteController.remove')

            })
            .namespace('App/Controllers/Http/Admin/Invoices/Options')
            .prefix('invoices/options')

    })
    .namespace('App/Controllers/Http/Admin/Invoices')
    .prefix('api/dashboard')
    .middleware('admin')

// Refunds
Route
    .group(() => {

        // All
        Route
            .get('refunds', 'RefundsController.refunds')

        // Options
        Route
            .group(() => {

                // Process
                Route
                    .post('process', 'ProcessController.process')

                // Read
                Route
                    .post('read', 'ReadController.read')

                // Delete
                Route
                    .post('delete', 'DeleteController.remove')

            })
            .namespace('App/Controllers/Http/Admin/Refunds/Options')
            .prefix('refunds/options')

    })
    .namespace('App/Controllers/Http/Admin/Refunds')
    .prefix('api/dashboard')
    .middleware('admin')

// Settings
Route
    .group(() => {

        // General
        Route.get('general', 'GeneralController.settings')
        Route.post('general', 'GeneralController.update')

        // Languages
        Route.get('languages', 'LanguagesController.settings')
        Route.post('languages', 'LanguagesController.update')

        // Gateways
        Route.get('gateways', 'GatewaysController.settings')
        Route.post('gateways', 'GatewaysController.update')

        // Footer
        Route.get('footer', 'FooterController.settings')
        Route.post('footer', 'FooterController.update')

        // Auth
        Route.get('auth', 'AuthController.settings')
        Route.post('auth', 'AuthController.update')

        // Security
        Route.get('security', 'SecurityController.settings')
        Route.post('security', 'SecurityController.update')

        // Smtp
        Route.get('smtp', 'SmtpController.settings')
        Route.post('smtp', 'SmtpController.update')

        // Currency
        Route.get('currency', 'CurrencyController.settings')
        Route.post('currency', 'CurrencyController.update')

        // Seo
        Route.get('seo', 'SeoController.settings')
        Route.post('seo', 'SeoController.update')

        // Checkout
        Route.get('checkout', 'CheckoutController.settings')
        Route.post('checkout', 'CheckoutController.update')

        // Sms
        Route.get('sms', 'SmsController.settings')
        Route.post('sms', 'SmsController.update')

        // Refunds
        Route.get('refunds', 'RefundsController.settings')
        Route.post('refunds', 'RefundsController.update')

        // Analytics
        Route.get('analytics', 'AnalyticsController.settings')
        Route.post('analytics', 'AnalyticsController.update')

    })
    .namespace('App/Controllers/Http/Admin/Settings')
    .prefix('api/dashboard/settings')
    .middleware('admin')