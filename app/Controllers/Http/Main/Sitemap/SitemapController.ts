import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SitemapStream, streamToPromise } from 'sitemap'
import Childcategory from 'App/Models/Childcategory'
import SettingsSeo from 'App/Models/SettingsSeo'
import Subcategory from 'App/Models/Subcategory'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import Env from '@ioc:Adonis/Core/Env'
import Brand from 'App/Models/Brand'
import Page from 'App/Models/Page'
import { Readable } from 'stream'
import moment from 'moment'


export default class SitemapController {

    /**
     * Get list of routes for sitemap
     * @param {*} param0 
     */
    public async sitemap({ response }: HttpContextContract) {
        try {
            
            // Get seo settings
            const settings            = await SettingsSeo.first()

            // Check if sitemap enabled
            if (settings?.is_sitemap) {
                
                // Get list of products
                const products        = await Product
                                                .query()
                                                .where('is_active', true)

                // Get categories
                const categories      = await Category.all()

                // Get subcategories
                const subcategories   = await Subcategory
                                                .query()
                                                .preload('parent')

                // Get childcategories
                const childcategories = await Childcategory
                                                .query()
                                                .preload('category')
                                                .preload('subcategory')

                // Get pages
                const pages           = await Page.all()

                // Get brands
                const brands          = await Brand.all()

                // Set empty array var
                var data              = []

                // Generate sitemap routes for products
                for (let index = 0; index < products.length; index++) {

                    // Get product
                    const product = products[index]

                    // Generate route for sitemap
                    const route   = {
                        url       : `/product/${ product.handler }`,
                        changefreq: 'weekly',
                        priority  : 0.9,
                        lastmod   : moment(product.updatedAt).toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Generate sitemap routes for categories
                for (let index = 0; index < categories.length; index++) {

                    // Get category
                    const category = categories[index]

                    // Generate route for sitemap
                    const route    = {
                        url       : `/category/${ category.handler }`,
                        changefreq: 'monthly',
                        priority  : 0.7,
                        lastmod   : moment(category.updatedAt).toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Generate sitemap routes for subcategories
                for (let index = 0; index < subcategories.length; index++) {

                    // Get subcategory
                    const subcategory = subcategories[index]

                    // Generate route for sitemap
                    const route       = {
                        url       : `/category/${ subcategory.parent.handler }/${ subcategory.handler }`,
                        changefreq: 'monthly',
                        priority  : 0.7,
                        lastmod   : moment(subcategory.updatedAt).toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Generate sitemap routes for childcategories
                for (let index = 0; index < childcategories.length; index++) {

                    // Get childcategory
                    const childcategory = childcategories[index]

                    // Generate route for sitemap
                    const route         = {
                        url       : `/category/${ childcategory.category.handler }/${ childcategory.subcategory.handler }/${ childcategory.handler }`,
                        changefreq: 'monthly',
                        priority  : 0.7,
                        lastmod   : moment(childcategory.updatedAt).toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Generate sitemap routes for pages
                for (let index = 0; index < pages.length; index++) {

                    // Get page
                    const page = pages[index]

                    // Generate route for sitemap
                    const route   = {
                        url       : `/page/${ page.handler }`,
                        changefreq: 'monthly',
                        priority  : 0.5,
                        lastmod   : moment(page.updatedAt).toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Generate sitemap routes for brands
                for (let index = 0; index < brands.length; index++) {

                    // Get page
                    const brand = brands[index]

                    // Generate route for sitemap
                    const route   = {
                        url       : `/brand/${ brand.handler }`,
                        changefreq: 'monthly',
                        priority  : 0.5,
                        lastmod   : moment().toISOString()
                    }

                    // Insert route in data array
                    data.push(route as never)

                }

                // Add home page
                data.push({
                    url       : `/`,
                    changefreq: 'daily',
                    priority  : 1,
                    lastmod   : moment().toISOString()
                } as never)

                // Add contact page
                data.push({
                    url       : `/contact`,
                    changefreq: 'yearly',
                    priority  : 0.3,
                    lastmod   : moment().toISOString()
                } as never)

                // Add login page
                data.push({
                    url       : `/auth/login`,
                    changefreq: 'yearly',
                    priority  : 0.3,
                    lastmod   : moment().toISOString()
                } as never)

                // Add register page
                data.push({
                    url       : `/auth/register`,
                    changefreq: 'yearly',
                    priority  : 0.3,
                    lastmod   : moment().toISOString()
                }as never)

                // Add reset password page
                data.push({
                    url       : `/auth/password/reset`,
                    changefreq: 'yearly',
                    priority  : 0.3,
                    lastmod   : moment().toISOString()
                }as never)

                // Create a stream to write to
                const stream  = new SitemapStream( { hostname: Env.get('APP_URL') } )

                // Return a promise that resolves with your XML string
                const sitemap = await streamToPromise(Readable.from(data).pipe(stream))

                // Return sitemap
                return response
                            .header('content-type', 'application/xml')
                            .send(sitemap)

            } else {

                // Sitemap not enabled
                return response.badRequest()

            }

        } catch (error) {
            console.log(error)
        }
    }

}