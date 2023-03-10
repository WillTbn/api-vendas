import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
    user_id: string;
    name: string;
    email:string;
    password?: string;
    old_password?:string;
}

class UpdateProfileService {

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password
    }:IRequest): Promise<User>{
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found.');
        }

        const userUpdateEmail = await userRepository.findByEmail(email);

        if(userUpdateEmail && userUpdateEmail.id !== user_id){
            throw new AppError('There is already one user with this email.');
        }

        if(password && !old_password){
            throw new AppError('Old password is required.');
        }
        if(password && old_password){
            const checkOldPassord = await compare(old_password, user.password);
            if(!checkOldPassord){
                throw new AppError('Old password doest not match.');
            }
            user.password = await hash(password, 8);
        }
        user.name = name;
        user.email = email;
        await userRepository.save(user);
        return user

    }

}

export default UpdateProfileService
