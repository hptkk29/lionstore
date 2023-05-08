import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public refs = schema.refs({
		id: this.ctx.request.input('id')
	})

	public schema = schema.create({
		code: schema.string({}, [
			rules.unique({ table: 't_coupons', column: 'coupon_code', whereNot: { id: this.refs.id } }),
			rules.maxLength(60),
			rules.minLength(2)
		]),
		type: schema.enum(
			['percentage', 'money'] as const
		),
		value: schema.string({}, [
			rules.required(),
			rules.maxLength(32)
		]),
		is_active : schema.boolean(),
		unlimited : schema.boolean(),
		usage     : schema.number.optional(),
		start_date: schema.date(),
		end_date  : schema.date()
	})
	
	public messages = {}
}
