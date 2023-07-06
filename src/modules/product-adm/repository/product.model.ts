import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";

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
  description: string;

  @Column({ allowNull: false })
  purchasePrice: number;

  @Column({ allowNull: false })
  stock: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;


  // Getter e setter personalizado para "id"
  get productId() {
    return this.getDataValue('id');
  }
  set productId(value) {
    this.setDataValue('id', value);
  }

  // Getter e setter personalizado para "name"
  get productName() {
    return this.getDataValue('name');
  }
  set productName(value) {
    this.setDataValue('name', value);
  }

  // Getter e setter personalizado para "description"
  get productDescription() {
    return this.getDataValue('description');
  }
  set productDescription(value) {
    this.setDataValue('description', value);
  }

  // Getter e setter personalizado para "purchasePrice"
  get productPurchasePrice() {
    return this.getDataValue('purchasePrice');
  }
  set productPurchasePrice(value) {
    this.setDataValue('purchasePrice', value);
  }

  // Getter e setter personalizado para "stock"
  get productStock() {
    return this.getDataValue('stock');
  }
  set productStock(value) {
    this.setDataValue('stock', value);
  }

  // Getter e setter personalizado para "createdAt"
  get productCreatedAt() {
    return this.getDataValue('createdAt');
  }
  set productCreatedAt(value) {
    this.setDataValue('createdAt', value);
  }

  // Getter e setter personalizado para "updatedAt"
  get productUpdatedAt() {
    return this.getDataValue('updatedAt');
  }
  set productUpdatedAt(value) {
    this.setDataValue('updatedAt', value);
  }
}