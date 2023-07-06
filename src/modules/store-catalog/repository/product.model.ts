import { Table, Column, Model, PrimaryKey } from "sequelize-typescript"

@Table({ tableName: "products", timestamps: false })
export class ProductModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  id: string;

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  description: string;

  @Column({allowNull: false})
  salesPrice: number;

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

  get productDescription() {
    return this.getDataValue('description');
  }
  set productDescription(value) {
    this.setDataValue('description', value);
  }

  get productSalesPrice() {
    return this.getDataValue('salesPrice');
  }
  set productSalesPrice(value) {
    this.setDataValue('salesPrice', value);
  }
}