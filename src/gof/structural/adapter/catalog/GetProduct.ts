import { ProductRepository } from "./ProductRepository";

export class GetProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number) {
    const product = await this.productRepository.getById(productId);
    return {
      productId: product.id,
      description: product.description,
      price: product.price,
    };
  }
}
