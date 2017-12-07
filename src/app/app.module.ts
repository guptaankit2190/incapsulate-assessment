import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import {ProductsService} from './services/products.service';
import {CartService} from './services/cart.service';
import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";


import {Location, CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ProductsService, 
    CartService, 
    Location, 
    PopulatedCartRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
