import { BaseEntity } from "../../../@shared/domain/entity/base.entity";

interface AddressProps {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string
}

export class Address {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

  constructor(props: AddressProps) {
     this._street = props.street;
     this._number = props.number;
     this._complement = props.complement;
     this._city = props.city;
     this._state = props.state;
     this._zipCode = props.zipCode;
  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }

  set street(street: string) {
    this._street = street
  }

  set complement(complement: string) {
    this._complement = complement
  }
  set city(city: string) {
    this._city = city
  }
  
  set state(state: string) {
    this._state = state
  }
  
  set number(number: string) {
    this._number = number
  }
  
  set zipCode(zipCode: string) {
    this._zipCode = zipCode
  }
}