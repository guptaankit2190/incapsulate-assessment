import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
  	ProductsComponent, 
	  ProductComponent,
  	ProductDetailsComponent, 
  	ShoppingCartComponent, 
    CheckoutComponent
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
