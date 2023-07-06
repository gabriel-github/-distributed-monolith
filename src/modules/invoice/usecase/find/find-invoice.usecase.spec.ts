import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/invoice.entity";
import { Product } from "../../domain/product.entity";
import { Address } from "../../domain/value-object/address";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

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
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe('FindInvoiceUseCase unit test', () => {
  it('shoul find a invoice', async () => {
    const invoiceRepository = mockRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: '1'
    };

    const result = await findInvoiceUseCase.execute(input);

    expect(result.id).toBeDefined()
    expect(result.name).toBe('Invoice 1')
    expect(result.document).toBe('ABC-123')
    expect(result.address.city).toBe('São paulo')
    expect(result.address.street).toBe('Rua raimundos')
    expect(result.address.state).toBe('São paulo')
    expect(result.address.complement).toBe('casa')
    expect(result.address.zipCode).toBe('1908-908')
    expect(result.address.number).toBe('19')
    expect(result.total).toBe(100)
    expect(result.createdAt).toBeDefined()
  })
})