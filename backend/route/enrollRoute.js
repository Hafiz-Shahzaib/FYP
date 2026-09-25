import express from 'express'
import { enrollCourse } from '../controller/enrollController.js'
import isAuth from '../middleware/isAuth.js';

const enrollRouter = express.Router()

enrollRouter.post('/enroll', isAuth, enrollCourse)

export default enrollRouter
