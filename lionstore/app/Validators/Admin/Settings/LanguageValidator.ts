import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LanguageValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		is_english    : schema.boolean(),
		is_arabic     : schema.boolean(),
		is_french     : schema.boolean(),
		is_spanish    : schema.boolean(),
		is_russian    : schema.boolean(),
		is_chinese    : schema.boolean(),
		is_hindi      : schema.boolean(),
		is_portuguese : schema.boolean(),
		is_japanese   : schema.boolean(),
		is_turkish    : schema.boolean(),
		is_ukrainian  : schema.boolean(),
		is_polish     : schema.boolean(),
		is_romanian   : schema.boolean(),
		is_dutch      : schema.boolean(),
		is_thai       : schema.boolean(),
		is_hungarian  : schema.boolean(),
		is_azerbaijani: schema.boolean(),
		is_german     : schema.boolean(),
	})
	
	public messages = {}
}
