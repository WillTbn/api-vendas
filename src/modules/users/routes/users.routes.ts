import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate'
import UserController from "../controllers/UserControllers";


const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', userController.index)

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    userController.create
)


export default usersRouter
