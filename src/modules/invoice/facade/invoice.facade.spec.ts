import { Sequelize } from "sequelize-typescript";
import { InvoiceFacadeFactory } from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { ProductModel } from "../repository/product.model";


describe('InvoiceFacade test ', () => {
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
    const invoiceFacade = InvoiceFacadeFactory.create()

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

    const invoice = await invoiceFacade.generate(input);

    const invoiceFound = await InvoiceModel.findOne({
      where: { id: invoice.id }, include: [ProductModel]
    })

    expect(invoice.id).toBeDefined()
    expect(invoice.name).toBe(invoiceFound.invoiceName)
    expect(invoice.city).toBe(invoiceFound.invoiceCity)
    expect(invoice.street).toBe(invoiceFound.invoiceStreet)
    expect(invoice.state).toBe(invoiceFound.invoiceState)
    expect(invoice.complement).toBe(invoiceFound.invoiceComplement)
    expect(invoice.zipCode).toBe(invoiceFound.invoiceZipCode)
    expect(invoice.document).toBe(invoiceFound.invoiceDocument)
    expect(invoice.number).toBe(invoiceFound.invoiceNumber)
    expect(invoice.items).toHaveLength(1)
    expect(invoice.total).toBe(100)
  })

  it('should find a invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()

    const input = {
      id: '1'
    }

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

    const invoice = await invoiceFacade.find(input);

    const invoiceFound = await InvoiceModel.findOne({
      where: input, include: [ProductModel]
    })


    expect(invoice.id).toBeDefined()
    expect(invoice.name).toBe(invoiceFound.invoiceName)
    expect(invoice.document).toBe(invoiceFound.invoiceDocument)
    expect(invoice.address.city).toBe(invoiceFound.invoiceCity)
    expect(invoice.address.street).toBe(invoiceFound.invoiceStreet)
    expect(invoice.address.state).toBe(invoiceFound.invoiceState)
    expect(invoice.address.complement).toBe(invoiceFound.invoiceComplement)
    expect(invoice.address.zipCode).toBe(invoiceFound.invoiceZipCode)
    expect(invoice.address.number).toBe(invoiceFound.invoiceNumber)
    expect(invoice.items).toHaveLength(1)
    expect(invoice.total).toBe(100)
  })
})