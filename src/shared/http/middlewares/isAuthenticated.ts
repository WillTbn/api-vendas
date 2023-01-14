import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface ITokenPayload{
    iat:number
    exp:number,
    sub:string
}


export default function isAuthenticated(
    request: Request,
    response:Response,
    next: NextFunction,
):void{
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('JWT Token is missing.')
    }
    // Bearer $token
    const [,token] = authHeader.split(' ')

    try{
        const decodedToken = verify(token, auth.jwt.secret)

        const {sub} = decodedToken as ITokenPayload

        //overwied
        request.user = {
            id:sub,
        }

        return next()
    }catch{
        throw new AppError('Invalid JWT Token.')
    }

}
