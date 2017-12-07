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
	public products: Product[] = [];
	public currentPage: number = 1;

	constructor(private productsServices: ProductsService
		, private cartService: CartService) {
	}

	ngOnInit() {
		this.productsServices.getProducts()
		  .subscribe((products) => { 
		  	this.products = products; 
		  	this.items = this.products.slice(this.currentPage, 12);
		});
	}

	onScroll () {
		this.currentPage++;
		this.items.push(...this.products.slice(this.currentPage, 12));
		//console.log(this.items);
	    //console.log('scrolled!! '+ this.currentPage);
	}
}
