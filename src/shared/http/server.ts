import 'reflect-metadata';
import Express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import routes from './routes';
import AppError from "../errors/AppError";
import '@shared/typeorm'


const app = Express();

app.use(cors());
app.use(Express.json());

app.use(routes);

app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }

    return response.status(500).json({
        status:'error',
        message:'Internal serve error',
    })
});

app.listen(3333, ()=>{
    console.log('server started on port 333');
})
