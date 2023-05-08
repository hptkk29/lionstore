import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FooterValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		copyrights: schema.string.optional({}, [
			rules.maxLength(1500)
		]),
		first_column: schema.string.optional({}, [
			rules.maxLength(120)
		]),
		second_column: schema.string.optional({}, [
			rules.maxLength(120)
		]),
		third_column: schema.string.optional({}, [
			rules.maxLength(120)
		]),
		facebook_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		twitter_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		instagram_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		whatsapp_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		telegram_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		pinterest_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		vk_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		youtube_url: schema.string.optional({}, [
			rules.maxLength(140)
		]),
		footer_image: schema.file.optional({
			size: '5mb',
			extnames: ['jpg', 'svg', 'webp', 'jpeg', 'png']
		})
	})
	
	public messages = {}
}
