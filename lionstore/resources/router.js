import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)


/**
 * Main routes
 */
 const main_index                   = () => import('~/pages/main/home/home').then(m => m.default || m)
 const main_login                   = () => import('~/pages/main/auth/login').then(m => m.default || m)
 const main_register                = () => import('~/pages/main/auth/register').then(m => m.default || m)
 const main_verify                  = () => import('~/pages/main/auth/verify').then(m => m.default || m)
 const main_facebook_callback       = () => import('~/pages/main/auth/social/facebook').then(m => m.default || m)
 const main_twitter_callback        = () => import('~/pages/main/auth/social/twitter').then(m => m.default || m)
 const main_google_callback         = () => import('~/pages/main/auth/social/google').then(m => m.default || m)
 const main_password_reset          = () => import('~/pages/main/auth/password/reset').then(m => m.default || m)
 const main_password_update         = () => import('~/pages/main/auth/password/update').then(m => m.default || m)
 const main_product                 = () => import('~/pages/main/product/product').then(m => m.default || m)
 const main_page                    = () => import('~/pages/main/pages/page').then(m => m.default || m)
 const main_contact                 = () => import('~/pages/main/contact/contact').then(m => m.default || m)
 const main_customer_settings       = () => import('~/pages/main/customer/settings/settings').then(m => m.default || m)
 const main_customer_addresses      = () => import('~/pages/main/customer/addresses/addresses').then(m => m.default || m)
 const main_customer_create_address = () => import('~/pages/main/customer/addresses/options/create').then(m => m.default || m)
 const main_customer_edit_address   = () => import('~/pages/main/customer/addresses/options/edit').then(m => m.default || m)
 const main_customer_orders         = () => import('~/pages/main/customer/orders/orders').then(m => m.default || m)
 const main_customer_wishlist       = () => import('~/pages/main/customer/wishlist/wishlist').then(m => m.default || m)
 const main_customer_reviews        = () => import('~/pages/main/customer/reviews/reviews').then(m => m.default || m)
 const main_customer_create_review  = () => import('~/pages/main/customer/reviews/options/create').then(m => m.default || m)
 const main_brand                   = () => import('~/pages/main/brand/brand').then(m => m.default || m)
 const main_category                = () => import('~/pages/main/category/category').then(m => m.default || m)
 const main_subcategory             = () => import('~/pages/main/subcategory/subcategory').then(m => m.default || m)
 const main_childcategory           = () => import('~/pages/main/childcategory/childcategory').then(m => m.default || m)
 const main_checkout_cart           = () => import('~/pages/main/checkout/cart').then(m => m.default || m)
 const main_checkout_auth           = () => import('~/pages/main/checkout/auth').then(m => m.default || m)
 const main_checkout_shipping       = () => import('~/pages/main/checkout/shipping').then(m => m.default || m)
 const main_checkout_payment        = () => import('~/pages/main/checkout/payment').then(m => m.default || m)
 const main_checkout_done           = () => import('~/pages/main/checkout/done').then(m => m.default || m)
 const main_request_refund          = () => import('~/pages/main/refund/request').then(m => m.default || m)
 const main_search                  = () => import('~/pages/main/search/search').then(m => m.default || m)


/**
 * Dashboard Routes
 */
