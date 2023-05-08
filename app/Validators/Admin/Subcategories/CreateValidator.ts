import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		title_ar: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_az: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_cn: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_de: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_en: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_es: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_fr: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_hi: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_hu: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_jp: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_nl: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_po: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_pt: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_ro: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_ru: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_th: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_tr: schema.string.optional({}, [ rules.maxLength(60) ]),
		title_ua: schema.string.optional({}, [ rules.maxLength(60) ]),
		description: schema.string({}, [
			rules.maxLength(250),
			rules.required()
		]),
		icon: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		ogimage: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		handler: schema.string({}, [
			rules.required(),
			rules.maxLength(60),
			rules.unique({ table: 't_subcategories', column: 'handler' })
		]),
		parent_id: schema.number([
			rules.exists({ table: 't_categories', column: 'id' })
		])
	})
	
	public messages = {}
}
