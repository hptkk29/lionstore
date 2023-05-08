import CreateValidator from 'App/Validators/Admin/Products/CreateValidator'
import ProductVariantAttribute from 'App/Models/ProductVariantAttribute'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductTranslation from 'App/Models/ProductTranslation'
import SettingsLanguages from 'App/Models/SettingsLanguages'
import ProductGallery from 'App/Models/ProductGallery'
import ProductVariant from 'App/Models/ProductVariant'
import ProductSeo from 'App/Models/ProductSeo'
import Uploader from 'App/Services/Uploader'
import Product from 'App/Models/Product'
import randomstring from 'randomstring'

export default class CreateController {

    /**
     * Create new product
     * @param {*} param0 
     * @returns 
     */
    public async create({ request, response, auth }: HttpContextContract) {

        // Validate form
        await request.validate(CreateValidator)

        // Authenticate admin
        await auth.use('api').authenticate()
        
        // Check if main photo exists in request
        if (request.file('main_photo')) {
            
            // Upload thumbnail
            var product_preview_small = await Uploader.singleFile({
                file      : request.file('main_photo'),
                folder    : 'products',
                uploaderId: auth.user?.id,
                width     : 350
            }) as any

            // Upload medium
            var product_preview_medium = await Uploader.singleFile({
                file      : request.file('main_photo'),
                folder    : 'products',
                uploaderId: auth.user?.id,
                width     : 750
            }) as any

            // Upload large
            var product_preview_large = await Uploader.singleFile({
                file      : request.file('main_photo'),
                folder    : 'products',
                uploaderId: auth.user?.id,
                width     : 1200
            }) as any

        } else {

            // No photo uploaded
            var product_preview_small  = null as any
            var product_preview_medium = null as any
            var product_preview_large  = null as any

        }

        // Upload gallery
        const gallery                  = await Uploader.galleryCreate(request.files('gallery')) as any

        // Generate unique id
        const uniqueId                 = randomstring.generate(32)

        // Generate product ID
        const productId                = randomstring.generate({ length: 12, charset: 'numeric' })

        // Save product
        const product                   = new Product()
              product.uid               = uniqueId
              product.pid               = productId
              product.media_small_id    = product_preview_small
              product.media_medium_id   = product_preview_medium
              product.media_large_id    = product_preview_large
              product.handler           = request.input('handler')
              product.is_product_zoomer = request.input('is_product_zoomer')
              product.tags              = request.input('tags') ? request.input('tags') : null
              product.stock             = request.input('stock')
              product.video_provider    = request.input('video_provider') ? request.input('video_provider'): null
              product.video_link        = request.input('video_link') ? request.input('video_link') : null
              product.is_active         = request.input('status', 1)
              product.discount_type     = request.input('discount_type') ? request.input('discount_type') : null
              product.discount_value    = request.input('discount_value') ? request.input('discount_value') : null
              product.category_id       = request.input('category')
              product.subcategory_id    = request.input('subcategory', null)
              product.childcategory_id  = request.input('childcategory', null)
              product.brand_id          = request.input('brand') ? request.input('brand') : null
              product.price             = request.input('price')
              product.purchase_unit     = request.input('purchase_unit') ? request.input('purchase_unit') : null
              product.tax_value         = request.input('tax_value') ? request.input('tax_value') : null
              product.tax_type          = request.input('tax_type') ? request.input('tax_type') : null
              product.shipping_type     = request.input('shipping_type') ? request.input('shipping_type') : 'free'
              product.shipping_cost     = request.input('shipping_cost') ? request.input('shipping_cost') : null
              product.product_barcode   = request.input('barcode') ? request.input('barcode') : null
              product.original_source   = request.input('original_source') ? request.input('original_source') : ''
        await product.save()

        // Save translation
        await this.saveTranslation(product.id, request)

        // Save gallery
        const photos                   = new ProductGallery()
              photos.uid               = randomstring.generate(32)
              photos.product_id        = product.id
              photos.large_images      = JSON.stringify(gallery.large)
              photos.medium_images     = JSON.stringify(gallery.normal)
              photos.small_images      = JSON.stringify(gallery.small)
        await photos.save()

        // Save seo
        const seo                      = new ProductSeo()
              seo.uid                  = randomstring.generate(32)
              seo.product_id           = product.id
              seo.title                = request.input('seo_title')
              seo.description          = request.input('seo_description')
        await seo.save()

        // Save variants
        if (request.input('product_variants')) {

            // Parse strinify json in request
            const product_variants = JSON.parse(request.input('product_variants'))

            // Insert multiple product variants
            for (let index = 0; index < product_variants.length; index++) {

                // Set variant
                const variant = product_variants[index]

                if (variant.type === "color") {

                    // Insert variant
                    await ProductVariant.create({
                        uid       : randomstring.generate(32),
                        product_id: product.id,
                        name      : variant.name,
                        type      : variant.type,
                        options   : JSON.stringify(variant.value)
                    })
                    
                } else {
                    
                    // Insert variant
                    await ProductVariant.create({
                        uid       : randomstring.generate(32),
                        product_id: product.id,
                        name      : variant.name,
                        type      : variant.type,
                        options   : variant.value
                    })

                }

                

            }

            // Now, Insert group variants attributes
            const product_variants_attributes = JSON.parse(request.input('product_variants_attributes'))

            // Insert multiple product variants attributes
            for (let index = 0; index < product_variants_attributes.length; index++) {

                // Set variant
                const variant_attribute = product_variants_attributes[index]

                // Insert variant attribute
                await ProductVariantAttribute.create({
                    uid       : randomstring.generate(32),
                    product_id: product.id,
                    attributes: JSON.stringify(variant_attribute)
                })

            }
        }

        // Return product handler
        return response.json(product.handler)

    }



