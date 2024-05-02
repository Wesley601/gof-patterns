import { CatalogGateway } from "./CatalogGateway";
import { Order } from "./Order";

export class CalculateCheckout {
  constructor(readonly catalogGateway: CatalogGateway) {}

  async execute(input: { items: { productId: number; quantity: number }[] }) {
    const order = new Order();
    for (const item of input.items) {
      const p = await this.catalogGateway.getProduct(item.productId);
      order.addProduct(p, item.quantity);
    }
    return {
      total: order.count(),
    };
  }
}
