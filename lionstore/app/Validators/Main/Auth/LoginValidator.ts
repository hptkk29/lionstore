import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helpers from 'App/Services/Helpers'

export default class LoginValidator {

	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		email: schema.string({}, [
			rules.required(),
			rules.email(),
			rules.maxLength(60)
		]),
		password: schema.string({}, [
			rules.required(),
			rules.maxLength(60)
		])
	})
	
	public messages = {
		'email.required'    : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'email.email'       : Helpers.trans('t_validator_field_email', this.ctx.request.header('locale')),
		'email.maxLength'   : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'password.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'password.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
	}
	
}
