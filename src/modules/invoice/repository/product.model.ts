import { Model, Table, Column, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: 'products',
  timestamps: false
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;


  get productId() {
    return this.getDataValue('id');
  }
  set productId(value) {
    this.setDataValue('id', value);
  }

  get productName() {
    return this.getDataValue('name');
  }
  set productName(value) {
    this.setDataValue('name', value);
  }

  get productPrice() {
    return this.getDataValue('price');
  }
  set productPrice(value) {
    this.setDataValue('price', value);
  }

  get productCreatedAt() {
    return this.getDataValue('createdAt');
  }
  set productCreatedAt(value) {
    this.setDataValue('createdAt', value);
  }

  get productUpdatedAt() {
    return this.getDataValue('updatedAt');
  }
  set productUpdatedAt(value) {
    this.setDataValue('updatedAt', value);
  }
}