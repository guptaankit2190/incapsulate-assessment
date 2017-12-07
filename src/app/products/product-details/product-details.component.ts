import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../shared/product';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
	public product: Product;

	constructor(private route: ActivatedRoute
		, private router: Router
		, private location: Location
		, private productsService: ProductsService
		, private cartService: CartService) {
		this.product = new Product();
	}

  	ngOnInit() {
	    this.route.params.subscribe(params => {
	      const id = +params['id'];
	      this.productsService
	        .getProduct(id)
	        .subscribe((product) => {
	        	this.product = product;
	        })
	    });
  	}

	public addToCart(product: Product) {
		this.cartService.addToCart(product);
		//this.router.navigateByUrl('/');
		this.location.back();
	}

}
