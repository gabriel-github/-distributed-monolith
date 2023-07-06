import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Product } from "../../domain/product.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";



export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) { }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const result = await this.invoiceRepository.find(input.id);

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: {
        street: result.address.street,
        number: result.address.number,
        complement: result.address.complement,
        city: result.address.city,
        state: result.address.state,
        zipCode: result.address.zipCode,
      },
      items: this.mapConvertItems(result.items),
      total: result.total,
      createdAt: result.createdAt,
    }
  }

  mapConvertItems(items: Product[]) {
    return items.map(item => ({
      id: item.id.id,
      name: item.name,
      price: item.price
    }))
  }
}