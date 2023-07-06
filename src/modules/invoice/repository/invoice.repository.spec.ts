import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/value-object/address";
import { Invoice } from "../domain/invoice.entity";


describe('Invoice Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel, InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should generate an invoice', async () => {
    const invoiceRepository = new InvoiceRepository();

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

    await invoiceRepository.generate(invoice)

    const invoiceFound = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [ProductModel]
    })

    expect(invoiceFound.invoiceId).toBe(invoice.id.id)
    expect(invoiceFound.invoiceName).toBe(invoice.name)
    expect(invoiceFound.invoiceDocument).toBe(invoice.document)
    expect(invoiceFound.invoiceComplement).toBe(invoice.address.complement)
    expect(invoiceFound.invoiceState).toBe(invoice.address.state)
    expect(invoiceFound.invoiceCity).toBe(invoice.address.city)
    expect(invoiceFound.invoiceNumber).toBe(invoice.address.number)
    expect(invoiceFound.invoiceStreet).toBe(invoice.address.street)
    expect(invoiceFound.invoiceZipCode).toBe(invoice.address.zipCode)
    expect(invoiceFound.invoiceCreatedAt).toStrictEqual(invoice.createdAt)
    expect(invoiceFound.invoiceUpdatedAt).toStrictEqual(invoice.updatedAt)
    expect(invoiceFound.invoiceItems).toHaveLength(1)
  })

  it('should find a invoice', async () => {
    const invoiceRepository = new InvoiceRepository()

    await InvoiceModel.create({
      id: '1',
      name: 'Invoice 1',
      document: 'ABC-123',
      city: 'São paulo',
      complement: 'casa',
      number: '19',
      state: 'São paulo',
      street: 'Rua raimundos',
      zipCode: '1908-908',
      total: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await ProductModel.create({
      invoiceId: '1',
      id: '1',
      name: 'Product 1',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const invoice = await invoiceRepository.find('1');

    const invoiceFound = await InvoiceModel.findOne({
      where: { id: '1' }, include: [ProductModel]
    })

    expect(invoiceFound.invoiceId).toBe(invoice.id.id)
    expect(invoiceFound.invoiceName).toBe(invoice.name)
    expect(invoiceFound.invoiceDocument).toBe(invoice.document)
    expect(invoiceFound.invoiceComplement).toBe(invoice.address.complement)
    expect(invoiceFound.invoiceState).toBe(invoice.address.state)
    expect(invoiceFound.invoiceCity).toBe(invoice.address.city)
    expect(invoiceFound.invoiceNumber).toBe(invoice.address.number)
    expect(invoiceFound.invoiceStreet).toBe(invoice.address.street)
    expect(invoiceFound.invoiceZipCode).toBe(invoice.address.zipCode)
    expect(invoiceFound.invoiceItems).toHaveLength(1)
  })
})