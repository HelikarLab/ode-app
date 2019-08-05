import express from 'express'
import formidableMiddleware from 'express-formidable'
import uploadSbmlController from '../controllers/uploadSbml'

const router = express.Router()

// Formidable middleware for uploading files
router.use(formidableMiddleware({ uploadDir: './' }))

router.post('/', uploadSbmlController)

export default router
