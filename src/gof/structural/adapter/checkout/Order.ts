import { ProductDTO } from "./CatalogGateway";
import { Item } from "./Item";

export class Order {
  items: Item[] = [];

  addProduct(p: ProductDTO, quantity: number) {
    this.items.push(new Item(p.productId, p.price, quantity));
  }

  count() {
    return this.items.reduce((acc, i) => i.count() + acc, 0);
  }
}
