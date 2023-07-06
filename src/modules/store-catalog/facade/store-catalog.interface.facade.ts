

export interface FindProductFacadeInputDto {
  productId: string;
}

export interface FindProductFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllProductsFacadeOutputDto {
  products: {
    id: string,
    name: string,
    description: string,
    salesPrice: number,
  }[]
}

export interface StoreCatalogFacadeInterface {
  find(productId: string): Promise<FindProductFacadeOutputDto>;
  findAll(): Promise<FindAllProductsFacadeOutputDto>
}