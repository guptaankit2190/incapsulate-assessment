import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  declarations: [
  	ProductsComponent, 
	  ProductListComponent, 
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
