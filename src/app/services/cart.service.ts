import { Injectable } from '@angular/core';
import { Observer } from "rxjs/Observer";
import { Product } from '../shared/product';
import { CartItem } from '../shared/cart-item';
import { ShoppingCart } from "../shared/shopping-cart";
import { ProductsService } from './products.service';

import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CartService {
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();

  private products: Product[] = [];

  private shoppingCart: ShoppingCart;
  private cartItems: CartItem[] = [];

  constructor(private productsService: ProductsService) {

    this.productsService.getProducts()
      .subscribe((products) => this.products = products);

    this.shoppingCart = new ShoppingCart();

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.shoppingCart);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public addToCart(product: Product) {

    let item = this.shoppingCart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      this.shoppingCart.items.push(item);
    }

    item.quantity += 1;
    this.shoppingCart.items = this.shoppingCart.items.filter((cartItem) => cartItem.quantity > 0);

    this.shoppingCart.itemsTotal = this.shoppingCart.items
                          .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
                          .reduce((previous, current) => previous + current, 0);

    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(this.shoppingCart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

  public removeFromCart(product: Product) {
  
    let item = this.shoppingCart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      this.shoppingCart.items.push(item);
    }

    item.quantity -= 1;
    this.shoppingCart.items = this.shoppingCart.items.filter((cartItem) => cartItem.quantity > 0);

    this.shoppingCart.itemsTotal = this.shoppingCart.items
                          .map((item) => item.quantity * this.products.find((p) => p.id === item.productId).price)
                          .reduce((previous, current) => previous + current, 0);

    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(this.shoppingCart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public getTotalAmount(): number {
    return this.shoppingCart.itemsTotal;
  }

  public empty(): void {
    this.shoppingCart = new ShoppingCart();

    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(this.shoppingCart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }

}
