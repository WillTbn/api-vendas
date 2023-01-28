import {EntityRepository, Repository} from 'typeorm'
import Order from '../entities/Order'
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProduct {
    product_id: string,
    price: number,
    quantity: number
}

interface IResquest {
    customer: Customer,
    products:IProduct[]
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined>{
        const order = await this.findOne(id, {
            relations:['order_products', 'customer']
        });

        return order;
    }
    public async createOrder({customer, products}:IResquest): Promise<Order>{
        const order = this.create({
            customer,
            order_products: products
        });

        await this.save(order);

        return order;

    }
}

export default OrdersRepository;
