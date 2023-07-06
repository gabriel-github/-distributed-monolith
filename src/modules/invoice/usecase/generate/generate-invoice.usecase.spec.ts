import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Invoice } from "../../domain/invoice.entity";
import { Product } from "../../domain/product.entity"
import { Address } from "../../domain/value-object/address"
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";

const product = new Product({
  id: new Id("1"),
  name: 'Product 1',
  price: 100
})

const address = new Address({
  city: 'São paulo',
  complement: 'casa',
  number: '19',
  state: 'São paulo',
  street: 'Rua raimundos',
  zipCode: '1908-908'
});

const invoice = new Invoice({
  id: new Id('1'),
  name: 'Invoice 1',
  document: 'ABC-123',
  address,
  items: [product],
})

const mockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn()
  }
}

describe('Generate invoice unit test', () => {
  it('should generate an invoice', async () => {
    const invoiceRepository = mockRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    const input = {
      name: 'Invoice 1',
      document: 'ABC-123',
      city: 'São paulo',
      complement: 'casa',
      number: '19',
      state: 'São paulo',
      street: 'Rua raimundos',
      zipCode: '1908-908',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 100
        }
      ]
    }

    const result = await generateInvoiceUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.city).toBe(input.city)
    expect(result.street).toBe(input.street)
    expect(result.state).toBe(input.state)
    expect(result.complement).toBe(input.complement)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.document).toBe(input.document)
    expect(result.number).toBe(input.number)
    expect(result.city).toBe(input.city)
    expect(result.total).toBe(100)
  })
})