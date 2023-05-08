import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Helpers from 'App/Services/Helpers'

export default class CreateValidator {

	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		rating: schema.enum(
            [1, 2, 3, 4, 5] as const
        ),
		comment: schema.string({}, [
			rules.required(),
			rules.maxLength(700),
			rules.minLength(3)
		]),
		private: schema.boolean()
	})
	
	public messages = {
		'rating.enum'      : Helpers.trans('t_validator_field_rating', this.ctx.request.header('locale')),
		'comment.required' : Helpers.trans('t_validator_field_required', this.ctx.request.header('locale')),
		'comment.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 700 }),
		'comment.minLength': Helpers.trans('t_validator_field_minlength', this.ctx.request.header('locale'), { 'length': 3 }),
		'private.boolean'  : Helpers.trans('t_validator_field_boolean', this.ctx.request.header('locale')),
		
	}

}
