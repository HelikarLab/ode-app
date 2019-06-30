const express = require('express')
const modelController = require('../controllers/model')
const router = express.Router()

router.post('/add', modelController.addModel)
router.get('/get/all', modelController.getAllModels)
router.get('/get/:id', modelController.getModel)

module.exports = router
