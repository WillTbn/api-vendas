import 'reflect-metadata';
import Express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import cors from 'cors';
import {errors} from 'celebrate';
import {pagination} from 'typeorm-pagination'
import routes from './routes';
import AppError from "../errors/AppError";
import '@shared/typeorm';
import upload from '@config/upload';

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(pagination);
app.use('/files', Express.static(upload.directory))
app.use(routes);
app.use(errors());

app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }
    console.log(error)
    return response.status(500).json({
        status:'error',
        message:'Internal serve error',
    })
});

app.listen(3333, ()=>{
    console.log('server started on port 333');
})
