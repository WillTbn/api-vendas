import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest{
    email: string
    password: string
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {

    public async execute({email, password}: IRequest): Promise<IResponse>{

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findByEmail(email)

        if(!user){
          throw new AppError('Incorred email/password cobination.', 401);
        }

        const passwordConfirm = await compare(password, user.password)
        if(!passwordConfirm){
            throw new AppError('Incorred email/password cobination.', 401);
        }

        const token = sign({}, auth.jwt.secret, {
            subject:user.id,
            expiresIn:auth.jwt.expiresIn
        })


        return {
            user,
            token
        }

    }

}

export default CreateSessionService
