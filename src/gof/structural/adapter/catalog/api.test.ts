import { expect, test } from "bun:test";
import api from "./api";

test("deve consultar um produto do catalogo", async function () {
  const response = await api.request("/products/1");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    productId: 1,
    description: "A",
    price: 100,
  });
});
