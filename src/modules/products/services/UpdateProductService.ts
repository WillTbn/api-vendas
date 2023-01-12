import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IResquest{
    id:string,
    name: string,
    price: number,
    quantity:number
}
class UpdateProductService {

    public async execute({id, name, price, quantity}: IResquest): Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)
        if(!product){
            throw new AppError('Product not found.')
        }

        const ProductExists = await productRepository.findByName(name)

        if(ProductExists){
            throw new AppError('There is already one product with this name');
        }

        product.name = name
        product.price = price
        product.quantity = quantity



        return product

    }

}

export default UpdateProductService
