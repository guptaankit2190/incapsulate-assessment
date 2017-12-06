import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  }
];

@NgModule({
  imports: [
  	ProductsModule,
  	RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
