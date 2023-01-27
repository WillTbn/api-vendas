import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { compare, hash } from "bcryptjs";
import Customer from "../entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email:string
}

class UpdateCustomerService {

    public async execute({
        id,
        name,
        email
    }:IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository)

        const customer = await customerRepository.findById(id);

        if(!customer){
            throw new AppError('Customer not found.');
        }

        const customerExists = await customerRepository.findByEmail(email);

        if(customerExists && customerExists.email !== email){
            throw new AppError('There is already one customer with this email.');
        }

        customer.name = name;
        customer.email = email;
        await customerRepository.save(customer);
        return customer;

    }

}

export default UpdateCustomerService
