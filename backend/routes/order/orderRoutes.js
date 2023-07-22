const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')
router.post('/order/palce-order', orderController.place_order)

router.get('/customer/gat-dashboard-data/:userId', orderController.get_customer_databorad_data)
router.get('/customer/gat-orders/:customerId/:status', orderController.get_orders)
router.get('/customer/gat-order/:orderId', orderController.get_order)

module.exports = router