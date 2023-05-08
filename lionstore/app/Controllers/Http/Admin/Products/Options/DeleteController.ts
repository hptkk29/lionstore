import ProductVariantAttribute from 'App/Models/ProductVariantAttribute'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderProductVariant from 'App/Models/OrderProductVariant'
import ProductTranslation from 'App/Models/ProductTranslation'
import ProductVariant from 'App/Models/ProductVariant'
import ProductVisitor from 'App/Models/ProductVisitor'
import ProductReview from 'App/Models/ProductReview'
import OrderProduct from 'App/Models/OrderProduct'
import ProductSeo from 'App/Models/ProductSeo'
import FlashDeal from 'App/Models/FlashDeal'
import Uploader from 'App/Services/Uploader'
import Wishlist from 'App/Models/Wishlist'
import Product from 'App/Models/Product'

export default class DeleteController {

    /**
     * Remove selected brands
     * @param param0 
     * @returns 
     */
     public async remove({ request, response }: HttpContextContract) {

        // Get product
        const product = await Product
        .query()
        .where('id', request.input('id'))
        .preload('gallery')
        .firstOrFail()

        // Delete flash deals
        await FlashDeal
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete reviews
        await ProductReview
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete SEO
        await ProductSeo
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete translation
        await ProductTranslation
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete variants
        await ProductVariant
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete variants attributes
        await ProductVariantAttribute
        .query()
        .where('product_id', product.id)
        .delete()

        // visitors
        await ProductVisitor
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete order products
        await OrderProduct
        .query()
        .where('product_id', product.id)
        .delete()

        // Delete order products variants
        await OrderProductVariant
        .query()
        .where('product_id', product.id)
        .delete()

        // Wishlist
        await Wishlist
        .query()
        .where('product_id', product.id)
        .delete()
        
        // Delete product images
        if (product.media_small_id) {
            await Uploader.deleteById(product.media_small_id)
        }
        if (product.media_medium_id) {
            await Uploader.deleteById(product.media_medium_id)
        }
        if (product.media_large_id) {
            await Uploader.deleteById(product.media_large_id)
        }

        // Delete product gallery
        if (product.gallery) {
            await Uploader.deleteOldGallery(product.toJSON())
        }

        // Now delete product
        await product.delete()

        // Success
        return response.noContent()

    }

}