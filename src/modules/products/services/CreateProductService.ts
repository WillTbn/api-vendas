import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    name: string
    price: number
    quantity: number
}

class CreateProductService {

    public async execute({name, price, quantity}: IRequest): Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository)

        const ProductExists = await productRepository.findByName(name)

        if(ProductExists){
            throw new AppError('There is already one product with this name');
        }

        const rediscCache = new RedisCache();

        const product = productRepository.create({
            name,
            price,
            quantity
        })
        await rediscCache.invalidate('api-vendas-PRODUCT_LIST');
        await productRepository.save(product)

        return product

    }

}

export default CreateProductService
