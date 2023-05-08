import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class UpdateValidator {

	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		password: schema.string({}, [
			rules.required(),
			rules.confirmed(),
			rules.maxLength(60),
			rules.minLength(6),
		])
	})
	
	public messages = {
		'password.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'password.confirmed': Helpers.trans('t_validator_field_confirmed', this.ctx.request.header('locale')),
		'password.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'password.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 })
	}

}
