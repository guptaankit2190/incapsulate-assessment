import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent implements OnInit {

	@Input() public items: Product[] = [];
	
	constructor() { }

	ngOnInit() {
	}

}
