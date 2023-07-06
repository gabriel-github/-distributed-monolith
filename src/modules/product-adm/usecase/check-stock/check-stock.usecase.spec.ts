import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { CheckStockUseCase } from "./check-stock.usecase";

const mockRepository = () => {
  const props = {
    id: new Id('123'),
    name: 'Product 1',
    description: 'Product 1 description',
    purchasePrice: 100,
    stock: 10
  }

  const product = new Product(props)
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(product)
  }
}
describe('Check stock usecase unit test', () => {
  it('check stock of a product', async () => {
    const productRepository = mockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const input = {
      productId: '123'
    };

    const result = await checkStockUseCase.execute(input);

    expect(result.productId).toEqual(input.productId);
    expect(result.stock).toEqual(10)
  })
})