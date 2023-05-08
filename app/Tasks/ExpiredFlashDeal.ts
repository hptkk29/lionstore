import { BaseTask } from 'adonis5-scheduler/build'
import FlashDeal from 'App/Models/FlashDeal'
import moment from 'moment'

export default class ExpiredFlashDeal extends BaseTask {
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
		const today = moment().format()

		// Get expired flash deals
		const deals = await FlashDeal
								.query()
								.where('ends_at', '<=', today)

    	// Check if there are some expired deals
		if (deals.length > 0) {
			
			// Loop through deals
			for (let index = 0; index < deals.length; index++) {

				// Get deal
				const deal = deals[index];

				// Update deal
				await FlashDeal
							.query()
							.where('id', deal.id)
							.delete()
				
			}

		}

  	}
}
