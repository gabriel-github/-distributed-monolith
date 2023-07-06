import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "transactions",
  timestamps: false
})
export class Transactionmodel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string;
  
  @Column({allowNull: false, field: "order_id"})
  orderId: string;

  @Column({allowNull: false})
  amount: number;

  @Column({allowNull: false})
  status: string;

  @Column({allowNull: false, field: "created_at"})
  createdAt: Date;

  @Column({allowNull: false, field: "updated_at"})
  updatedAt: Date;

  get transactionId() {
    return this.getDataValue('id');
  }
  set transactionId(value) {
    this.setDataValue('id', value);
  }

  get transactionOrderId() {
    return this.getDataValue('orderId');
  }
  set transactionOrderId(value) {
    this.setDataValue('orderId', value);
  }

  get transactionAmount() {
    return this.getDataValue('amount');
  }
  set transactionAmount(value) {
    this.setDataValue('amount', value);
  }

  get transactionStatus() {
    return this.getDataValue('status');
  }
  set transactionStatus(value) {
    this.setDataValue('status', value);
  }

  get transactionCreatedAt() {
    return this.getDataValue('createdAt');
  }
  set transactionCreatedAt(value) {
    this.setDataValue('createdAt', value);
  }

  get transactionUpdatedAt() {
    return this.getDataValue('updatedAt');
  }
  set transactionUpdatedAt(value) {
    this.setDataValue('updatedAt', value);
  }
}