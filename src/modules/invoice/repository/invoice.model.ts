import { Model, Table, Column, PrimaryKey, HasMany, ForeignKey } from "sequelize-typescript";
import { Product } from "../domain/product.entity";
import { ProductModel } from "./product.model";

@Table({ tableName: "invoices", timestamps: false })
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string;

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  document: string;

  @Column({allowNull: false})
  street: string;

  @Column({allowNull: false})
  number: string;

  @Column({allowNull: false})
  complement: string;

  @Column({allowNull: false})
  city: string;

  @Column({allowNull: false})
  state: string;

  @Column({allowNull: false})
  zipCode: string

  @Column({allowNull: false})
  total: number;

  @Column({allowNull: false})
  createdAt: Date;

  @Column({allowNull: false})
  updatedAt: Date;

  @HasMany(() => ProductModel, "invoiceId")
  items: ReturnType<() => ProductModel[]>;

  get invoiceId() {
    return this.getDataValue('id');
  }
  set invoiceId(value) {
    this.setDataValue('id', value);
  }

  get invoiceName() {
    return this.getDataValue('name');
  }
  set invoiceName(value) {
    this.setDataValue('name', value);
  }

  get invoiceDocument() {
    return this.getDataValue('document');
  }
  set invoiceDocument(value) {
    this.setDataValue('document', value);
  }

  get invoiceStreet() {
    return this.getDataValue('street');
  }
  set invoiceStreet(value) {
    this.setDataValue('street', value);
  }

  get invoiceState() {
    return this.getDataValue('state');
  }
  set invoiceState(value) {
    this.setDataValue('state', value);
  }

  get invoiceCity() {
    return this.getDataValue('city');
  }
  set invoiceCity(value) {
    this.setDataValue('city', value);
  }

  get invoiceNumber() {
    return this.getDataValue('number');
  }
  set invoiceNumber(value) {
    this.setDataValue('number', value);
  }

  get invoiceComplement() {
    return this.getDataValue('complement');
  }
  set invoiceComplement(value) {
    this.setDataValue('complement', value);
  }

  get invoiceZipCode() {
    return this.getDataValue('zipCode');
  }
  set invoiceZipCode(value) {
    this.setDataValue('zipCode', value);
  }

  get invoiceTotal() {
    return this.getDataValue('total');
  }
  set invoiceTotal(value) {
    this.setDataValue('total', value);
  }

  get invoiceItems() {
    return this.getDataValue('items');
  }

  set addInvoiceItems(value: ProductModel[]) {
    this.setDataValue('items', value);
  }

  get invoiceCreatedAt() {
    return this.getDataValue('createdAt');
  }
  set invoiceCreatedAt(value) {
    this.setDataValue('createdAt', value);
  }

  get invoiceUpdatedAt() {
    return this.getDataValue('updatedAt');
  }
  set invoiceUpdatedAt(value) {
    this.setDataValue('updatedAt', value);
  }
}