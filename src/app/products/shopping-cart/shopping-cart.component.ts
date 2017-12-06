import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Product} from '../../shared/product';
import { CartItem } from "../../shared/cart-item";
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import { ProductsService } from '../../services/products.service';
import { ShoppingCart } from "../../shared/shopping-cart";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

	public shoppingCartItems$: Observable<Product[]> = of([]);
  	public shoppingCartItems: Product[] = [];

  	public cart: Observable<ShoppingCart>;
  	public itemCount: number;


  	private products: Product[] = [];
  	public cartItems: ICartItemWithProduct[];

  	private cartSubscription: Subscription;

	constructor(private router: Router,
		private productsService: ProductsService,
		private cartService: CartService) {

	}


	ngOnInit() {
		this.cart = this.cartService.get();

		this.cartSubscription = this.cart.subscribe((cart) => {
      		this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      		if(this.itemCount == 0){
      			this.router.navigate(["/"]);
      		}

      		this.productsService.all()
      		.subscribe((products) => {
            this.products = products;
            this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.id === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                           });
          });

      		
    	});

		
	}

	public getTotal(): number {
    	return this.cartService.getTotalAmount();
  	}

  	public removeItem(item: Product) {
    	this.cartService.removeFromCart(item)
  	}

}
