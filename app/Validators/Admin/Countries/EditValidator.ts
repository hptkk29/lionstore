import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public refs = schema.refs({
		id: this.ctx.request.input('id')
	})
	
	public schema = schema.create({
		name: schema.string({}, [
			rules.required(),
			rules.maxLength(60),
			rules.unique({ table: 't_countries', column: 'name', whereNot: { id: this.refs.id } })
		]),
		code: schema.string({}, [
			rules.maxLength(2),
			rules.required(),
			rules.unique({ table: 't_countries', column: 'code', whereNot: { id: this.refs.id } })
		]),
		is_active: schema.boolean([
			rules.required()
		])
	})
	
	public messages = {}
}
