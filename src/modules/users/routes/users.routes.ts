import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import multer from "multer";
import upload from "@config/upload";
import UserController from "../controllers/UserControllers";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersAvatarController from "../controllers/UserAvatarController";


const usersRouter = Router();
const userController = new UserController();
const usersAvatarController = new UsersAvatarController;

const uploadMulter = multer(upload);

usersRouter.get('/', isAuthenticated, userController.index)

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

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    uploadMulter.single('avatar'),
    usersAvatarController.update
)

export default usersRouter
