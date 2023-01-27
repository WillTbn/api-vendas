import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";


class ListCustomersService {

    public async execute(): Promise<Customer[]>{
        const customersRepository = getCustomRepository(CustomersRepository)

        const customers = customersRepository.find()

        return customers

    }

}

export default ListCustomersService
