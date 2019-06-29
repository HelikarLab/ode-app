const express = require('express')
const simulationController = require('../controllers/simulation')
const router = express.Router()

router.post('/', simulationController.simulate)

module.exports = router
