import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeoValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		is_sitemap      : schema.boolean(),
		facebook_app_id : schema.string.optional({}, [
			rules.maxLength(60)
		]),
		facebook_page_id: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		twitter_username: schema.string.optional({}, [
			rules.maxLength(60)
		]),
		ogimage: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})
	})
	
	public messages = {}
}
