import CustomerOrderDeliveredQueue from 'App/Queues/Emails/Main/OrderDelivered'
import CustomerPendingQueue from 'App/Queues/Emails/Admin/CustomerPending'
import CustomerWelcomeQueue from 'App/Queues/Emails/Main/CustomerWelcome'
import PasswordUpdatedQueue from 'App/Queues/Emails/Main/PasswordUpdated'
import MessagePendingQueue from 'App/Queues/Emails/Admin/MessagePending'
import OrderDeliveredQueue from 'App/Queues/Emails/Admin/OrderDelivered'
import OrderConfirmedQueue from 'App/Queues/Emails/Main/OrderConfirmed'
import SupportMessageQueue from 'App/Queues/Emails/Main/SupportMessage'
import OrderCanceledQueue from 'App/Queues/Emails/Admin/OrderCanceled'
import ReviewPendingQueue from 'App/Queues/Emails/Admin/ReviewPending'
import RefundRequestQueue from 'App/Queues/Emails/Admin/ReturnRequest'
import PasswordResetQueue from 'App/Queues/Emails/Main/PasswordReset'
import VerifyAccountQueue from 'App/Queues/Emails/Main/VerifyAccount'
import MessageReplyQueue from 'App/Queues/Emails/Admin/MessageReply'
import OrderPendingQueue from 'App/Queues/Emails/Admin/OrderPending'
import OrderDetailsQueue from 'App/Queues/Emails/Main/OrderDetails'
import OrderShippedQueue from 'App/Queues/Emails/Main/OrderShipped'
import ProductTrackingQueue from 'App/Queues/Jobs/ProductTracking'
import Event from '@ioc:Adonis/Core/Event'

// Password Reset
Event.on('main::reset::password', async ({ customer, token, email }) => {
    const queue = new PasswordResetQueue({ customer, token, email })
    await queue.queue()
})

// Password updated
Event.on('customer::password::updated', async ({ email }) => {
    const queue = new PasswordUpdatedQueue({ email })
    await queue.queue()
})

// Support message received
Event.on('main::support::message', async ({ subject, email }) => {
    const queue = new SupportMessageQueue({ subject, email })
    await queue.queue()
})

// Customer order confirmed
Event.on('customer::order::confirmed', async ({ order }) => {
    const queue = new OrderConfirmedQueue({ order })
    await queue.queue()
})

// Customer order shipped
Event.on('customer::order::shipped', async ({ order }) => {
    const queue = new OrderShippedQueue({ order })
    await queue.queue()
})

// Customer order delivered
Event.on('customer::order::delivered', async ({ order }) => {
    const queue = new CustomerOrderDeliveredQueue({ order })
    await queue.queue()
})

// Admin new message
Event.on('admin::new::message', async ({ message }) => {
    const queue = new MessagePendingQueue({ message })
    await queue.queue()
})

// Admin reply message
Event.on('admin::message::reply', async ({ message, subject, reply }) => {
    const queue = new MessageReplyQueue({ message, subject, reply })
    await queue.queue()
})

// Admin new order
Event.on('admin::order::pending', async ({ order }) => {
    const queue = new OrderPendingQueue({ order })
    await queue.queue()
})

// Admin order canceled
Event.on('admin::order::canceled', async ({ order }) => {
    const queue = new OrderCanceledQueue({ order })
    await queue.queue()
})

// Admin order delivered
Event.on('admin::order::delivered', async ({ order }) => {
    const queue = new OrderDeliveredQueue({ order })
    await queue.queue()
})

// Admin new review
Event.on('admin::review::pending', async ({ product, review }) => {
    const queue = new ReviewPendingQueue({ product, review })
    await queue.queue()
})

// Admin refund request
Event.on('admin::refund::request', async ({ order, reason }) => {
    const queue = new RefundRequestQueue({ order, reason })
    await queue.queue()
})

// Customer order details
Event.on('main::customer::order::details', async ({ order, email, products, address }) => {
    const queue = new OrderDetailsQueue({ order, email, products, address })
    await queue.queue()
})

// Track product
Event.on('product::track', async ({ productId, ipAddress, userAgent, acceptLang, referer, requestUrl }) => {
    const queue = new ProductTrackingQueue({ productId, ipAddress, userAgent, acceptLang, referer, requestUrl })
    await queue.queue()
})

// Customer verification
Event.on('customer::verify::account', async ({ customer, verification }) => {
    const queue = new VerifyAccountQueue({ customer, verification })
    await queue.queue()
})

// Customer welcome
Event.on('customer::email::welcome', async ({ customer }) => {
    const queue = new CustomerWelcomeQueue({ customer })
    await queue.queue()
})

// Admin pending customer
Event.on('admin::pending::customer', async ({ customer }) => {
    const queue = new CustomerPendingQueue({ customer })
    await queue.queue()
})