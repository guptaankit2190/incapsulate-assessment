import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent {

  @Input() public id: number;
  @Input() public name: string;
  @Input() public price: number;
  @Input() public picture: number;

  public getCurrency(): string {
    return 'USD';
  }

}
