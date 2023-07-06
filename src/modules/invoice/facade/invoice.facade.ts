import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate-invoice.usecase";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from "./invoice.facade.interface";



export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(private generateInvoiceUseCase: GenerateInvoiceUseCase, private findInvoiceUseCase: FindInvoiceUseCase) {}
  
  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this.generateInvoiceUseCase.execute(input)
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this.findInvoiceUseCase.execute(input);
  }
}