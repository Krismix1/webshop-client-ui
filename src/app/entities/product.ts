
export class Product {
  private name: string;
  private price: number;
  private image: string;

  set name(name: string): void {
    this.name = name;
  }

  get name(): string {
    return this.name;
  }

  set price(price: number): void {
    this.price = price;
  }

  get price(): number {
    return this.price;
  }

  set image(image: string): void {
    this.image = image;
  }

  get image(): string {
    return this.image;
  }
}
