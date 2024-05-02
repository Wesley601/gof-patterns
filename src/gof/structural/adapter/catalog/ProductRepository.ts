import { Product } from "./Product";

const products = [
  {
    id: 1,
    description: "A",
    price: 100,
  },
  {
    id: 2,
    description: "B",
    price: 200,
  },
  {
    id: 3,
    description: "C",
    price: 300,
  },
];

export interface ProductRepository {
  getById(productId: number): Promise<Product>;
}

export class ProductRepositoryMemory implements ProductRepository {
  async getById(productId: number): Promise<Product> {
    const p = products.find((p) => p.id === productId);
    if (!p) throw new Error("not found");
    return p;
  }
}
