import { HttpClient } from "./HttpClient";

export interface CatalogGateway {
  getProduct(productId: number): Promise<ProductDTO>;
}

export type ProductDTO = {
  productId: number;
  description: string;
  price: number;
};

export class CatalogGatewayHttp implements CatalogGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getProduct(productId: number): Promise<ProductDTO> {
    const response = await this.httpClient.get<ProductDTO>(
      `/products/${productId}`,
    );
    return response.data;
  }
}
