import { BaseTask } from 'adonis5-scheduler/build'
import Coupon from 'App/Models/Coupon'
import moment from 'moment'

export default class ExpiredCoupon extends BaseTask {

	public static get schedule() {
		return '0 0 * * *'
	}

	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {

		// Get today date
		const today   = moment().format()

		// Get expired coupons
		const coupons = await Coupon
								.query()
								.where('is_active', true)
								.where('ends_date', '<=', today)

    	// Check if there are some expired coupons
		if (coupons.length > 0) {
			
			// Loop through coupons
			for (let index = 0; index < coupons.length; index++) {

				// Get coupon
				const coupon = coupons[index];

				// Update coupon
				await Coupon
							.query()
							.where('id', coupon.id)
							.update({
								is_active: false
							})
				
			}

		}
  	}
}
