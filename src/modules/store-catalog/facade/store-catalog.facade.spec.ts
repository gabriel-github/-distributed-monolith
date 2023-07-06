import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../repository/product.model"
import { ProductRepository } from "../repository/product.repository"
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase"
import { FindProductUsecase } from "../usecase/find-product/find-product.usecase"
import { StoreCatalogFacade } from "./store-catalog.facade"
import { StoreCatalogFacadeFactory } from "../factory/facade.factory"



describe('StoreCatalog Facade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description product 1",
      salesPrice: 100
    })


    const result = await storeCatalogFacade.find("1");

    expect(result.id).toBe("1")
    expect(result.name).toBe("Product 1")
    expect(result.description).toBe("Description product 1")
    expect(result.salesPrice).toBe(100)
  })

  it('should find all products', async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create()
    
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description product 1",
      salesPrice: 100
    })

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description product 2",
      salesPrice: 200
    })


    const result = await storeCatalogFacade.findAll()

    expect(result.products).toHaveLength(2)
    expect(result.products[0].id).toBe("1")
    expect(result.products[0].name).toBe("Product 1")
    expect(result.products[0].description).toBe("Description product 1")
    expect(result.products[0].salesPrice).toBe(100)
    expect(result.products[1].id).toBe("2")
    expect(result.products[1].name).toBe("Product 2")
    expect(result.products[1].description).toBe("Description product 2")
    expect(result.products[1].salesPrice).toBe(200)
  })
})