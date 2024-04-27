const router = require('express').Router()
const bannerController = require('../controllers/bannerController')
const { authMiddleware } = require('../middlewares/authMiddleware')
router.post('/banner/add', authMiddleware, bannerController.add_banner)
router.get('/banner/get/:productId', authMiddleware, bannerController.get_banner)
router.put('/banner/update/:bannerId', authMiddleware, bannerController.update_banner)
router.get('/banners', bannerController.get_banners)

module.exports = router