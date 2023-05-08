import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		name: schema.string({}, [
			rules.required(),
			rules.maxLength(60),
			rules.unique({ table: 't_countries', column: 'name' })
		]),
		code: schema.string({}, [
			rules.maxLength(2),
			rules.required(),
			rules.unique({ table: 't_countries', column: 'code' })
		]),
		is_active: schema.boolean([
			rules.required()
		])
	})
	
	public messages = {}
}