    /**
     * Save product translation
     * @param product 
     * @param request 
     */
    public async saveTranslation(product, request) {

        // Get supported languages
        const languages       = await SettingsLanguages.find(1)

        // Set title in supported languages
        const titles          = {
            ar: languages?.is_arabic ? request.input('title_ar')     : null,
            az: languages?.is_azerbaijani ? request.input('title_az'): null,
            cn: languages?.is_chinese ? request.input('title_cn')    : null,
            de: languages?.is_german ? request.input('title_de')     : null,
            en: languages?.is_english ? request.input('title_en')    : null,
            es: languages?.is_spanish ? request.input('title_es')    : null,
            fr: languages?.is_french ? request.input('title_fr')     : null,
            hi: languages?.is_hindi ? request.input('title_hi')      : null,
            hu: languages?.is_hungarian ? request.input('title_hu')  : null,
            jp: languages?.is_japanese ? request.input('title_jp')   : null,
            nl: languages?.is_dutch ? request.input('title_nl')      : null,
            po: languages?.is_polish ? request.input('title_po')     : null,
            pt: languages?.is_portuguese ? request.input('title_pt') : null,
            ro: languages?.is_romanian ? request.input('title_ro')   : null,
            ru: languages?.is_russian ? request.input('title_ru')    : null,
            th: languages?.is_thai ? request.input('title_th')       : null,
            tr: languages?.is_turkish ? request.input('title_tr')    : null,
            ua: languages?.is_ukrainian ? request.input('title_ua')  : null,
        }

        // Set description in supported languages
        const description_ar             = languages?.is_arabic ? request.input('description_ar')     : null
        const description_az             = languages?.is_azerbaijani ? request.input('description_az'): null
        const description_cn             = languages?.is_chinese ? request.input('description_cn')    : null
        const description_de             = languages?.is_german ? request.input('description_de')     : null
        const description_en             = languages?.is_english ? request.input('description_en')    : null
        const description_es             = languages?.is_spanish ? request.input('description_es')    : null
        const description_fr             = languages?.is_french ? request.input('description_fr')     : null
        const description_hi             = languages?.is_hindi ? request.input('description_hi')      : null
        const description_hu             = languages?.is_hungarian ? request.input('description_hu')  : null
        const description_jp             = languages?.is_japanese ? request.input('description_jp')   : null
        const description_nl             = languages?.is_dutch ? request.input('description_nl')      : null
        const description_po             = languages?.is_polish ? request.input('description_po')     : null
        const description_pt             = languages?.is_portuguese ? request.input('description_pt') : null
        const description_ro             = languages?.is_romanian ? request.input('description_ro')   : null
        const description_ru             = languages?.is_russian ? request.input('description_ru')    : null
        const description_th             = languages?.is_thai ? request.input('description_th')       : null
        const description_tr             = languages?.is_turkish ? request.input('description_tr')    : null
        const description_ua             = languages?.is_ukrainian ? request.input('description_ua')  : null

        // Save translation
        const translation                = new ProductTranslation()
              translation.product_id     = product
              translation.title          = JSON.stringify(titles)
              translation.description_ar = description_ar
              translation.description_az = description_az
              translation.description_cn = description_cn
              translation.description_de = description_de
              translation.description_en = description_en
              translation.description_es = description_es
              translation.description_fr = description_fr
              translation.description_hi = description_hi
              translation.description_hu = description_hu
              translation.description_jp = description_jp
              translation.description_nl = description_nl
              translation.description_po = description_po
              translation.description_pt = description_pt
              translation.description_ro = description_ro
              translation.description_ru = description_ru
              translation.description_th = description_th
              translation.description_tr = description_tr
              translation.description_ua = description_ua
        
        await translation.save()

    }

}