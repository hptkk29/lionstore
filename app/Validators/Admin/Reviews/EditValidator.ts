import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		rating: schema.enum(
            [1, 2, 3, 4, 5] as const
        ),
		comment: schema.string({}, [
			rules.required(),
			rules.maxLength(700),
			rules.minLength(3)
		]),
	})
	
	public messages = {}
}
