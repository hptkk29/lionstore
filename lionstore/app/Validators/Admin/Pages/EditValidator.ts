import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public refs = schema.refs({
		id: this.ctx.request.input('id')
	})
	
	public schema = schema.create({
		title_ar: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_az: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_cn: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_de: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_en: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_es: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_fr: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_hi: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_hu: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_jp: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_nl: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_po: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_pt: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_ro: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_ru: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_th: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_tr: schema.string.optional({}, [ rules.maxLength(120) ]),
		title_ua: schema.string.optional({}, [ rules.maxLength(120) ]),
		column: schema.enum(
			['first', 'second', 'third'] as const
		),
		handler: schema.string({}, [
			rules.maxLength(140),
			rules.required(),
			rules.unique({ table: 't_pages', column: 'handler', whereNot: { id: this.refs.id } })
		]),
		seo_title: schema.string.optional({}, [
			rules.maxLength(120)
		]),
		og_image: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})
	})
	
	public messages = {}
}
