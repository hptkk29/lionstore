import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class CancelValidator {

	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		reason: schema.string({}, [
			rules.required(),
			rules.maxLength(1000),
			rules.minLength(3)
		])
	})
	
	public messages = {
		'reason.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'reason.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 1000 }),
		'reason.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 3 }),
	}

}
