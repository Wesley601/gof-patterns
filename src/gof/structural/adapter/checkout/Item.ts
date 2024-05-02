export class Item {
  constructor(
    readonly productId: number,
    readonly price: number,
    readonly quantity: number,
  ) {}

  count() {
    return this.price * this.quantity;
  }
}
