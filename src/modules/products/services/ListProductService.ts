import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from "@shared/cache/RedisCache";
class ListProductService {

    public async execute(): Promise<Product[]>{
        const productRepository = getCustomRepository(ProductRepository);

        const rediscCache = new RedisCache();

        let products = await rediscCache.recover<Product[]>('api-vendas-PRODUCT_LIST');
        if(!products){
            products = await productRepository.find();
            await rediscCache.save('api-vendas-PRODUCT_LIST', products)
        }

        return products

    }

}

export default ListProductService
