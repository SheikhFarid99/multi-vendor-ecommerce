const router = require('express').Router()
const customerAuthController = require('../../controllers/home/customerAuthController')
router.post('/customer/customer-register', customerAuthController.customer_register)
router.post('/customer/customer-login', customerAuthController.customer_login)

module.exports = router