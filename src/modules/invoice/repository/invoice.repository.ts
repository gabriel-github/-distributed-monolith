import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/invoice.entity";
import { Product } from "../domain/product.entity";
import { Address } from "../domain/value-object/address";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

interface Item {
  id: string;
  name: string;
  price: number;
}


export class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    const createdInvoice = await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      city: invoice.address.city,
      state: invoice.address.state,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      zipCode: invoice.address.zipCode,
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });

    await Promise.all(
      invoice.items.map(async (item) => {
        const createdItem = await ProductModel.create({
          invoiceId: createdInvoice.invoiceId, // Fornecer o ID do invoice
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        });
        return createdItem;
      })
    );
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {id}, include: [ProductModel]
    })

    if(!invoice) {
      throw new Error(`Invoice with id ${id} not found!`)
    }

    const address = new Address({
      city: invoice.invoiceCity,
      state: invoice.invoiceState,
      street: invoice.invoiceStreet,
      number: invoice.invoiceNumber,
      complement: invoice.invoiceComplement,
      zipCode: invoice.invoiceZipCode,
    })

    const newInvoice =  new Invoice({
      id: new Id(invoice.invoiceId),
      name: invoice.invoiceName,
      document: invoice.invoiceDocument,
      address,
      items: invoice.invoiceItems.map((item: ProductModel) => {
        return new Product({
          id: new Id(item.productId),
          name: item.productName,
          price: item.productPrice
        })
      }),
      createdAt: invoice.invoiceCreatedAt,
      updatedAt: invoice.invoiceUpdatedAt
    })

    return newInvoice
  }

  mapGenerateItems(items: Item[]) {
    return 
  }
}