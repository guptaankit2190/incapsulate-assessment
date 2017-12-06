
export class Product {
  public id?: number;
  public name?: string;
  public price?: number;
  public picture?: string;

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.price = src.price;
    this.picture = src.picture;
    //console.log(src);
  }
}
