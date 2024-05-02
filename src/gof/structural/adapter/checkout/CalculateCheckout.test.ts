import { expect, test } from "bun:test";
import { CalculateCheckout } from "./CalculateCheckout";
import { CatalogGatewayHttp } from "./CatalogGateway";
import { HonoClientAdapter } from "./HttpClient";

test("Deve calcular o checkout", async function () {
  const input = {
    items: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 2,
      },
      {
        productId: 3,
        quantity: 3,
      },
    ],
  };

  const calculateCheckout = new CalculateCheckout(
    new CatalogGatewayHttp(new HonoClientAdapter()),
  );
  const out = await calculateCheckout.execute(input);

  expect(out.total).toBe(1400);
});
