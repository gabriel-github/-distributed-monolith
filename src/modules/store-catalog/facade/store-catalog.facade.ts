import { FindAllProductsUseCase } from './../usecase/find-all-products/find-all-products.usecase';
import { FindProductUsecase } from "../usecase/find-product/find-product.usecase";
import { FindAllProductsFacadeOutputDto, FindProductFacadeOutputDto, StoreCatalogFacadeInterface } from "./store-catalog.interface.facade";


export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(private findProductUseCase: FindProductUsecase, private findAllProductsUseCase: FindAllProductsUseCase) { }

  async find(productId: string): Promise<FindProductFacadeOutputDto> {
    const product = await this.findProductUseCase.execute({ productId });

    return product
  }

  async findAll(): Promise<FindAllProductsFacadeOutputDto> {
    const products = await this.findAllProductsUseCase.execute();

    return products
  }
}