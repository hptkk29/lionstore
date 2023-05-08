import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class EditValidator {

	constructor (protected ctx: HttpContextContract) {
	}
	
	public refs = schema.refs({
		customerId: this.ctx.auth.user!.id
	})

	public schema = schema.create({
		username: schema.string({}, [
			rules.required(),
			rules.maxLength(60),
			rules.minLength(3),
			rules.unique({ table: 't_customers', column: 'username', whereNot: { id: this.refs.customerId } })
		]),
		email: schema.string({}, [
			rules.required(),
			rules.maxLength(60),
			rules.minLength(3),
			rules.email(),
			rules.unique({ table: 't_customers', column: 'email', whereNot: { id: this.refs.customerId } })
		]),
		current_password: schema.string.optional({}, [
			rules.maxLength(60),
			rules.minLength(3)
		]),
		new_password: schema.string.optional({}, [
			rules.maxLength(60),
			rules.minLength(6),
			rules.confirmed('new_password_confirm')
		])
	})
	
	public messages = {
		'username.required'         : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'username.maxLength'        : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'username.minLength'        : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 3 }),
		'username.unique'           : Helpers.trans('t_validator_field_unique', this.ctx.request.header('locale')),
		'email.required'            : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'email.email'               : Helpers.trans('t_validator_field_email', this.ctx.request.header('locale')),
		'email.maxLength'           : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'email.minLength'           : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
		'email.unique'              : Helpers.trans('t_validator_field_unique', this.ctx.request.header('locale')),
		'current_password.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'current_password.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
		'new_password.maxLength'    : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'new_password.minLength'    : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
		'new_password.confirmed'    : Helpers.trans('t_validator_field_confirmed', this.ctx.request.header('locale')),
	}

}
