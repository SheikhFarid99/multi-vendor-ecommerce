const router = require('express').Router()
const homeControllers = require('../../controllers/home/homeControllers')
router.get('/get-categorys', homeControllers.get_categorys)
router.get('/get-products', homeControllers.get_products)
module.exports = router