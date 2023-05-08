import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helpers from 'App/Services/Helpers'

export default class RegisterValidator {

	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		username: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.minLength(3),
			rules.unique({ table: 't_customers', column: 'username' })
		]),
		email: schema.string({}, [
			rules.required(),
			rules.email(),
			rules.maxLength(60),
			rules.minLength(6),
			rules.unique({ table: 't_customers', column: 'email' })
		]),
		password: schema.string({}, [
			rules.required(),
			rules.minLength(6),
			rules.maxLength(60)
		])
	})
	
  	public messages = {
		'username.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'username.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'username.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 3 }),
		'username.unique'   : Helpers.trans('t_validator_field_unique', this.ctx.request.header('locale')),
		'email.required'    : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'email.email'       : Helpers.trans('t_validator_field_email', this.ctx.request.header('locale')),
		'email.maxLength'   : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'email.minLength'   : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
		'email.unique'      : Helpers.trans('t_validator_field_unique', this.ctx.request.header('locale')),
		'password.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'password.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'password.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
	}
	  
}
