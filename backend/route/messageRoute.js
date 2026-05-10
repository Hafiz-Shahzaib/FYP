import express from 'express'
import { imageMessageController, textMessageController } from '../controller/messageController.js'
import isAuth from '../middleware/isAuth.js'

const messageRouter = express.Router()

messageRouter.post('/text', isAuth, textMessageController)
messageRouter.post('/image', isAuth, imageMessageController)

export default messageRouter