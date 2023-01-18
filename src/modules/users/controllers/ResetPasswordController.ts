import { Request, Response } from 'express';
import ResetPasswordServices from '../services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;

        const resetPassword = new ResetPasswordServices();

        await resetPassword.execute({
            password,
            token
        });

        return response.status(204).json();
    }
}
