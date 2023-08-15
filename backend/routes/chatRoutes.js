const router = require('express').Router()
const chatController = require('../controllers/chat/ChatController')
const {authMiddleware} = require('../middlewares/authMiddleware')
router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/chat/customer/send-message-to-seller', chatController.customer_message_add)
router.get('/chat/seller/get-customers/:sellerId', chatController.get_customers)
router.get('/chat/seller/get-customer-message/:customerId',authMiddleware, chatController.get_customer_seller_message)

module.exports = router