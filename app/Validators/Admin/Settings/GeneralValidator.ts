import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GeneralValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({

		site_title: schema.string({}, [
			rules.maxLength(60),
			rules.required()
		]),
		site_tagline: schema.string({}, [
			rules.maxLength(60),
			rules.required()
		]),
		site_description: schema.string.optional({}, [
			rules.maxLength(300)
		]),
		title_separator: schema.string({}, [
			rules.maxLength(2),
			rules.required()
		]),
		is_global: schema.boolean(),
		default_country : schema.number([
			rules.exists({ table: 't_countries', column: 'id' }),
			rules.required()
		]),
		default_language  : schema.enum(
			['ar', 'az', 'cn', 'de', 'en', 'es', 'fr', 'hi', 'hu', 'jp', 'nl', 'po', 'pt', 'ro', 'ru', 'th', 'tr', 'ua'] as const
		),
		desktop_logo: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		mobile_logo: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		favicon: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		}),
		site_email: schema.string.optional({}, [
			rules.maxLength(60),
			rules.email()
		]),
		site_phone: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		site_address: schema.string.optional({}, [
			rules.maxLength(500)
		]),
		is_rtl: schema.boolean(),

	})
	
	public messages = {}
}
