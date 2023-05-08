import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public refs = schema.refs({
		id: this.ctx.request.input('id')
	})
	
	public schema = schema.create({
		email: schema.string({}, [
			rules.maxLength(60),
			rules.email(),
			rules.required(),
			rules.unique({ table: 't_customers', column: 'email', whereNot: { id: this.refs.id } })
		]),
		username: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.unique({ table: 't_customers', column: 'username', whereNot: { id: this.refs.id } })
		]),
		password: schema.string.optional({}, [
			rules.maxLength(60),
			rules.minLength(6)
		]),
		is_verified: schema.boolean(),
	})
	
	public messages = {}
}
