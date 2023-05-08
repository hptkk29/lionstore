import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}
  
  	public schema = schema.create({
		link_type: schema.enum(
			['inside', 'outside'] as const
		),
		link_value: schema.string({}, [
			rules.maxLength(1000),
			rules.required()
		]),
		desktop_slider: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		mobile_slider: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})
	})
  
  	public messages = {}
}
