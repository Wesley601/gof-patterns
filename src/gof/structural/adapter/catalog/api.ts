import { Hono } from "hono";
import { GetProduct } from "./GetProduct";
import { ProductRepositoryMemory } from "./ProductRepository";

const api = new Hono();

api.get("/products/:productId", async (c) => {
  const productId = +c.req.param("productId");
  const getProduct = new GetProduct(new ProductRepositoryMemory());
  const product = await getProduct.execute(productId);
  return c.json(product);
});

export default api;
