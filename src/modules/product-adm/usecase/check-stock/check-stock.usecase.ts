import { ProductGateway } from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";


export class CheckStockUseCase {
  constructor(private productRepository: ProductGateway) {}

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto > {
    const product = await this.productRepository.find(input.productId);

    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}