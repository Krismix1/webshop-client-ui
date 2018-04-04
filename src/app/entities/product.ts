import { Category } from './category';

export class Product {

  set name(name: string) {
    this.name = name;
  }

  get name(): string {
    return this.name;
  }

  set price(price: number) {
    this.price = price;
  }

  get price(): number {
    return this.price;
  }

  // Set the URL for the image of the product
  set image(url: string) {
    this.image = url;
  }

  // Return the URL of the image of the product
  get image(): string {
    return this.image;
  }

  // Set the URL for the thumbnail image of the product
  set thumbnail(url: string) {
    this.thumbnail = url;
  }

  // Return the URL of the thumbnail image of the product
  get thumbnail(): string {
    return this.thumbnail;
  }

  set category(category: Category) {
    this.category = category;
  }

  get category(): Category {
    return this.category;
  }

  set shortDescription(description: string) {
    this.shortDescription = description;
  }

  get shortDescription(): string {
    return this.shortDescription;
  }
}
