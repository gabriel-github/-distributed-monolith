import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";

@Table({ tableName: "clients", timestamps: false })
export class ClientModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string;

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  email: string;

  @Column({allowNull: false})
  address: string;

  @Column({allowNull: false})
  createdAt: Date;

  @Column({allowNull: false})
  updatedAt: Date;

  get clientId() {
    return this.getDataValue('id');
  }
  set clientId(value) {
    this.setDataValue('id', value);
  }

  get clientName() {
    return this.getDataValue('name');
  }
  set clientName(value) {
    this.setDataValue('name', value);
  }

  get clientEmail() {
    return this.getDataValue('email');
  }
  set clientEmail(value) {
    this.setDataValue('email', value);
  }

  get clientAddress() {
    return this.getDataValue('address');
  }
  set clientAddress(value) {
    this.setDataValue('address', value);
  }

  get clientCreatedAt() {
    return this.getDataValue('createdAt');
  }
  set clientCreatedAt(value) {
    this.setDataValue('createdAt', value);
  }

  get clientUpdatedAt() {
    return this.getDataValue('updatedAt');
  }
  set clientUpdatedAt(value) {
    this.setDataValue('updatedAt', value);
  }
}