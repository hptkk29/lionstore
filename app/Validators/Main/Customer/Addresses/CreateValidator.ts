import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Helpers from 'App/Services/Helpers'

export default class CreateValidator {

	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		name: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		phone: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		address: schema.string.optional({}, [
			rules.maxLength(1500)
		]),
		country_id: schema.number.optional([
			rules.exists({ table: 't_countries', column: 'id' })
		]),
		state: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		city: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		zipcode: schema.string.optional({}, [
			rules.maxLength(60)
		])
	})
	
	public messages = {

		'name.maxLength'   : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'phone.maxLength'  : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'address.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 1500 }),
		'state.maxLength'  : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'city.maxLength'   : Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'zipcode.maxLength': Helpers.trans('t_validator_field_maxlength', this.ctx.request.header('locale'), { 'length': 60 }),
		'country_id.exists': Helpers.trans('t_validator_field_exists', this.ctx.request.header('locale'))

	}

}
