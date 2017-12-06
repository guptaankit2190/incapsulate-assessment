import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/product';
import {ProductsService} from '../services/products.service';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

	public items: Product[] = [];

	constructor(private productsServices: ProductsService, private cartService: CartService) {

		productsServices.getProducts()
		  .subscribe(_ => this.items = _);
	}

	ngOnInit() {
	}
}
