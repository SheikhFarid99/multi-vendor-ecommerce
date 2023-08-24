const router = require('express').Router()
const { authMiddleware } = require('../middlewares/authMiddleware')
const authControllers = require('../controllers/authControllers')
router.post('/admin-login', authControllers.admin_login)
router.get('/get-user', authMiddleware, authControllers.getUser)
router.post('/seller-register', authControllers.seller_register)
router.post('/seller-login', authControllers.seller_login)
router.post('/profile-image-upload',authMiddleware, authControllers.profile_image_upload)
router.post('/profile-info-add',authMiddleware, authControllers.profile_info_add)

router.get('/logout',authMiddleware,authControllers.logout)

module.exports = router