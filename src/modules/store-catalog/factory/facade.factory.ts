import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUsecase } from "../usecase/find-product/find-product.usecase";



export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository()
    const findProductUseCase = new FindProductUsecase(productRepository);
    const findAllProductUseCase = new FindAllProductsUseCase(productRepository);

    const storeCatalogFacade = new StoreCatalogFacade(findProductUseCase, findAllProductUseCase);

    return storeCatalogFacade
  }
}