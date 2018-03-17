
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
  set thumbnail(url) {
    this.thumbnail = url;
  }

  // Return the URL of the thumbnail image of the product
  get thumbnail(): string {
    return this.thumbnail;
  }
}
