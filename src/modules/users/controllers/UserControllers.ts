import { Request, response, Response } from "express";
import CreateUserService from "../services/CreeateUserService";
import ListUserService from "../services/ListUserServices";

export default class UserController {
    public async index(resquest:Request, responde:Response): Promise<Response>{

        const listUser = new ListUserService()

        const users = await listUser.execute()

        return response.json(users)

    }

    public async create(resquest:Request, responde:Response): Promise<Response>{
        const { name, email, password } = resquest.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
            email,
            password
        })

        return response.json(user)

    }
}