const admin_home                 = () => import('~/pages/admin/home/home').then(m => m.default || m)
const admin_create_brand         = () => import('~/pages/admin/brands/options/create').then(m => m.default || m)
const admin_edit_brand           = () => import('~/pages/admin/brands/options/edit').then(m => m.default || m)
const admin_brands               = () => import('~/pages/admin/brands/brands').then(m => m.default || m)
const admin_settings_general     = () => import('~/pages/admin/settings/general').then(m => m.default || m)
const admin_settings_languages   = () => import('~/pages/admin/settings/languages').then(m => m.default || m)
const admin_settings_gateways    = () => import('~/pages/admin/settings/gateways').then(m => m.default || m)
const admin_settings_footer      = () => import('~/pages/admin/settings/footer').then(m => m.default || m)
const admin_settings_auth        = () => import('~/pages/admin/settings/auth').then(m => m.default || m)
const admin_settings_security    = () => import('~/pages/admin/settings/security').then(m => m.default || m)
const admin_settings_smtp        = () => import('~/pages/admin/settings/smtp').then(m => m.default || m)
const admin_settings_currency    = () => import('~/pages/admin/settings/currency').then(m => m.default || m)
const admin_settings_checkout    = () => import('~/pages/admin/settings/checkout').then(m => m.default || m)
const admin_settings_sms         = () => import('~/pages/admin/settings/sms').then(m => m.default || m)
const admin_settings_refunds     = () => import('~/pages/admin/settings/refunds').then(m => m.default || m)
const admin_settings_analytics   = () => import('~/pages/admin/settings/analytics').then(m => m.default || m)
const admin_settings_seo         = () => import('~/pages/admin/settings/seo').then(m => m.default || m)
const admin_customers            = () => import('~/pages/admin/customers/customers').then(m => m.default || m)
const admin_create_customer      = () => import('~/pages/admin/customers/options/create').then(m => m.default || m)
const admin_edit_customer        = () => import('~/pages/admin/customers/options/edit').then(m => m.default || m)
const admin_countries            = () => import('~/pages/admin/countries/countries').then(m => m.default || m)
const admin_create_country       = () => import('~/pages/admin/countries/options/create').then(m => m.default || m)
const admin_edit_country         = () => import('~/pages/admin/countries/options/edit').then(m => m.default || m)
const admin_categories           = () => import('~/pages/admin/categories/categories').then(m => m.default || m)
const admin_create_category      = () => import('~/pages/admin/categories/options/create').then(m => m.default || m)
const admin_edit_category        = () => import('~/pages/admin/categories/options/edit').then(m => m.default || m)
const admin_subcategories        = () => import('~/pages/admin/subcategories/subcategories').then(m => m.default || m)
const admin_create_subcategory   = () => import('~/pages/admin/subcategories/options/create').then(m => m.default || m)
const admin_edit_subcategory     = () => import('~/pages/admin/subcategories/options/edit').then(m => m.default || m)
const admin_childcategories      = () => import('~/pages/admin/childcategories/childcategories').then(m => m.default || m)
const admin_create_childcategory = () => import('~/pages/admin/childcategories/options/create').then(m => m.default || m)
const admin_edit_childcategory   = () => import('~/pages/admin/childcategories/options/edit').then(m => m.default || m)
const admin_sliders              = () => import('~/pages/admin/sliders/sliders').then(m => m.default || m)
const admin_create_slider        = () => import('~/pages/admin/sliders/options/create').then(m => m.default || m)
const admin_edit_slider          = () => import('~/pages/admin/sliders/options/edit').then(m => m.default || m)
const admin_products             = () => import('~/pages/admin/products/products').then(m => m.default || m)
const admin_create_product       = () => import('~/pages/admin/products/options/create').then(m => m.default || m)
const admin_edit_product         = () => import('~/pages/admin/products/options/edit').then(m => m.default || m)
const admin_analytics_product    = () => import('~/pages/admin/products/options/analytics').then(m => m.default || m)
const admin_coupons              = () => import('~/pages/admin/coupons/coupons').then(m => m.default || m)
const admin_create_coupon        = () => import('~/pages/admin/coupons/options/create').then(m => m.default || m)
const admin_edit_coupon          = () => import('~/pages/admin/coupons/options/edit').then(m => m.default || m)
const admin_pages                = () => import('~/pages/admin/pages/pages').then(m => m.default || m)
const admin_create_page          = () => import('~/pages/admin/pages/options/create').then(m => m.default || m)
const admin_edit_page            = () => import('~/pages/admin/pages/options/edit').then(m => m.default || m)
const admin_messages             = () => import('~/pages/admin/messages/messages').then(m => m.default || m)
const admin_keywords             = () => import('~/pages/admin/keywords/keywords').then(m => m.default || m)
const admin_services_cod         = () => import('~/pages/admin/services/cod').then(m => m.default || m)
const admin_services_offline     = () => import('~/pages/admin/services/offline').then(m => m.default || m)
const admin_services_paypal      = () => import('~/pages/admin/services/paypal').then(m => m.default || m)
const admin_services_stripe      = () => import('~/pages/admin/services/stripe').then(m => m.default || m)
const admin_services_twilio      = () => import('~/pages/admin/services/twilio').then(m => m.default || m)
const admin_payments             = () => import('~/pages/admin/payments/payments').then(m => m.default || m)
const admin_orders               = () => import('~/pages/admin/orders/orders').then(m => m.default || m)
const admin_order_details        = () => import('~/pages/admin/orders/options/details').then(m => m.default || m)
const admin_invoices             = () => import('~/pages/admin/invoices/invoices').then(m => m.default || m)
const admin_refunds              = () => import('~/pages/admin/refunds/refunds').then(m => m.default || m)
const admin_flash_deals          = () => import('~/pages/admin/deals/deals').then(m => m.default || m)
const admin_reviews              = () => import('~/pages/admin/reviews/reviews').then(m => m.default || m)


