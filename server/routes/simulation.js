import express from 'express'
import { simulate } from '../controllers/simulation'

const router = express.Router()

router.post('/', simulate)

export default router
