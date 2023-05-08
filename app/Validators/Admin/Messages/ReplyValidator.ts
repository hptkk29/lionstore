import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReplyValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		subject: schema.string({}, [
			rules.required(),
			rules.maxLength(160),
		]),
		message: schema.string({}, [
			rules.maxLength(2000),
			rules.required()
		])
	})
	
	public messages = {}
}
