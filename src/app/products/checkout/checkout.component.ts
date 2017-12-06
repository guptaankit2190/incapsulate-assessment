import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.empty();
  }

}
