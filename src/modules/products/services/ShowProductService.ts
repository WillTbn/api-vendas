import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IResquest{
    id:string
}
class ShowProductService {

    public async execute({id}: IResquest): Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)
        if(!product){
            throw new AppError('Product not found.')
        }
        return product

    }

}

export default ShowProductService
