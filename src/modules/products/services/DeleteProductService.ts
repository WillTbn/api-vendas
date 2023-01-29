import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IResquest{
    id:string
}
class DeleteProductService {

    public async execute({id}: IResquest): Promise<void>{
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)

        if(!product){
            throw new AppError('Product not found.')
        }
        const rediscCache = new RedisCache();

        await rediscCache.invalidate('api-vendas-PRODUCT_LIST');
        await productRepository.remove(product)

    }

}

export default DeleteProductService
