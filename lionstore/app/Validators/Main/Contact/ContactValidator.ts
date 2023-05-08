import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class ContactValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		name: schema.string({}, [
			rules.maxLength(60),
			rules.required(),
			rules.minLength(3)
		]),
		email: schema.string({}, [
			rules.required(),
			rules.email(),
			rules.maxLength(60),
			rules.minLength(6)
		]),
		phone: schema.string({}, [
			rules.required(),
			rules.maxLength(60)
		]),
		subject: schema.string({}, [
			rules.required(),
			rules.maxLength(100)
		]),
		message: schema.string({}, [
			rules.required(),
			rules.maxLength(1500)
		])
	})
	
	public messages = {

		'name.required'    : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'name.maxLength'   : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'name.minLength'   : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 3 }),
		'email.required'   : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'email.maxLength'  : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'email.minLength'  : Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 6 }),
		'email.email'      : Helpers.trans('t_validator_field_email', this.ctx.request.header('locale')),
		'phone.required'   : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'phone.maxLength'  : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'subject.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'subject.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 100 }),
		'message.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'message.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 1500 })

	}
}
