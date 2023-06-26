const router = require('express').Router()
const cardController = require('../../controllers/home/cardController')

router.post('/home/product/add-to-card', cardController.add_to_card)

module.exports = router