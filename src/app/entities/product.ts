import { Category } from './category'

export class Product {

  set id(id: number) {
    this.id = id
  }

  get id(): number {
    return this.id
  }

  set name(name: string) {
    this.name = name
  }

  get name(): string {
    return this.name
  }

  set price(price: number) {
    this.price = price
  }

  get price(): number {
    return this.price
  }

  // Set the URL for the image of the product
  set imageUri(url: string) {
    this.imageUri = url
  }

  // Return the URL of the image of the product
  get imageUri(): string {
    return this.imageUri
  }

  set shortDescription(description: string) {
    this.shortDescription = description
  }

  get shortDescription(): string {
    return this.shortDescription
  }

  set type(type: any) {
    this.type = type
  }

  get type(): any {
    return this.type
  }
}