const routes = [

    // Main routes
    { path: '/', name: 'main_index', component: main_index },
    { path: '/auth/login', name: 'main_login', component: main_login },
    { path: '/auth/register', name: 'main_register', component: main_register },
    { path: '/auth/verify', name: 'main_verify', component: main_verify },
    { path: '/auth/facebook/callback', name: 'main_facebook_callback', component: main_facebook_callback },
    { path: '/auth/twitter/callback', name: 'main_twitter_callback', component: main_twitter_callback },
    { path: '/auth/google/callback', name: 'main_google_callback', component: main_google_callback },
    { path: '/auth/password/reset', name: 'main_password_reset', component: main_password_reset },
    { path: '/auth/password/update', name: 'main_password_update', component: main_password_update },
    { path: '/product/:handler', name: 'main_product', component: main_product },
    { path: '/page/:handler', name: 'main_page', component: main_page },
    { path: '/contact', name: 'main_contact', component: main_contact },
    { path: '/customer/settings', name: 'main_customer_settings', component: main_customer_settings },
    { path: '/customer/addresses', name: 'main_customer_addresses', component: main_customer_addresses },
    { path: '/customer/addresses/create', name: 'main_customer_create_address', component: main_customer_create_address },
    { path: '/customer/addresses/edit/:id', name: 'main_customer_edit_address', component: main_customer_edit_address },
    { path: '/customer/orders', name: 'main_customer_orders', component: main_customer_orders },
    { path: '/customer/wishlist', name: 'main_customer_wishlist', component: main_customer_wishlist },
    { path: '/customer/reviews', name: 'main_customer_reviews', component: main_customer_reviews },
    { path: '/customer/reviews/create', name: 'main_customer_create_review', component: main_customer_create_review },
    { path: '/brand/:brand', name: 'main_brand', component: main_brand },
    { path: '/category/:category', name: 'main_category', component: main_category },
    { path: '/category/:category/:subcategory', name: 'main_subcategory', component: main_subcategory },
    { path: '/category/:category/:subcategory/:childcategory', name: 'main_childcategory', component: main_childcategory },
    { path: '/checkout/cart', name: 'main_checkout_cart', component: main_checkout_cart },
    { path: '/checkout/auth', name: 'main_checkout_auth', component: main_checkout_auth },
    { path: '/checkout/shipping', name: 'main_checkout_shipping', component: main_checkout_shipping },
    { path: '/checkout/payment', name: 'main_checkout_payment', component: main_checkout_payment },
    { path: '/checkout/done', name: 'main_checkout_done', component: main_checkout_done },
    { path: '/refund/request', name: 'main_request_refund', component: main_request_refund },
    { path: '/search', name: 'main_search', component: main_search },

    // Controller routes
    { path: '/dashboard', name: 'admin_home', component: admin_home },
    { path: '/dashboard/brands/create', name: 'admin_create_brand', component: admin_create_brand },
    { path: '/dashboard/brands/edit/:id', name: 'admin_edit_brand', component: admin_edit_brand },
    { path: '/dashboard/brands', name: 'admin_brands', component: admin_brands },
    { path: '/dashboard/settings/general', name: 'admin_settings_general', component: admin_settings_general },
    { path: '/dashboard/settings/languages', name: 'admin_settings_languages', component: admin_settings_languages },
    { path: '/dashboard/settings/gateways', name: 'admin_settings_gateways', component: admin_settings_gateways },
    { path: '/dashboard/settings/footer', name: 'admin_settings_footer', component: admin_settings_footer },
    { path: '/dashboard/settings/auth', name: 'admin_settings_auth', component: admin_settings_auth },
    { path: '/dashboard/settings/currency', name: 'admin_settings_currency', component: admin_settings_currency },
    { path: '/dashboard/settings/checkout', name: 'admin_settings_checkout', component: admin_settings_checkout },
    { path: '/dashboard/settings/security', name: 'admin_settings_security', component: admin_settings_security },
    { path: '/dashboard/settings/smtp', name: 'admin_settings_smtp', component: admin_settings_smtp },
    { path: '/dashboard/settings/sms', name: 'admin_settings_sms', component: admin_settings_sms },
    { path: '/dashboard/settings/refunds', name: 'admin_settings_refunds', component: admin_settings_refunds },
    { path: '/dashboard/settings/analytics', name: 'admin_settings_analytics', component: admin_settings_analytics },
    { path: '/dashboard/settings/seo', name: 'admin_settings_seo', component: admin_settings_seo },
    { path: '/dashboard/customers', name: 'admin_customers', component: admin_customers },
    { path: '/dashboard/customers/create', name: 'admin_create_customer', component: admin_create_customer },
    { path: '/dashboard/customers/edit/:id', name: 'admin_edit_customer', component: admin_edit_customer },
    { path: '/dashboard/countries', name: 'admin_countries', component: admin_countries },
    { path: '/dashboard/countries/create', name: 'admin_create_country', component: admin_create_country },
    { path: '/dashboard/countries/edit/:id', name: 'admin_edit_country', component: admin_edit_country },
    { path: '/dashboard/categories', name: 'admin_categories', component: admin_categories },
    { path: '/dashboard/categories/create', name: 'admin_create_category', component: admin_create_category },
    { path: '/dashboard/categories/edit/:id', name: 'admin_edit_category', component: admin_edit_category },
    { path: '/dashboard/subcategories', name: 'admin_subcategories', component: admin_subcategories },
    { path: '/dashboard/subcategories/create', name: 'admin_create_subcategory', component: admin_create_subcategory },
    { path: '/dashboard/subcategories/edit/:id', name: 'admin_edit_subcategory', component: admin_edit_subcategory },
    { path: '/dashboard/childcategories', name: 'admin_childcategories', component: admin_childcategories },
    { path: '/dashboard/childcategories/create', name: 'admin_create_childcategory', component: admin_create_childcategory },
    { path: '/dashboard/childcategories/edit/:id', name: 'admin_edit_childcategory', component: admin_edit_childcategory },
    { path: '/dashboard/sliders', name: 'admin_sliders', component: admin_sliders },
    { path: '/dashboard/sliders/create', name: 'admin_create_slider', component: admin_create_slider },
    { path: '/dashboard/sliders/edit/:id', name: 'admin_edit_slider', component: admin_edit_slider },
    { path: '/dashboard/products', name: 'admin_products', component: admin_products },
    { path: '/dashboard/products/create', name: 'admin_create_product', component: admin_create_product },
    { path: '/dashboard/products/edit/:id', name: 'admin_edit_product', component: admin_edit_product },
    { path: '/dashboard/products/analytics/:id', name: 'admin_analytics_product', component: admin_analytics_product },
    { path: '/dashboard/coupons', name: 'admin_coupons', component: admin_coupons },
    { path: '/dashboard/coupons/create', name: 'admin_create_coupon', component: admin_create_coupon },
    { path: '/dashboard/coupons/edit/:id', name: 'admin_edit_coupon', component: admin_edit_coupon },
    { path: '/dashboard/pages', name: 'admin_pages', component: admin_pages },
    { path: '/dashboard/pages/create', name: 'admin_create_page', component: admin_create_page },
    { path: '/dashboard/pages/edit/:id', name: 'admin_edit_page', component: admin_edit_page },
    { path: '/dashboard/messages', name: 'admin_messages', component: admin_messages },
    { path: '/dashboard/keywords', name: 'admin_keywords', component: admin_keywords },
    { path: '/dashboard/services/cod', name: 'admin_services_cod', component: admin_services_cod },
    { path: '/dashboard/services/offline', name: 'admin_services_offline', component: admin_services_offline },
    { path: '/dashboard/services/paypal', name: 'admin_services_paypal', component: admin_services_paypal },
    { path: '/dashboard/services/stripe', name: 'admin_services_stripe', component: admin_services_stripe },
    { path: '/dashboard/services/twilio', name: 'admin_services_twilio', component: admin_services_twilio },
    { path: '/dashboard/payments', name: 'admin_payments', component: admin_payments },
    { path: '/dashboard/orders', name: 'admin_orders', component: admin_orders },
    { path: '/dashboard/orders/details/:id', name: 'admin_order_details', component: admin_order_details },
    { path: '/dashboard/invoices', name: 'admin_invoices', component: admin_invoices },
    { path: '/dashboard/refunds', name: 'admin_refunds', component: admin_refunds },
    { path: '/dashboard/deals', name: 'admin_flash_deals', component: admin_flash_deals },
    { path: '/dashboard/reviews', name: 'admin_reviews', component: admin_reviews },

]

export function createRouter() {
    return new Router({
        routes,
        scrollBehavior,
        mode: 'history'
    })
}