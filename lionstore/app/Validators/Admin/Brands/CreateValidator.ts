import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		name_ar: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_az: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_cn: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_de: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_en: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_es: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_fr: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_hi: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_hu: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_jp: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_nl: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_po: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_pt: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_ro: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_ru: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_th: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_tr: schema.string.optional({}, [ rules.maxLength(60) ]),
		name_ua: schema.string.optional({}, [ rules.maxLength(60) ]),
		description: schema.string({}, [
			rules.maxLength(500),
			rules.required()
		]),
		handler: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.unique({ table: 't_brands', column: 'handler' })
		]),
		logo: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})
	})
	
	public messages = {}
}
