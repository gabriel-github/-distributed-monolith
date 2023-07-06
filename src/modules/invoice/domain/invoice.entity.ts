import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "./product.entity";
import { Address } from "./value-object/address";

interface InvoiceProps {
  id?: Id,
  name: string,
  document: string,
  address: Address,
  items: Product[],
  createdAt?: Date,
  updatedAt?: Date,
}

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: Product[] = []

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items
  }

  get total():number {
    const response =  this.items.reduce((acc, item) => {
      return acc += item.price
    }, 0)

    return response
  }

  get name(): string {
    return this._name
  }

  get document(): string {
    return this._document
  }

  get address(): Address {
    return this._address
  }
  get items(): Product[] {
    return this._items
  }

  set total(total: number) {
    this.total = total
  }
}