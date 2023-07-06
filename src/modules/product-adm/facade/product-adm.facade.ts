import { UseCaseInterface } from '../../@shared/usecase/use-case.interface';
import { AddProductUseCase } from './../usecase/add-product/add-product.usecase';
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, ProductAdmFacadedInterface } from "./product-adm.interface.facade";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface
}

export class ProductAdmFacade implements ProductAdmFacadedInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._checkStockUseCase = usecasesProps.stockUseCase
  }
  
  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input)
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input)
  }
}