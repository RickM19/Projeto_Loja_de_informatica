import { BadRequestError } from '@/common/errors/AppError';
import {
    productOptionalSchema,
    productSchema,
} from '@/common/http/schemas/productSchema';
import { Product } from '@/entities/Product';
import { productRepository } from '@/repositories/productRepository';
import { z } from 'zod';

interface IBasicRespone {
    message: string;
}

export class ProductService {
    async create(args: Partial<Product>) {
        const _product = productSchema.safeParse(args);

        if (!_product.success)
            throw new BadRequestError('Campo obrigatório faltando');

        const {code, imgUrl, name, description, value, stock} = _product.data;

        const productExists = await productRepository.findOneBy({ code });

        if (productExists) throw new BadRequestError('Produto já cadastrado');

        const newProduct = productRepository.create({
            code,
            name,
            imgUrl,
            description,
            value,
            stock,
        });

        await productRepository.save(newProduct);

        return {
            id: newProduct.id,
            message: 'Produto cadastrado com sucesso',
        };
    }

    async getById(id: string) {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) throw new BadRequestError('Id inválido');
        return await productRepository.findOneBy({ id });
    }

    async getByParams(args: Partial<Product>) {
        const { code, name, value } = args;

        let result = await productRepository.find();

        if (code) result = result.filter(product => product.code == code);

        if (name) result = result.filter(product => product.name == name);

        if (value) result = result.filter(product => product.value == value);

        return result;
    }

    async update(id: string, args: Partial<Product>): Promise<IBasicRespone> {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) throw new BadRequestError('Id inválido');

        const updated = productOptionalSchema.safeParse(args);

        if (!updated.success) throw new BadRequestError('Dados inválidos');

        const existingProduct = await productRepository.findOneBy({ id });

        if (!existingProduct)
            throw new BadRequestError('Produto não cadastrado');

        productRepository.merge(existingProduct, updated.data);

        await productRepository.save(existingProduct);

        return {
            message: 'Produto atualizado com sucesso',
        };
    }

    async delete(id: string): Promise<IBasicRespone> {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) throw new BadRequestError('Id inválido');

        const existingProduct = await productRepository.findOne({
            where: { id },
            relations: ['orderProducts'],
        });
        console.log('chegou aqui');

        if (!existingProduct)
            throw new BadRequestError('Produto não cadastrado');

        await productRepository.remove(existingProduct);

        return {
            message: 'Produto excluído com sucesso',
        };
    }
}
