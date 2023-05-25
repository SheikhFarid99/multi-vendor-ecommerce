const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/dashboard/productController')

router.post('/product-add', authMiddleware, productController.add_product)
//router.get('/category-get', authMiddleware, categoryController.get_category)

module.exports = router