import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CurrencyValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	
	public schema = schema.create({
		locale: schema.string({}, [
			rules.maxLength(20)
		]),
        code: schema.string({}, [
			rules.maxLength(10)
		]),
        symbol: schema.string({}, [
			rules.maxLength(20)
		]),
        symbol_native: schema.string({}, [
			rules.maxLength(20)
		]),
        name: schema.string({}, [
			rules.maxLength(60)
		]),
        name_plural: schema.string({}, [
			rules.maxLength(60)
		]),
        exchange_rate: schema.string({}, [
			rules.maxLength(20)
		])
	})
	
	public messages = {}
}
