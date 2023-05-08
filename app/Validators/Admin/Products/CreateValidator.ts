import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({

		title_ar: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_az: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_cn: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_de: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_en: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_es: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_fr: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_hi: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_hu: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_jp: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_nl: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_po: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_pt: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_ro: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_ru: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_th: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_tr: schema.string.optional({}, [ rules.maxLength(130) ]),
		title_ua: schema.string.optional({}, [ rules.maxLength(130) ]),

		handler: schema.string({}, [
			rules.maxLength(160),
			rules.required(),
			rules.unique({ table: 't_products', column: 'handler' })
		]),

		category: schema.number([
			rules.required(),
			rules.exists({ table: 't_categories', column: 'id' })
		]),
		subcategory: schema.number.optional([
			rules.exists({ table: 't_subcategories', column: 'id' })
		]),
		childcategory: schema.number.optional([
			rules.exists({ table: 't_childcategories', column: 'id' })
		]),

		stock: schema.number([
			rules.required()
		]),

		status: schema.boolean(),

		video_provider: schema.enum.optional(
			['facebook', 'youtube', 'vimeo'] as const
		),

		video_link: schema.string.optional({}, [
			rules.maxLength(120)
		]),

		discount_type: schema.enum.optional(
			['percentage', 'money'] as const
		),

		discount_value: schema.string.optional({}, [
			rules.maxLength(60)
		]),

		brand: schema.number.optional([
			rules.exists({ table: 't_brands', column: 'id' })
		]),

		price: schema.string({}, [
			rules.maxLength(60)
		]),
		
		purchase_unit: schema.string.optional({}, [
			rules.maxLength(100)
		]),

		tax_value: schema.string.optional({}, [
			rules.maxLength(100)
		]),

		tax_type: schema.string.optional({}, [
			rules.maxLength(100)
		]),

		shipping_type: schema.enum.optional(
			['flat', 'free'] as const
		),

		shipping_cost: schema.string.optional({}, [
			rules.maxLength(100)
		]),

		barcode: schema.string.optional({}, [
			rules.maxLength(100)
		]),

		seo_title: schema.string({}, [
			rules.required()
		]),
		
		seo_description: schema.string({}, [
			rules.required()
		]),

		main_photo: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})

	})
	
	public messages = {}
}
