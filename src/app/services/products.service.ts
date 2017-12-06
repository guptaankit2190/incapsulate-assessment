import {Injectable} from '@angular/core';
import {Product} from '../shared/product';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import { Http } from "@angular/http";
import { CachcingServiceBase } from "./caching.service";

@Injectable()
export class ProductsService extends CachcingServiceBase {
  private products: Observable<Product[]>;
  //private products: Product[];
  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get("./assets/products.json")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));
  }


  public getProducts(): Observable<Product[]> {
    return this.all();
  }

  public getProduct(id: number): Observable<Product> {
    return this
      .all()
      .map(_ => {
        return _.find((item: Product) => {
          return item.id === id;
        });
      });
  }

  // private products(): Observable<Product[]> {
  //   return of(<Product[]>[
  //     <Product>{id: 1, name: 'Blue item', price: 123.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 2, name: 'Green and gray', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 3, name: 'Green item', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 4, name: 'Blue and gray', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 5, name: 'Green and blue', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 6, name: 'Green and blue', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 7, name: 'Gray', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 8, name: 'Blue', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //     <Product>{id: 9, name: 'All colors', price: 99.09, picture: 'http://fakeimg.pl/250x100/'},
  //   ]);
  // }
}
