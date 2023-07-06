import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";


describe('Product adm facade test', () => {
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

  it('should create a product', async () => {
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({addUseCase: addProductUseCase, stockUseCase: undefined});

    const productFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10
    }

    await productFacade.addProduct(input)

    const product = await ProductModel.findOne({
      where: {id: input.id}
    })

    expect(product.productId).toEqual(input.id);
    expect(product.productName).toEqual(input.name);
    expect(product.productDescription).toEqual(input.description)
    expect(product.productPurchasePrice).toEqual(input.purchasePrice)
    expect(product.productStock).toEqual(input.stock)

  })

  it('should check stock of a product', async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const inputAddProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10
    }

    await productFacade.addProduct(inputAddProduct)

    const inputCheckStock = {
      productId: "1"
    }

    const result = await productFacade.checkStock(inputCheckStock);

    const productFound = await ProductModel.findOne({
      where: {id: inputAddProduct.id}
    })

    expect(productFound.productId).toEqual(result.productId)
    expect(productFound.productStock).toEqual(result.stock)
  })
})