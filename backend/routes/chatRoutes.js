const router = require('express').Router()
const chatController = require('../controllers/chat/ChatController')
const { authMiddleware } = require('../middlewares/authMiddleware')
router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/chat/customer/send-message-to-seller', chatController.customer_message_add)
router.get('/chat/seller/get-customers/:sellerId', chatController.get_customers)
router.get('/chat/seller/get-customer-message/:customerId', authMiddleware, chatController.get_customer_seller_message)

router.post('/chat/seller/send-message-to-customer', authMiddleware, chatController.seller_message_add)

router.get('/chat/admin/get-sellers', authMiddleware, chatController.get_sellers)

router.post('/chat/message-send-seller-admin', authMiddleware, chatController.seller_admin_message_insert)

router.get('/chat/get-admin-messages/:receverId', authMiddleware, chatController.get_admin_messages)

router.get('/chat/get-seller-messages', authMiddleware, chatController.get_seller_messages)

module.exports = router