import { dataSource } from "@/common/typeorm";
import { Product } from "@/entities/Product";

export const productRepository = dataSource.getRepository(Product);