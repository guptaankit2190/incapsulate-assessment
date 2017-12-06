import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PopulatedCartRouteGuard } from "../route-gaurds/populated-cart.route-gaurd";

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [PopulatedCartRouteGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [PopulatedCartRouteGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class ProductsRoutingModule { }
