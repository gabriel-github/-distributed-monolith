import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindProductUsecase } from "./find-product.usecase";


const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description product 1",
  salesPrice: 100
});

const mockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn()
  }
}

describe('Find product unit test', () => {
  it('should find a product', async () => {
    const productRepository = mockRepository()
    const findProductUseCase = new FindProductUsecase(productRepository);

    const result = await findProductUseCase.execute({productId: "1"});

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.id).toBe("1")
    expect(result.name).toBe("Product 1")
    expect(result.description).toBe("Description product 1")
    expect(result.salesPrice).toBe(100)
  })
})