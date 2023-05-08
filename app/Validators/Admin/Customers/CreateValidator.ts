import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		email: schema.string({}, [
			rules.maxLength(60),
			rules.email(),
			rules.required(),
			rules.unique({ table: 't_customers', column: 'email' })
		]),
		username: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.unique({ table: 't_customers', column: 'username' })
		]),
		password: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.minLength(6)
		]),
		is_verified: schema.boolean(),
	})
	
	public messages = {}
}
