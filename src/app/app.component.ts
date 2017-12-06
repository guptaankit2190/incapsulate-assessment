import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { Product } from './shared/product';
import { ShoppingCart } from "./shared/shopping-cart";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // public shoppingCartItems$: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;

  private cartSubscription: Subscription;

	constructor(public location: Location
		, private cartService: CartService) {

		this.cart = this.cartService.get();

		this.cartSubscription = this.cart.subscribe((cart) => {
      		this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      		console.log(this.itemCount);
    	});
	}
}

