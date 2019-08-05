import express from 'express'
import { addModel, getAllModels, getModel } from '../controllers/model'

const router = express.Router()

router.post('/add', addModel)
router.get('/get/all', getAllModels)
router.get('/get/:id', getModel)

export default router
