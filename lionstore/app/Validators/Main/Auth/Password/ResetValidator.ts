import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class ResetValidator {

	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		email: schema.string({}, [
			rules.required(),
			rules.email(),
			rules.maxLength(60)
		])
	})
	
	public messages = {
		'email.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'email.email'    : Helpers.trans('t_validator_field_email', this.ctx.request.header('locale')),
		'email.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 })
	}

}
