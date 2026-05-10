import express from "express"
import { createChat, deleteChat, getChats } from "../controller/chatController.js"
import isAuth from './../middleware/isAuth.js';

const chatRouter = express.Router()

chatRouter.get('/create', isAuth, createChat)
chatRouter.get('/get', isAuth, getChats)
chatRouter.post('/delete', isAuth, deleteChat)

export default chatRouter