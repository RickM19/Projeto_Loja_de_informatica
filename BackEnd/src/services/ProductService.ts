import { BadRequestError } from "@/common/errors/AppError";
import { Product } from "@/entities/Product";
import { productRepository } from "@/repositories/productRepository";

interface IBasicRespone {
    message: string
}

export class ProductService {
    async create(args: Partial<Product>): Promise<IBasicRespone> {
        const {code, name, description, value, stock} = args;

        const productExists = await productRepository.findOneBy({code});

        if(productExists)
            throw new BadRequestError("Produto já cadastrado");

        const newProduct = productRepository.create({code, name, description, value, stock});

        await productRepository.save(newProduct);

        return {
            message: "Produto cadastrado com sucesso"
        }
    }

    async getById(id: string) {
        return await productRepository.findOneBy({id});
    }

    async getByParams(args: Partial<Product>) {
        const {code, name, value} = args;

        let result = await productRepository.find();

        if(code) result = result.filter(product => product.code == code);

        if(name) result = result.filter(product => product.name == name);

        if(value) result = result.filter(product => product.value == value);

        return result;
    }

    async update(id: string, args: Partial<Product>): Promise<IBasicRespone> {
        
        const existingProduct = await productRepository.findOneBy({id});

        if(!existingProduct)
            throw new BadRequestError("Produto não cadastrado");

        productRepository.merge(existingProduct, args);

        await productRepository.save(existingProduct);

        return {
            message: "Produto atualizado com sucesso"
        }
    }

    async delete(id: string): Promise<IBasicRespone> {

        const existingProduct = await productRepository.findOneBy({id});

        if(!existingProduct)
            throw new BadRequestError("Produto não cadastrado"); 
        
        await productRepository.delete(existingProduct);

        return {
            message: "Produto excluído com sucesso"
        }
    }
}